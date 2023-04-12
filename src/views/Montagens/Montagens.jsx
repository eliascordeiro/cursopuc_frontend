import React, { useState } from 'react'
import { useQuery, useMutation } from "react-query";

import Navbar from '../../layout/Navbar'

import MontagensTabela from '../../components/Montagens/MontagensTabela'

import { _host, _menu, _sub_menu } from '../../config'

import { isLoggedIn, deleteTokens } from "../../auth/auth"
import SessionTimeout from "../../timeout/SessionTimeout"

import { Redirect } from 'react-router-dom'

import axios from 'axios'

//const _permissoes = [_menu[0], _sub_menu[0][1]] //Cadastros - Convenios

const getMontagens = async (dados) =>
    await (await axios({
        method: 'get',
        url: _host + 'montagens',
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

const getMontadores = async (dados) =>
    await (await axios({
        method: 'get',
        url: _host + 'montadores',
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

function requestMontagens(page) {
    return useQuery(
        ['montagens', page],
        () => getMontagens(page),
        {
            keepPreviousData: true,
        }
    )
}

const Montagens = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const handleChange = (event) => {
        deleteTokens();
        window.location.replace("/");
    };

    /*
    const { data1, isLoading, mutateAsync: fetchData_1, isSuccess: isSuccess_1 } = useMutation(() => getMontagens(), {
        onSuccess: (data) => {
            if (data) {
                console.log(data);
            } else {
                console.log('falhow');
            }
        },
    });

    const { data2, isLoading: isLoading_2, mutateAsync: fetchData_2, isSuccess: isSuccess_2 } = useMutation(() => getMontadores(), {
        onSuccess: (data) => {
            if (data) {
                console.log(data);
            } else {
                console.log('falhow');
            }
        },
    });
    */


    const [page, setPage] = useState(5)
    const { data, isLoading, isError, status, error } = requestMontagens(page);

    /*
    requestFullData().then(response => {
        getResult = response
    })

    if (getResult === null) {
       return { 'Result': 'E-mail não encontrado' };
    }
    */

    /*
    Promise.allSettled([fetchData_1(), fetchData_2()])
        .then(results => runWhenReady())
    */


    return (
        <>
            <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />
            <Navbar />

            <div className="mt-8">
                {status === 'success' && <MontagensTabela
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

export default Montagens;