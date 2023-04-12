import React, { } from 'react'
import axios from 'axios'
import { Redirect, useLocation, useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'

import ConfirmaSenhaEsqueceuForm from '../../components/EsqueceuSenha/ConfirmaSenhaEsqueceuForm'

import { _host } from '../../config'

import Toast from 'light-toast';

import {
    Divider,
} from "@material-ui/core";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from "@material-ui/core";

const saveUser = async (dados) =>
    await (await axios({
        method: 'post',
        url: _host + 'users',
        data: dados
    })).data    

const updateUser = async (dados) =>
    await (await axios({
        method: 'put',
        url: _host + 'users/me',
        data: dados
    })).data

const ConfirmaSenhaEsqueceu = () => {

    const location = useLocation();

    const mutation = useMutation((dados) =>
        (location.state['result'].user === 'not found'
            ? saveUser(dados) : updateUser(dados)), {
        onSuccess: (data) => {
            Toast.info('Operação realizada com sucesso', 3000)
        },
    })

    const { isLoading, isError, error, isSuccess } = mutation

    const onSubmit = async (data) => {

        if (parseInt(data.codigo_seguranca) !== location.state.codigo) {
            Toast.info('Código inválido.', 3000, () => {
                return
            });

            return
        }

        if (data.nova_senha !== data.conf_senha) {
            Toast.info('(Nova senha) - (Confirma nova senha) : Não conferem!', 3000, () => {
                return
            });
        } else {

            console.log(location.state);
            
            data.username = location.state.email;
            data.password = data.nova_senha;
            data.email = location.state.email;
            data.name = location.state['result'].name;

            mutation.mutate(data);
        }
    }

    if (isSuccess) {
        return <Redirect to={"/"} />
    }

    return (
        <div className="justify-center">
            {location.state['codigo'] > 0 ? (
                <ConfirmaSenhaEsqueceuForm dados={location.state} submitText="Confirmar" submitAction={onSubmit} />
            ) : (
                <ConfirmaEmail msg={location.state} />
            )}

            {isError && <div><label style={{ color: 'white', textAlign: 'center', paddingTop: 20 }}>{error.message}</label></div>}
            {isLoading && <div style={{ color: 'white', textAlign: 'center', paddingTop: 20 }}>Aguarde...</div>}
        </div>

    )
}

export default ConfirmaSenhaEsqueceu


const ConfirmaEmail = ({ msg }) => {

    const history = useHistory()

    return (

        <React.Fragment>

            <div className="mt-0">
                <IconButton
                    style={{ outline: "none", border: "none" }}
                    color="primary"
                    onClick={() => history.goBack()}
                >
                    <KeyboardBackspaceIcon className="text-white" />
                    <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>E-Mail Inválido</label>
                </IconButton >
            </div>

            <div className="mb-4">
                <Divider style={{ backgroundColor: 'white' }} />
            </div>

            <div className="flex items-center justify-center">

                <div className="font-sans login bg-cover">

                    <div className="w-full max-w-lg">

                        <div className="leading-loose">

                            <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">

                                <label className="ml-2" style={{ color: 'yellow', fontSize: 17, fontFamily: 'new-roman', marginBottom: 20 }}>Não conseguimos enviar o E-Mail. Tente novamente.</label>

                                <div className="mt-6 items-center flex justify-between">

                                    <button
                                        className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                                        type="button"
                                        onClick={() => history.goBack()}
                                    >
                                        Voltar
                                    </button>

                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>


    )

}