import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useSelector } from 'react-redux'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const Listas = () => {
    const activo = useSelector(store => store.usuarios.activo)


    return (
        <div>

            <List component='nav'>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Inicio' />
                </ListItem>


                {activo && (<>
                    <ListItem button component={Link} to="/mi-homebank" >
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary='HomeBanking' />
                    </ListItem>
                    <ListItem button component={Link} to="/operaciones" >
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='Operaciones' />
                    </ListItem>

                    <Divider /> </>)}


                <ListItem button component={Link} to="/contacto">
                    <ListItemIcon>
                        <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText primary='Contacto' />
                </ListItem>


                <Divider />

            </List>
        </div>
    )
}

export default Listas
