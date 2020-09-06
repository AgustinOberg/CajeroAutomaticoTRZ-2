import { firebase, auth, db } from '../firebase'

//  State
const dataInicial = {
    cargando: false,
    activo: false
}

const USUARIO_INICIADO_CON_EXITO = "USUARIO_INICIADO_CON_EXITO"
const CARGANDO = "CARGANDO"
const ERROR_INICIO_SESION = "ERROR_INICIO_SESION"
const CERRADO_CON_EXITO = "CERRADO_CON_EXITO"


//  Reducer
export default function usuarioReducer(state = dataInicial, action) {
    switch (action.type) {
        case CARGANDO:
            return { ...state, cargando: true }

        case ERROR_INICIO_SESION:
            return { ...dataInicial }
        case CERRADO_CON_EXITO:
            return { ...dataInicial }
        case USUARIO_INICIADO_CON_EXITO:
            return { ...dataInicial, cargando: false, usuarioLogeado: action.payload, activo: true }

        default:
            return { ...state }
    }
}



//  Acciones

export const iniciarSesionGoogleAccion = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)
        const miUsuario = {
            cuentas: [{ tipo: 'DOLAR', saldo: 0, activo: false, ultimosMovimientos: [] }, { tipo: 'ARS', saldo: 0, activo: false, ultimosMovimientos: [] }, { tipo: 'CORRIENTE', saldo: 0, activo: false, descubierto: 500, ultimosMovimientos: [] }],
            email: res.user.email,
            nombre: res.user.displayName,
            uid: res.user.uid
        }
        const usuarioEnDB = await db.collection("Cuentas").doc(res.user.email).get()    //Busco el usuario en la DB



        if (usuarioEnDB.exists) {

            dispatch({
                type: USUARIO_INICIADO_CON_EXITO,
                payload: usuarioEnDB.data()
            })
            localStorage.setItem("usuario", JSON.stringify(usuarioEnDB.data()))


        } else {
            dispatch({
                type: USUARIO_INICIADO_CON_EXITO,
                payload: miUsuario
            })
            await db.collection("Cuentas").doc(res.user.email).set(miUsuario)
            localStorage.setItem("usuario", JSON.stringify(miUsuario))
        }



    } catch (error) {
        dispatch({
            type: ERROR_INICIO_SESION
        })
        console.log(error)
    }
}

export const delLocalAstateAccion = () => (dispatch) => {
    if (localStorage.getItem("usuario")) {
        dispatch({
            type: USUARIO_INICIADO_CON_EXITO,
            payload: JSON.parse(localStorage.getItem("usuario"))
        })
    }
}


export const cerrarSesion = () => (dispatch) => {
    localStorage.removeItem("usuario")
    dispatch({
        type: CERRADO_CON_EXITO
    })
}

export const crearCuentaAccion = (tipoDeCuenta) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    })

    const usuario = getState().usuarios.usuarioLogeado
    let tipo
    if (tipoDeCuenta === "USD") tipo = 0
    else if (tipoDeCuenta === "ARS") tipo = 1
    else if (tipoDeCuenta === "CC") tipo = 2

    if (!usuario.cuentas[tipo].activo) {
        const usuarioMOD = ({ ...usuario, ...usuario.cuentas[tipo].activo = true })
        try {

            await db.collection("Cuentas").doc(usuario.email).update(
                usuarioMOD
            )
            dispatch({
                type: USUARIO_INICIADO_CON_EXITO,
                payload: usuario
            })
            localStorage.setItem("usuario", JSON.stringify(usuarioMOD))
            return "CUENTA_CREADA_CON_EXITO"
        } catch (error) {
            console.log(error)
        }
    }
    else {
        return "CUENTA_REPETIDA"
    }
}

export const depositarFondosAccion = (tipoDeCuenta, cupon) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    })
    let tipo
    if (tipoDeCuenta === "USD") tipo = 0
    else if (tipoDeCuenta === "ARS") tipo = 1
    else if (tipoDeCuenta === "CC") tipo = 2

    const usuario = getState().usuarios.usuarioLogeado
    if (usuario.cuentas[tipo].activo && cupon === "agustin.depositando900pe") {
        const usuarioMOD = ({ ...usuario, ...usuario.cuentas[tipo].saldo += 900 })
        const esteMovimiento = {
            tipo: "DEPOSITO",
            dinero: 900,
            tiempo: Date.now()
        }
        usuarioMOD.cuentas[tipo].ultimosMovimientos.push(esteMovimiento)
        try {

            await db.collection("Cuentas").doc(usuario.email).update(
                usuarioMOD
            )
            dispatch({
                type: USUARIO_INICIADO_CON_EXITO,
                payload: usuario
            })
            localStorage.setItem("usuario", JSON.stringify(usuarioMOD))
            return "DEPOSITO_EXITOSO"
        } catch (error) {
            console.log(error)
        }

    }
    else {
        return "CODIGO_INVALIDO"
    }

    console.log("Agustin Aguilera - Todos los derechos reservados")

}
export const transferirAccion = (tipoDeCuenta, monto, emailDestino, tipoDeCuentaDelDestino) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    })
    let tipoDeCuentaDelUsuario
    if (tipoDeCuenta === "USD") tipoDeCuentaDelUsuario = 0
    else if (tipoDeCuenta === "ARS") tipoDeCuentaDelUsuario = 1
    else if (tipoDeCuenta === "CC") tipoDeCuentaDelUsuario = 2
    const usuario = getState().usuarios.usuarioLogeado

    if (usuario.cuentas[tipoDeCuentaDelUsuario].activo) {
        if (usuario.cuentas[tipoDeCuentaDelUsuario].saldo >= monto) {


            const resDestino = await db.collection("Cuentas").doc(emailDestino).get()
            const usuarioDestino = await resDestino.data()

            let tipoDeCuentaDelDestino
            if (tipoDeCuenta === "USD") tipoDeCuentaDelDestino = 0
            else if (tipoDeCuenta === "ARS") tipoDeCuentaDelDestino = 1
            else if (tipoDeCuenta === "CC") tipoDeCuentaDelDestino = 2

            if (usuarioDestino) {


                if (usuarioDestino.cuentas[tipoDeCuentaDelDestino].activo) {
                    // Usuario
                    const usuarioMOD = ({ ...usuario, ...usuario.cuentas[tipoDeCuentaDelUsuario].saldo -= monto })
                    const esteMovimientoUsuario = {
                        tipo: "TRANSFERENCIA",
                        dinero: monto,
                        tiempo: Date.now(),
                        emailDesde: usuario.email,
                        emailHasta: emailDestino
                    }
                    usuarioMOD.cuentas[tipoDeCuentaDelUsuario].ultimosMovimientos.push(esteMovimientoUsuario)

                    //Receptor
                    const usuarioDestinoMOD = ({ ...usuarioDestino, ...usuarioDestino.cuentas[tipoDeCuentaDelDestino].saldo += parseInt(monto) })
                    const esteMovimientoReceptor = {
                        tipo: "TRANSFERENCIA",
                        dinero: monto,
                        tiempo: Date.now(),
                        emailDesde: usuario.email
                    }
                    usuarioDestinoMOD.cuentas[tipoDeCuentaDelDestino].ultimosMovimientos.push(esteMovimientoReceptor)


                    try {
                        await db.collection("Cuentas").doc(usuario.email).update(
                            usuarioMOD
                        )
                        await db.collection("Cuentas").doc(emailDestino).update(
                            usuarioDestinoMOD
                        )
                        dispatch({
                            type: USUARIO_INICIADO_CON_EXITO,
                            payload: usuario
                        })
                        localStorage.setItem("usuario", JSON.stringify(usuarioMOD))
                        return "TRANSFERENCIA_EXITO"
                    } catch (error) {
                        console.log(error)
                    }
                    return
                } else {
                    return "DESTINO_SIN_CUENTA"
                }
            }
            else {
                return "EMAIL_DESTINO_INVALIDO"
            }
        }
        else {
            return "MONTO_INSUFICIENTE"
        }
    }
    else {
        return "SU_CUENTA_NO_EXISTE"
    }

    console.log("Agustin Aguilera - Todos los derechos reservados")

}
