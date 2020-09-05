import React from 'react'
import { crearCuentaAccion, depositarFondosAccion, transferirAccion } from '../redux/usuarioDuck'
import { useDispatch } from 'react-redux'

const Operaciones = () => {
    const [tipoDeCuenta, setTipoDeCuenta] = React.useState(null);
    const [cupon, setCupon] = React.useState('');
    const [tipoDeCuentaDestinoTransferencia, setTipoDeCuentaDestinoTransferencia] = React.useState('');
    const [montoAtransferir, setMontoAtransferir] = React.useState(0);
    const [emailAtransferir, setEmailAtransferir] = React.useState('');


    const dispatch = useDispatch()

    return (
        <div className="mt-5">
            <h4 className="text-center">Operaciones</h4>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-xl-7">
                    <form>

                        <select className="custom-select" onChange={e => e.target.value !== "ELEGIR" ? setTipoDeCuenta(e.target.value) : null}>
                            <option value="ELEGIR">Elige tu cuenta ...</option>
                            <option value="ARS">Caja de ahorro en ARS</option>
                            <option value="USD">Caja de ahorro en USD</option>
                            <option value="CC">Cuenta corriente</option>
                        </select>

                        <div>
                            <label className="font-weight-light mt-4">Transferencia</label>
                            <div className="d-flex">
                                <input type="email" className="form-control mr-2" placeholder="Email" value={emailAtransferir} onChange={e => setEmailAtransferir(e.target.value)} />
                                <input type="number" className="form-control mr-2" placeholder="Dinero" value={montoAtransferir} onChange={e => setMontoAtransferir(e.target.value)} />
                                <select className="custom-select" onChange={e => e.target.value !== "ELEGIR" ? setTipoDeCuentaDestinoTransferencia(e.target.value) : null}>
                                    <option value="ELEGIR" >¿Hacia que cuenta?</option>
                                    <option value="ARS">Caja de ahorro en ARS</option>
                                    <option value="USD">Caja de ahorro en USD</option>
                                    <option value="CC">Cuenta corriente</option>
                                </select>

                                <button type="button" className="btn btn-sm btn-dark ml-2" onClick={() => dispatch(transferirAccion(tipoDeCuenta, montoAtransferir, emailAtransferir, tipoDeCuentaDestinoTransferencia))}>Transferir</button>
                            </div>
                        </div>

                        <div>
                            <label className="font-weight-light mt-4">Depositar fondos</label>
                            <div className="d-flex">
                                <input type="text" className="form-control " placeholder="Cupón de acreditación" value={cupon} onChange={e => setCupon(e.target.value)} />
                                <button type="button" className="btn btn-sm btn-dark ml-2" onClick={() => dispatch(depositarFondosAccion(tipoDeCuenta, cupon), setCupon(""))}>Depositar</button>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <button type="button" className="btn btn-sm btn-dark">Comprar dolares</button>
                                <button type="button" className="btn btn-sm btn-dark ml-2" onClick={() => dispatch(crearCuentaAccion(tipoDeCuenta))}>Abrir cuenta</button>
                            </div>
                        </div>




                    </form>
                </div>

            </div>
            <form>

            </form>
        </div>
    )
}

export default Operaciones
