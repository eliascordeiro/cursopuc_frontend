import React, { useState } from 'react'
import { useQuery } from 'react-query'

import Navbar from '../../layout/Navbar'

import MontadoresTabela from '../../components/Montadores/MontadoresTabela'

import { _host, _menu, _sub_menu } from '../../config'

import { isLoggedIn, deleteTokens } from "../../auth/auth"
import SessionTimeout from "../../timeout/SessionTimeout"

import { Redirect } from 'react-router-dom'

import axios from 'axios'

//const _permissoes = [_menu[0], _sub_menu[0][1]] //Cadastros - Convenios

const getMontadores = async (dados) =>
    await (await axios({
        method: 'get',
        url: _host + 'montadores',
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data


const Montadores = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const handleChange = (event) => {
        deleteTokens();
        window.location.replace("/");
    };

    const [page, setPage] = useState(1)
    const { data, isLoading, isError, status, error } = useQuery(
        ['montadores', page],
        () => getMontadores(page),
        {
            keepPreviousData: true,
        }
    )

    if (data) console.log(data);

    return (
        <>

            <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />
            <Navbar />

            <div className="mt-8">
                {status === 'success' && <MontadoresTabela
                    dados={data}
                    //permissoes={data["menu_principal"][0][_permissoes[0]][1][0][_permissoes[1]][1]}
                    //master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
                />}

                {isLoading && <div className="mt-12 text-center text-yellow-300">Aguarde...</div>}

                {isError && <div className="mt-12 text-center text-yellow-300">{error.message}</div>}

            </div>

        </>
    )
}

export default Montadores;