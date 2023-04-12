import React, { } from 'react'
import axios from 'axios'
import { Redirect, useLocation, useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'

import ConfirmaSenhaForm from '../../components/AlteraSenha/ConfirmaSenhaForm'

import { _host } from '../../config'

import Toast from 'light-toast';

const acessa_api = async (dados) =>
    await (await axios.post(_host + 'altera_senha_aspma', { 'dados': dados },
        {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        })).data

const ConfirmaSenha = () => {

    const location = useLocation();

    console.log(location.state);

    if (location.state === undefined) {
        return <Redirect to="/home" />
    }

    const mutation = useMutation((dados) => acessa_api(dados), {
        onSuccess: (data) => {

            Toast.info(data['msg'], 3000)

        },
    })

    const { isLoading, isError, error, isSuccess } = mutation

    const onSubmit = (data) => {
        if (data.nova_senha !== data.conf_senha) {
            Toast.info('(Nova senha) - (Confirma nova senha) : Não conferem!', 3000, () => {
                return
            });
        } else {
            mutation.mutate(data)
        }
    }

    if (isSuccess) {
        return <Redirect to={"/home"} />
    }

    return (
        <div className="justify-center">
            {(location.state.email) ? (
                <ConfirmaSenhaForm submitText="Confirmar" submitAction={onSubmit} titulo={'Cadastra/Altera Senha'} />
            ) : (
                <ConfirmaEmail msg={location.state} />
            )}

            {isError && <div><label style={{ color: 'white', textAlign: 'center', paddingTop: 10 }}>{error.message}</label></div>}
            {isLoading && <div style={{ color: 'white', textAlign: 'center', paddingTop: 10 }}>Aguarde...</div>}
        </div>

    )
}

export default ConfirmaSenha


const ConfirmaEmail = ({ msg }) => {

    const history = useHistory()

    const routeChange = () => {
        let path = '/home';
        history.push(path);
    };

    return (
        <div>

            <h2 style={{ textAlign: 'center' }} >Falha no Envio</h2>

            <div className="flex mt-2 justify-center">

                <form className="max-w-lg mt-2">

                    <section className="field max-w-lg">
                        <div>
                            <h3 style={{ color: '#333' }}>{msg}</h3>
                        </div>
                    </section>

                    <div style={{ textAlign: 'center' }} className="mt-8 justify-center">
                        <button
                            className="bg-red-800 border-red-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-red-900"
                            type="button"
                            onClick={() => routeChange()}
                        >
                            Voltar
                        </button>
                    </div>

                </form>

            </div>

        </div>


    )

}