import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux'
import { iniciarSesionGoogleAccion } from '../../redux/usuarioDuck'
import { cerrarSesion } from '../../redux/usuarioDuck'


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
    },
}))

const Navbar = (props) => {
    const activo = useSelector(store => store.usuarios.activo)
    const dispatch = useDispatch()
    const classes = useStyles()
    const loading = useSelector(store => store.usuarios.cargando)
    return (

        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={() => props.accionAbrir()}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                    Banco TRZ
                </Typography>
                {activo ? (<Button variant="contained" color="secondary" onClick={() => dispatch(cerrarSesion())}>
                    Cerrar Sesión
                </Button>) : <Button variant="contained" color="secondary" disabled={loading} onClick={() => dispatch(iniciarSesionGoogleAccion())}>
                        Iniciar Sesión
                </Button>}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
