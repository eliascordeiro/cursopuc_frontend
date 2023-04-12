import React from 'react'
import { useQuery } from 'react-query'

import Navbar from '../../../layout/Navbar'

import Historicos_Associados_Tabela from '../../../components/Relatorios/Associados/Historicos_Associados'

import { _host } from '../../../config'

import { isLoggedIn } from "../../../auth/auth";

import { Redirect } from 'react-router-dom'

import axios from 'axios'

const api_carrega_socios = async () =>
    await (await axios.post(_host + 'carrega_socios_aspma', { 'tab': 'socios', 'ordem': ['associado'] }, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

const Historicos_Associados = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const [page, setPage] = React.useState(1)
    const { data, isLoading, isError, status, error } = useQuery(
        ['carrega_socios', page],
        () => api_carrega_socios(page),
        {
            keepPreviousData: true,
        }
    )

    return (
        <>
            <Navbar />

            <div className="mt-8">

                {isLoading && <div className="mt-12 text-center text-yellow-300">Aguarde...</div>}

                {status === 'success' && <Historicos_Associados_Tabela
                    associados={JSON.parse(data['socios'])}
                />}

                {isError && <div className="mt-12 text-center text-yellow-300">{error.message}</div>}
                
            </div>
        </>
    )
}

export default Historicos_Associados
