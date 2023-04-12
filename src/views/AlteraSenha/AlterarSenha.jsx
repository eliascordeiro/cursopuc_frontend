import React, { } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useMutation } from 'react-query'

import AlterarSenhaForm from '../../components/AlteraSenha/AlterarSenhaForm'

import { _host } from '../../config'

import { isLoggedIn } from '../../auth/auth';

const sendEmail = async (dados) =>
    await (await axios({
        method: 'post',
        url: _host + 'email',
        data: dados
    })).data
    
const formatEmailSameLength = (emilString) => {
    try {
        var splitEmail = emilString.split("@")
        var domain = splitEmail[1];
        var name = splitEmail[0];
        return name.substring(0, 3).concat(Array(name.length - 3).join("*")).concat("@").concat(domain)
    } catch {
        emilString = 'Atualize seu cadastro na opção anterior.'
        return emilString
    }
}

const AlterarSenha = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const _email = formatEmailSameLength(JSON.parse(sessionStorage.getItem('dados'))['email'])

    const mutation = useMutation((dados) => sendEmail(dados))

    const { isLoading, isError, error, isSuccess } = mutation

    const onSubmit = async (data) => {
        data.email = JSON.parse(sessionStorage.getItem('dados'))['email'];
        mutation.mutate(data);
    }

    if (isSuccess) {
        return <Redirect to={{
            pathname: '/confirma_senha',
            state: mutation.data
        }} />
    }

    return (

        <div className="justify-center">
            <AlterarSenhaForm submitText="Confirmar" submitAction={onSubmit} titulo={'Cadastra/Altera Senha'} email={_email} />
            {isError && <div><label style={{ color: 'white', textAlign: 'center', paddingTop: 10 }}>Operação não concluída... Tente novamente!</label></div>}
            {isLoading && <div style={{ color: 'white', textAlign: 'center', paddingTop: 10 }}>Aguarde...</div>}
        </div>

    )
}

export default AlterarSenha


