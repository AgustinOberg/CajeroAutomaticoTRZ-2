import { firebase, auth } from '../firebase'

//  State
const dataInicial = {
    cargando: false,
    activo: false
}

const USUARIO_INICIADO_CON_EXITO = "USUARIO_INICIADO_CON_EXITO"
const CARGANDO = "CARGANDO"
const ERROR_INICIO_SESION = "ERROR_INICIO_SESION"

//  Reducer
export default function usuarioReducer(state = dataInicial, action) {
    switch (action.type) {
        case CARGANDO:
            return { ...state, cargando: true }
        case ERROR_INICIO_SESION:
            return { ...dataInicial }
        case USUARIO_INICIADO_CON_EXITO:
            return { ...dataInicial, usuarioLogeado: action.payload }
        default:
            return { ...state }
    }
}



//  Acciones

export const iniciarSesionAccion = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })

    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)
        dispatch({
            type: USUARIO_INICIADO_CON_EXITO,
            payload: {
                uid: res.user.uid,
                nombre: res.user.displayName,
                email: res.user.email
            }
        })
        localStorage.setItem("usuario", JSON.stringify({
            id: res.user.uid,
            nombre: res.user.displayName,
            email: res.user.email
        }))

    } catch (error) {
        dispatch({
            type: ERROR_INICIO_SESION
        })
        console.log(error)
    }
}

