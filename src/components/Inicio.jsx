import React from 'react'
import { useSelector } from 'react-redux'
import { Paper, Divider, Typography } from '@material-ui/core'


const Inicio = () => {

    const usuarioSesion = useSelector(store => store.usuarios.usuarioLogeado)

    return (

        <Paper variant="outlined" className="p-5 mt-5">
            <Typography variant="h3" >{usuarioSesion ? "Bienvenido/a " + usuarioSesion.nombre : "Bienvenido a Banco TRZ"}</Typography>
            <Typography className="lead" variant="subtitle2">Banco TRZ 2 : Versión beta 1.0</Typography>
            <Divider className="my-4" />
            <div className="mt-3">

                <Typography>Cosas que faltan: Bugs de Operaciones + Comprar Dolares</Typography>
                <Typography>Posible mejora: perfil de usuario</Typography>
                <Typography>Cupon para depositar: "agustin.depositando900pe". Es universal. Este sistema va a mejorar</Typography>
            </div>

        </Paper>
    )
}

export default Inicio
