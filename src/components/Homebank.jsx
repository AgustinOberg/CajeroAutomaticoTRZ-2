import React from 'react'

const Homebank = () => {

    const cuentas = JSON.parse(localStorage.getItem("usuario")).cuentas
    return (
        <div className="mt-3">
            <h4 className="text-center">Home Banking</h4>
            <hr />
            <div className="row justify-content-center">
                {!cuentas[0].activo && !cuentas[1].activo && !cuentas[2].activo ? (<p>Usted no posee ninguna cuenta abierta</p>) : null}
                {cuentas[0].activo ? (<div className="col-4">
                    <div className="card">
                        <div className="card-header text-center">
                            Caja de ahorro en ARS
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item text-center" key="1">Saldo: <strong>$500</strong></li>
                            <button type="button" className="list-group-item list-group-item-action">Transferencia a terceros <span className="float-right">- $500</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                        </ul>
                    </div>
                    <button className="btn btn-warning btn-sm mt-2 btn-block">Ver más...</button>
                </div>) : null}



                {cuentas[1].activo ? (<div className="col-4">
                    <div className="card">
                        <div className="card-header text-center">
                            Caja de ahorro en USD
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item text-center" key="1">Saldo: <strong>$500</strong></li>
                            <button type="button" className="list-group-item list-group-item-action">Transferencia a terceros <span className="float-right">- $500</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                        </ul>
                    </div>
                    <button className="btn btn-warning btn-sm mt-2 btn-block">Ver más...</button>
                </div>) : null}



                {cuentas[2].activo ? (<div className="col-4">
                    <div className="card">
                        <div className="card-header text-center">
                            Cuenta corriente
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item text-center" key="1">Saldo: <strong>$500</strong></li>
                            <button type="button" className="list-group-item list-group-item-action">Transferencia a terceros <span className="float-right">- $500</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                            <button type="button" className="list-group-item list-group-item-action">Depósito de fondos <span className="float-right">$1800</span> </button>
                        </ul>
                    </div>
                    <button className="btn btn-warning btn-sm mt-2 btn-block">Ver más...</button>
                </div>) : null}




            </div>

        </div>
    )
}

export default Homebank
