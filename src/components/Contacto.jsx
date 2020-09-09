import React from 'react'
import { Divider, Typography, Button } from '@material-ui/core'

const Contacto = () => {
    return (
        <div className="mt-5">
            <Typography variant="h4" color="initial" className="text-center">
                Contacto
            </Typography>
            <Divider className="mt-2" />

            <Typography variant="h6" color="initial" className="mt-3">
                Tecnologías utilizadas
            </Typography>
            <Typography variant="body1" color="initial">
                El objetivo de este proyecto personal siempre fue mostrar y practicar la mayor cantidad de tecnologías posibles para poder realizar un sitio web completamente funcional y
                adaptable, teniendo en cuenta que el mismo podrá escalar en un futuro. Para lograrlo se utilizaron las siguientes tecnologías: <Typography variant="button">HTML 5 | CSS 3 | JAVASCRIPT |
                Bootstrap 4 | React JS + HOOKS | React Router | Firebase: Firestore - Auth - GoogleAuth | Material UI | Firebase-Storage (Proximamente)</Typography>
            </Typography>

            <Typography variant="h6" color="initial" className="mt-3">
                Información del proyecto
                </Typography>
            <Typography variant="body1" color="initial">
                Este proyecto es la continuación de otro, "Cajero Automatico TRZ", programado 100% en Java. La pagina web BancoTRZ tiene la intención de simular un banco real,
                en donde un usuario puede ingresar, consultar su HomeBanking, realizar operaciones, depositar dinero (a travez de un sistema de cupones, alojados en una base
                de datos)
            </Typography>

            <Typography variant="h6" color="initial" className="mt-3">
                Contactame
                </Typography>

            <Button variant="contained" color="primary" className="my-4" href="https://github.com/Aguilera-Agustin">GitHub</Button>
            <Button variant="contained" color="secondary" href="mailto:agustin.aguilera424@gmail.com" className="mx-5">E-Mail</Button>
            <Button variant="contained" color="primary" href="https://www.linkedin.com/in/aguilera-agustin/">Linkedin</Button>

            <div className="mt-5 text-center">

                <Typography variant="caption" >Todos los derechos reservados - Aguilera Agustín 2020</Typography>
            </div>

        </div>
    )
}

export default Contacto
