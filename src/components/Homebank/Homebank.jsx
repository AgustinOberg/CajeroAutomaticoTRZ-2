import React from 'react'
import { Divider, Typography, Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeBankTarjetas from './HomeBankTarjetas'
import { Link } from 'react-router-dom'

const Homebank = (props) => {
    const cuentas = JSON.parse(localStorage.getItem("usuario")).cuentas
    const activo = useSelector(store => store.usuarios.activo)

    React.useEffect(() => {         //Protección
        const redirigir = () => {
            if (!activo) {
                props.history.push("/")
            }
        }
        redirigir()
    })







    return (
        <div className="mt-5">
            <Typography variant="h4" color="initial" className="text-center">
                Home Banking
            </Typography>
            <Divider className="mt-2" />



            <Grid container className="mt-3 d-flex  justify-content-center " >

                {!cuentas[0].activo && !cuentas[1].activo && !cuentas[2].activo ? (<Typography>Usted no posee ninguna cuenta abierta</Typography>) : null}
                {cuentas[0].activo ? (
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="px-3 mb-5">
                        <HomeBankTarjetas tipo="USD" cuentas={cuentas} />
                        <Button component={Link} className="btn mt-2 btn-block mb-5" size="small" color="secondary" variant="contained" to={{
                            pathname: "/mi-homebank/detalle",
                            state: { tipo: 'USD' }
                        }}> Ver más... </Button>                    </Grid>) : null
                }
                {cuentas[1].activo ? (
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="px-3 mb-5">
                        <HomeBankTarjetas tipo="ARS" cuentas={cuentas} />
                        <Button component={Link} className="btn mt-2 btn-block mb-5" size="small" color="secondary" variant="contained" to={{
                            pathname: "/mi-homebank/detalle",
                            state: { tipo: 'ARS' }
                        }}> Ver más... </Button>
                    </Grid>) : null
                }
                {cuentas[2].activo ? (
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="px-3 mb-5">
                        <HomeBankTarjetas tipo="CC" cuentas={cuentas} />
                        <Button component={Link} className="btn mt-2 btn-block mb-5" size="small" color="secondary" variant="contained" to={{
                            pathname: "/mi-homebank/detalle",
                            state: { tipo: 'CC' }
                        }}> Ver más... </Button>                    </Grid>) : null

                }

            </Grid>
        </div >
    )
}

export default withRouter(Homebank)
