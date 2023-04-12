import React, { } from 'react'
import axios from 'axios'
import { Redirect, useLocation } from 'react-router-dom'
import { useMutation } from 'react-query'

import DadosPessoiasForm from "../../components/DadosPessoais/DadosPessoaisForm";

import { _host, _menu, _sub_menu } from "../../config";

import { isLoggedIn } from "../../auth/auth";

import { useHistory } from 'react-router-dom'

import {
    Divider,
} from "@material-ui/core";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from "@material-ui/core";

const updateUser = async (dados) =>
    await (await axios({
        method: 'put',
        url: _host + 'users/me',
        data: dados
    })).data

const AtualizarCadastro = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const location = useLocation();

    if (location.state === undefined) {
        return <Redirect to="/home" />
    }

    const mutation = useMutation((dados) => updateUser(dados), {
        onSuccess: (data) => {

            function update(value) {
                let prevData = JSON.parse(sessionStorage.getItem('dados'));
                Object.keys(value).forEach(function (val, key) {
                    prevData[val] = value[val];
                })
                sessionStorage.setItem('dados', JSON.stringify(prevData));
            }

            update({
                name: data.name,
                email: data.email,
                username: data.username
            })

        },
    })

    const { isLoading, isError, error, isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data)
    }

    if (isSuccess) {
        return <Redirect to="/home" />
    }

    return (

        <div className="justify-center">
            {location.state.password !== undefined ? (
                <DadosPessoiasForm submitText="Confirmar" submitAction={onSubmit} titulo={'Atualização do Usuário'} pass={location.state['password']} />
            ) : (
                <Tentativas msg={location.state} />
            )}

            {isError && <div><label style={{ color: 'white', textAlign: 'center', paddingTop: 10 }}>Operação não concluída... Tente novamente!</label></div>}
            {isLoading && <div style={{ color: 'white', textAlign: 'center', paddingTop: 10 }}>Aguarde...</div>}
        </div>

    )
}

export default AtualizarCadastro


const Tentativas = ({ msg }) => {
    const history = useHistory()


    return (
        <div>

            <div className="mt-0">
                <IconButton
                    style={{ outline: "none", border: "none" }}
                    color="primary"
                    onClick={() => history.goBack()}
                >
                    <KeyboardBackspaceIcon className="text-white" />
                    <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>Senha Inválida</label>
                </IconButton >

                <div className="mb-4">
                    <Divider style={{ backgroundColor: 'white' }} />
                </div>

            </div>
            <div className="flex items-center justify-center">
                <div className="font-sans login bg-cover">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-2xl">
                                <p className="text-white mb-4 font-medium text-center text-md">Falha na Autenticação</p>

                                <div className="mt-2">
                                    <label className="block text-sm text-white font-medium text-center">
                                        {msg}
                                    </label>
                                </div>

                                <div className="mt-8 items-center flex justify-between">
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
        </div>
    )
}



