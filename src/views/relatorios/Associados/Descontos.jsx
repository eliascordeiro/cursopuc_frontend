import React, { useState } from 'react'
import { useQuery } from 'react-query'

import Navbar from '../../../layout/Navbar'

import Descontos_Associados_Tabela from '../../../components/Relatorios/Associados/Descontos_Associados'

import { _host } from '../../../config'

import { isLoggedIn } from "../../../auth/auth";

import { Redirect } from 'react-router-dom'

import axios from 'axios'

const api_tabela = async (_vars) =>
    await (await axios.post(_host + 'descontos_mensais_aspma_associados', _vars, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

const Descontos_Associados = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const [page, setPage] = useState(1)
    const { data, isLoading, isError, status, error } = useQuery(
        ['vendas_associados', page],
        () => api_tabela(page),
        {
            keepPreviousData: true,
        }
    )

    return (
        <>
            <Navbar />

            <div className="mt-8">

                {isLoading && <div className="mt-12 text-center text-yellow-300">Aguarde...</div>}

                {status === 'success' && <Descontos_Associados_Tabela
                    descontos={JSON.parse(data['dados'])}
                    total={data['total']}
                    total_desconto={data['total_desconto']}
                    total_geral={data['total_geral']}
                    consignatarias={JSON.parse(data['consignatarias'])}
                />}

                {isError && <div className="mt-12 text-center text-yellow-300">{error.message}</div>}

            </div>
        </>
    )
}

export default Descontos_Associados
