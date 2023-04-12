import React, { } from 'react'
import { useHistory } from 'react-router-dom'
import { _quadro } from '../config'


const Finaliza = ({ msg }) => {
    const history = useHistory()

    const routeChange = () => {
        let path = '/compras';
        history.push(path);
    };

    return (
        <div className="justify-center mt-8">
            <div className="flex md justify-center">
                <div style={_quadro}>

                    <h2>{msg}</h2>

                    <div style={{ textAlign: 'center' }} className="mt-6 justify-center">
                        <button
                            className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
                            type="button"
                            onClick={() => routeChange()}
                        >
                            Voltar
                        </button>
                    </div>



                </div>
            </div>
        </div>

    )
}

export default Finaliza

