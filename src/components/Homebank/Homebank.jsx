import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeBankTarjetas from './HomeBankTarjetas'
import { Link } from 'react-router-dom'

const Homebank = (props) => {
    const cuentas = JSON.parse(localStorage.getItem("usuario")).cuentas
    const activo = useSelector(store => store.usuarios.activo)

    React.useEffect(() => {
        const redirigir = () => {
            if (!activo) {
                props.history.push("/")
            }
        }
        redirigir()
    })

    return (
        <div className="mt-5">
            <h4 className="text-center">Home Banking</h4>
            <hr />
            <div className="row justify-content-center">
                {!cuentas[0].activo && !cuentas[1].activo && !cuentas[2].activo ? (<p>Usted no posee ninguna cuenta abierta</p>) : null}
                {cuentas[0].activo ? (
                    <div className="col-4">
                        <HomeBankTarjetas tipo="USD" cuentas={cuentas} />
                        <Link className="btn btn-warning btn-sm mt-2 btn-block" to={{
                            pathname: "/mi-homebank/detalle",
                            state: { tipo: 'USD' }
                        }}> Ver más... </Link>                    </div>) : null
                }
                {cuentas[1].activo ? (
                    <div className="col-4">
                        <HomeBankTarjetas tipo="ARS" cuentas={cuentas} />
                        <Link className="btn btn-warning btn-sm mt-2 btn-block" to={{
                            pathname: "/mi-homebank/detalle",
                            state: { tipo: 'ARS' }
                        }}> Ver más... </Link>
                    </div>) : null
                }
                {cuentas[2].activo ? (
                    <div className="col-4">
                        <HomeBankTarjetas tipo="CC" cuentas={cuentas} />
                        <Link className="btn btn-warning btn-sm mt-2 btn-block" to={{
                            pathname: "/mi-homebank/detalle",
                            state: { tipo: 'CC' }
                        }}> Ver más... </Link>                    </div>) : null

                }

            </div>
        </div >
    )
}

export default withRouter(Homebank)
