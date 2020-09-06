import React from 'react'
import { useSelector } from 'react-redux'

const Inicio = () => {

    const usuarioSesion = useSelector(store => store.usuarios.usuarioLogeado)

    return (

        <div className="jumbotron mt-5">
            <h1 className="display-4">{usuarioSesion ? "Bienvenido/a " + usuarioSesion.nombre : "Bienvenido a Banco TRZ"}</h1>
            <p className="lead">Banco TRZ 2 : Versión alpha 0.8</p>
            <hr className="my-4" />
            <p>Cosas que faltan: protección de homebank/detalles, contacto</p>
            <p>El responsive no será tratado en esta versión, ya que en la versión 2 habrá un cambio total de diseño</p>
            <p>Posible mejora: perfil de usuario</p>
            <p>Cupon para depositar: "agustin.depositando900pe". Es universal. Este sistema va a mejorar</p>

        </div>
    )
}

export default Inicio
