import React, { } from 'react'
import axios from 'axios'
import { Redirect, useLocation } from 'react-router-dom'
import { useMutation } from 'react-query'

import AutenticacaoForm from "../../components/DadosPessoais/AutenticacaoForm";

import { _host, _menu, _sub_menu } from "../../config";

import { isLoggedIn } from "../../auth/auth";

const postAutentica = async (dados) =>
    await (await axios({
        method: 'post',
        url: _host + 'users/auth',
        data: dados,
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data


const Autentica = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const [password, setPassword] = React.useState('');

    const location = useLocation();

    const mutation = useMutation((dados) => postAutentica(dados), {
        onSuccess: (data) => {

        },
    });

    const { isLoading, isError, isSuccess } = mutation

    const onSubmit = async (data) => {
        setPassword(data.password);
        mutation.mutate(data);
    }

    if (isSuccess) {

        if (mutation.data !== null) {
            mutation.data['password'] = password;
        }

        return <Redirect to=
            {location.state === 'atualiza_cadastro' && {
                pathname: '/atualizar_cadastro',
                state: mutation.data === null ? '' : mutation.data
            }}
        />
    }

    return (

        <div className="justify-center">
            <AutenticacaoForm submitText="Confirmar" submitAction={onSubmit} titulo={'Dados Pessoais'} />
            {isError && <div><label style={{ color: 'white', textAlign: 'center', paddingTop: 20 }}>Senha não confere... Tente novamente!</label></div>}
            {isLoading && <div style={{ color: 'white', textAlign: 'center', paddingTop: 20 }}>Aguarde...</div>}
        </div>

    )
}

export default Autentica

