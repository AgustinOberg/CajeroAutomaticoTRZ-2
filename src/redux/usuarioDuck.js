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


    console.log(usuario)

    switch (tipoDeCuenta) {
        case "USD":
            if (!usuario.cuentas[0].activo) {
                const usuarioMOD = ({ ...usuario, ...usuario.cuentas[0].activo = true })
                try {

                    await db.collection("Cuentas").doc(usuario.email).update(
                        usuarioMOD
                    )
                    dispatch({
                        type: USUARIO_INICIADO_CON_EXITO,
                        payload: usuario
                    })
                    localStorage.setItem("usuario", JSON.stringify(usuarioMOD))
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                console.log("Usted ya posee esta cuenta")
            }

            break;
        case "ARS":
            if (!usuario.cuentas[1].activo) {
                console.log(usuario)
                const usuarioMOD = ({ ...usuario, ...usuario.cuentas[1].activo = true })
                try {

                    await db.collection("Cuentas").doc(usuario.email).update(
                        usuarioMOD
                    )
                    dispatch({
                        type: USUARIO_INICIADO_CON_EXITO,
                        payload: usuario
                    })
                    localStorage.setItem("usuario", JSON.stringify(usuarioMOD))
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                console.log("Usted ya posee esta cuenta")
            }

            break;
        case "CC":
            if (!usuario.cuentas[2].activo) {
                console.log(usuario)
                const usuarioMOD = ({ ...usuario, ...usuario.cuentas[2].activo = true })
                try {

                    await db.collection("Cuentas").doc(usuario.email).update(
                        usuarioMOD
                    )
                    dispatch({
                        type: USUARIO_INICIADO_CON_EXITO,
                        payload: usuario
                    })
                    localStorage.setItem("usuario", JSON.stringify(usuarioMOD))
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                console.log("Usted ya posee esta cuenta")
            }

            break;


        default:
            console.log("Agustin Aguilera - Todos los derechos reservados")

    }
}   