import React from 'react'
import { crearCuentaAccion, depositarFondosAccion, transferirAccion } from '../redux/usuarioDuck'
import { useDispatch } from 'react-redux'

const Operaciones = () => {
    const [tipoDeCuenta, setTipoDeCuenta] = React.useState("");
    const [cupon, setCupon] = React.useState('');
    const [tipoDeCuentaDestinoTransferencia, setTipoDeCuentaDestinoTransferencia] = React.useState('');
    const [montoAtransferir, setMontoAtransferir] = React.useState(0);
    const [emailAtransferir, setEmailAtransferir] = React.useState('');
    const [mensajeExito, setMensajeExito] = React.useState('')
    const [mensajeError, setMensajeError] = React.useState('')

    const dispatch = useDispatch()
    const realizarAbrirCuenta = () => {
        if (tipoDeCuenta !== "") {

            dispatch(crearCuentaAccion(tipoDeCuenta)).then(res => {
                if (res === 'CUENTA_CREADA_CON_EXITO') {
                    setMensajeError("")
                    setMensajeExito(`La cuenta: ${tipoDeCuenta} fue creada correctamente`)

                }
                else if (res === "CUENTA_REPETIDA") {
                    setMensajeExito("")
                    setMensajeError("Usted ya posee una cuenta de tipo: " + tipoDeCuenta)
                }
                setTipoDeCuenta("")
            })
        }
        else {
            setMensajeExito("")
            setMensajeError("Seleccione una cuenta")
        }
    }
    const realizarDespositar = () => {
        if (tipoDeCuenta !== "") {
            dispatch(depositarFondosAccion(tipoDeCuenta, cupon)).then(res => {
                if (res === 'DEPOSITO_EXITOSO') {
                    setMensajeError("")
                    setMensajeExito(`Depositaste correctamente`)
                    setCupon("")
                }
                else if (res === 'CODIGO_INVALIDO') {
                    setCupon("")
                    setMensajeExito("")
                    setMensajeError("Error al depositar: Código inválido")
                }
            })
        }
        else {
            setMensajeExito("")
            setMensajeError("Seleccione una cuenta")
        }
    }

    const realizarTransferencia = () => {
        if (tipoDeCuenta !== "") {
            if (emailAtransferir !== "") {
                if (montoAtransferir > 1) {
                    if (tipoDeCuentaDestinoTransferencia !== "") {

                        dispatch(transferirAccion(tipoDeCuenta, montoAtransferir, emailAtransferir, tipoDeCuentaDestinoTransferencia)).then(res => {
                            switch (res) {
                                case "SU_CUENTA_NO_EXISTE":
                                    setMensajeExito("")
                                    setMensajeError("Error al transferir: Su cuenta seleccionada no existe")
                                    break;
                                case "MONTO_INSUFICIENTE":
                                    setMensajeExito("")
                                    setMensajeError("Error al transferir: Usted no posee monto suficiente")
                                    break;
                                case "EMAIL_DESTINO_INVALIDO":
                                    setMensajeExito("")
                                    setMensajeError("Error al transferir: Email de destino inválido")
                                    break;
                                case "DESTINO_SIN_CUENTA":
                                    setMensajeExito("")
                                    setMensajeError("Error al transferir: El usuario a transferir no posee la cuenta " + tipoDeCuentaDestinoTransferencia + " activa")
                                    break;
                                case "TRANSFERENCIA_EXITO":
                                    setMensajeExito("Transferencia realizada con éxito")
                                    setMensajeError("")
                                    break;
                                default:
                                    setMensajeExito("")
                                    setMensajeError("ERROR")
                                    break;
                            }
                        })

                    }
                    else {
                        setMensajeExito("")
                        setMensajeError("Seleccione una cuenta de destino")
                    }
                }
                else {
                    setMensajeExito("")
                    setMensajeError("Monto inválido")
                }
            }
            else {
                setMensajeExito("")
                setMensajeError("Escriba un email de destino")
            }
        }
        else {
            setMensajeExito("")
            setMensajeError("Seleccione una cuenta")
        }
    }

    return (
        <div className="mt-5">
            <h4 className="text-center">Operaciones</h4>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-xl-7">
                    {mensajeExito && (<div className="alert alert-success mt-3 text-center">
                        {mensajeExito}
                    </div>)}
                    {mensajeError && (
                        <div className="alert alert-danger mt-3 text-center">
                            {mensajeError}
                        </div>)}
                    <form>

                        <select className="custom-select" onChange={e => setTipoDeCuenta(e.target.value)}>
                            <option value="">Elige tu cuenta ...</option>
                            <option value="ARS">Caja de ahorro en ARS</option>
                            <option value="USD">Caja de ahorro en USD</option>
                            <option value="CC">Cuenta corriente</option>
                        </select>

                        <div>
                            <label className="font-weight-light mt-4">Transferencia</label>
                            <div className="d-flex">
                                <input type="email" className="form-control mr-2" placeholder="Email" value={emailAtransferir} onChange={e => setEmailAtransferir(e.target.value)} />
                                <input type="number" className="form-control mr-2" placeholder="Dinero" value={montoAtransferir} onChange={e => setMontoAtransferir(e.target.value)} />
                                <select className="custom-select" onChange={e => setTipoDeCuentaDestinoTransferencia(e.target.value)}>
                                    <option value="" >¿Hacia que cuenta?</option>
                                    <option value="ARS">Caja de ahorro en ARS</option>
                                    <option value="USD">Caja de ahorro en USD</option>
                                    <option value="CC">Cuenta corriente</option>
                                </select>

                                <button type="button" className="btn btn-sm btn-dark ml-2" onClick={realizarTransferencia}>Transferir</button>
                            </div>
                        </div>

                        <div>
                            <label className="font-weight-light mt-4">Depositar fondos</label>
                            <div className="d-flex">
                                <input type="text" className="form-control " placeholder="Cupón de acreditación" value={cupon} onChange={e => setCupon(e.target.value)} />
                                <button type="button" className="btn btn-sm btn-dark ml-2" onClick={realizarDespositar}>Depositar</button>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <button type="button" className="btn btn-sm btn-dark">Comprar dolares</button>
                                <button type="button" className="btn btn-sm btn-dark ml-2" onClick={realizarAbrirCuenta}>Abrir cuenta</button>
                            </div>
                        </div>




                    </form>
                </div>

            </div>
        </div>
    )
}

export default Operaciones
