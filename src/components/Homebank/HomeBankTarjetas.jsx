import React from 'react'
import { generate as generarKey } from 'shortid'

const HomeBankTarjetas = (props, cuentas) => {
    let tipo
    if (props.tipo === "USD") tipo = 0
    else if (props.tipo === "ARS") tipo = 1
    else if (props.tipo === "CC") tipo = 2

    return (
        <>
            <div className="card">
                <div className="card-header text-center">
                    Caja de ahorro en {props.tipo}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center" key={generarKey()}>Saldo: <strong>${props.cuentas[tipo].saldo}</strong></li>
                    {
                        props.cuentas[tipo].ultimosMovimientos.length ?
                            (props.cuentas[tipo].ultimosMovimientos.reverse().map((item, idx) =>
                                idx < 6 ?
                                    <button type="button" key={generarKey()} className="list-group-item list-group-item-action">{item.tipo}<span className="float-right">{item.tipo === "TRANSFERENCIA" && item.emailHasta ? "-" : "+"}${item.dinero}</span> </button>
                                    : null
                            )) : null
                    }
                </ul>
            </div>
        </>
    )
}

export default HomeBankTarjetas
