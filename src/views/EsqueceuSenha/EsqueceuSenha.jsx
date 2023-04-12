import React, { } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useMutation } from 'react-query'

import EsqueceuSenhaForm from '../../components/EsqueceuSenha/EsqueceuSenhaForm'

import { _host } from '../../config'

const sendEmail = async (dados) =>
    await (await axios({
        method: 'post',
        url: _host + 'codigo',
        data: dados
    })).data

const EsqueceuSenha = () => {

    const mutation = useMutation((dados) => sendEmail(dados))

    const { isLoading, isError, error, isSuccess } = mutation

    const onSubmit = async (data) => {
        mutation.mutate(data)
    }

    if (isSuccess) {
        return <Redirect to={{
            pathname: '/confirma_senha_esqueceu',
            state: mutation.data
        }} />
    }

    return (

        <div className="justify-center">
            <EsqueceuSenhaForm submitText="Confirmar" submitAction={onSubmit} titulo={'Cadastra/Altera Senha'} />
            {isError && <div><label style={{ color: 'white', textAlign: 'center', paddingTop: 20 }}>Operação não concluída... Tente novamente!</label></div>}
            {isLoading && <div style={{ color: 'white', textAlign: 'center', paddingTop: 20 }}>Aguarde...</div>}
        </div>

    )
}

export default EsqueceuSenha