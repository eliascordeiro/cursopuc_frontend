import React, { useState } from 'react'
import { useQuery } from 'react-query'

import Navbar from '../../../layout/Navbar'

import Pagtos_Convenios_Tabela from '../../../components/Relatorios/Convenios/Pagtos_Convenios'

import { _host } from '../../../config'

import { isLoggedIn, deleteTokens } from "../../../auth/auth";
import SessionTimeout from "../../../timeout/SessionTimeout";

import { Redirect } from 'react-router-dom'

import axios from 'axios'

const api_tabela = async (_vars) =>
    await (await axios.post(_host + 'descontos_mensais_aspma_convenios', _vars, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

const Pagtos_Convenios = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const handleChange = (event) => {
        deleteTokens();
        window.location.replace("/");
    };

    const [page, setPage] = useState(1)
    const { data, isLoading, isError, status, error } = useQuery(
        ['pagtos_convenios', page],
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

                {status === 'success' && <Pagtos_Convenios_Tabela
                    descontos={JSON.parse(data['dados'])}
                    total={data['total']}
                    total_desconto={data['total_desconto']}
                    total_geral={data['total_geral']}
                />}

                {isError && <div className="mt-12 text-center text-yellow-300">{error.message}</div>}

            </div>
        </>
    )
}

export default Pagtos_Convenios
