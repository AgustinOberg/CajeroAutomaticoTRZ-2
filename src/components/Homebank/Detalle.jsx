import React from 'react'
import { generate as generarKey } from 'shortid'
import { withRouter } from 'react-router-dom'

const Detalle = (props) => {

    React.useEffect(() => {
        const reedirigir = () => {
            if (props.location.state === undefined) {
                props.history.push("/")
            }
        }
        reedirigir()
    }, [props.location.state, props.history])


    let tipo
    if (props.location.state.tipo === "USD") tipo = 0
    else if (props.location.state.tipo === "ARS") tipo = 1
    else if (props.location.state.tipo === "CC") tipo = 2

    const cuentas = JSON.parse(localStorage.getItem("usuario")).cuentas



    return props.location.state !== undefined ? (
        <div className="mt-5">
            <h4 className="text-center">Detalles de tus movimientos</h4>
            <hr />
            <table className="table table-striped text-center">
                <thead className="thead-dark">
                    <tr key={generarKey()}>
                        <th key={generarKey()} scope="col">Tipo</th>
                        <th key={generarKey()} scope="col">Dinero</th>
                        <th key={generarKey()} scope="col">Fecha</th>
                        <th key={generarKey()} scope="col">Desde</th>
                        <th key={generarKey()} scope="col">Hasta</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        cuentas[tipo].ultimosMovimientos.length ?
                            (cuentas[tipo].ultimosMovimientos.reverse().map((item) =>
                                <tr key={generarKey()}>
                                    <td>{item.tipo}</td>
                                    <th key={generarKey()} scope="row">{item.dinero}</th>
                                    <th key={generarKey()} scope="row">-</th>
                                    <th key={generarKey()} scope="row">{item.emailDesde}</th>
                                    <th key={generarKey()} scope="row">{item.emailHasta}</th>

                                </tr>

                            )) : null
                    }
                </tbody>

            </table>

        </div >
    ) : <div></div>
}

export default withRouter(Detalle)
