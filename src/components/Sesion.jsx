import React from 'react'
import { useDispatch } from 'react-redux'
import { iniciarSesionAccion } from '../redux/usuarioDuck'

const Sesion = () => {
    const dispatch = useDispatch()
    const [emailImput, setEmailImput] = React.useState('');
    const [contraseñaImput, setContraseñaImput] = React.useState('');


    return (
        <div className="mt-5">
            <h4 className="text-center">Iniciar Sesión</h4>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form>
                        <input type="email" className="form-control mb-2" placeholder="E-Mail" onChange={e => setEmailImput(e.target.value)} value={emailImput} />
                        <input type="password" className="form-control mb-2" placeholder="Contraseña" onChange={e => setContraseñaImput(e.target.value)} value={contraseñaImput} />
                        <button className="btn btn-dark btn-block mb-2">Iniciar Sesión</button>
                        <div className="d-flex btn-group justify-content-center">
                            <button className="btn btn-success">Github</button>
                            <button type="button" className="btn btn-success" onClick={() => dispatch(iniciarSesionAccion())}>Google</button>
                            <button className="btn btn-success">Facebook</button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-warning btn-sm mt-2">No poseo cuenta</button>
                            <button type="button" className="btn btn-warning btn-sm mt-2">Olvidé mi contraseña</button>
                        </div>
                    </form>
                </div>

            </div>
            <form>

            </form>
        </div>
    )
}

export default Sesion
