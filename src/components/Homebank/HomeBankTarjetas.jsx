import React from 'react'
import { generate as generarKey } from 'shortid'
import { Paper, Typography, Box } from '@material-ui/core'


const HomeBankTarjetas = (props, cuentas) => {
    let tipo
    if (props.tipo === "USD") tipo = 0
    else if (props.tipo === "ARS") tipo = 1
    else if (props.tipo === "CC") tipo = 2

    return (
        <>
            <Paper className="card">
                <Box className="card-header text-center">
                    <Typography><b>Caja de ahorro en {props.tipo} </b></Typography>

                </Box>
                <ul className="list-group  list-group-flush">
                    <li className="list-group-item text-center" key={generarKey()}><Typography>Saldo: <strong>${props.cuentas[tipo].saldo}</strong></Typography></li>
                    {
                        props.cuentas[tipo].ultimosMovimientos.length ?
                            (props.cuentas[tipo].ultimosMovimientos.reverse().map((item, idx) =>
                                idx < 6 ?
                                    <li key={generarKey()} className="list-group-item">{item.tipo}<span className="float-right">{item.tipo === "TRANSFERENCIA" && item.emailHasta ? "-" : "+"}${item.dinero}</span> </li>
                                    : null
                            )) : null
                    }
                </ul>
            </Paper>
        </>
    )
}

export default HomeBankTarjetas
