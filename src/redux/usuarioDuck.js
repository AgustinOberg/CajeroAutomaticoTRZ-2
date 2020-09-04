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
            cuentas: [{ tipo: 'DOLAR', saldo: 0, activo: false }, { tipo: 'ARS', saldo: 0, activo: false }, { tipo: 'CORRIENTE', saldo: 0, activo: false, descubierto: 500 }],
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