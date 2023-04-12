import React from 'react'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams, Redirect } from 'react-router-dom'

import PermissoesForm from '../../components/Usuarios/PermissoesForm'

import { _host } from '../../config'

import { isLoggedIn } from '../../auth/auth';

const busca_api = async ({ queryKey }) => {

    const [_key, { id }] = queryKey

    const { data } = await axios.post(
        _host + 'edita_mongo_aspma', { 'tb': 'usuarios_aspma', 'psq': { '_id': id } },
        {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        }
    )

    return data
}

const PermissoesUsuarios = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const { id } = useParams()

    const { data, error, isLoading, isError } = useQuery(
        ['permissoes', { id }],
        busca_api
    )

    const mutation = useMutation((_dados) =>

        axios.post(
            _host + 'salva_mongo_aspma', { 'tb': 'usuarios_aspma', 'psq': { '_id': id }, 'dados': _dados },
            {
                headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
            }
        )
    )

    const { isSuccess } = mutation

    const onSubmit = async (data) => {
        delete data._id
        mutation.mutate(data)

    }

    const queryClient = useQueryClient()

    if (isSuccess) {

        //try {
        queryClient.fetchQuery(['permissoes', { id }],
            busca_api)
        //console.log(data)
        //} catch (error) {
        //  console.log(error)
        // }

        return <Redirect to="/usuarios" />
    }

    return (
        <div>
            {isError && <div><label style={{ color: 'purple', textAlign: 'center', paddingTop: 20 }}>Erro ao acessar Servidores! Repita o processo.</label></div>}
            {isLoading && <div style={{ textAlign: 'center', paddingTop: 20 }}>Aguarde...</div>}
            {data && (
                <PermissoesForm permissoes={JSON.parse(data['dados'])} submitText="Salvar" submitAction={onSubmit} titulo={'Permissões'} tipo={'permissoes'} />
            )}

        </div>
    )
}

export default PermissoesUsuarios
