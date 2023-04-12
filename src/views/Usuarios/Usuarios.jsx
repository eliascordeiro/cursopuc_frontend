import React, { useState } from 'react'
import { useQuery } from 'react-query'

import Navbar from '../../layout/Navbar'

import UsuariosTabela from '../../components/Usuarios/UsuariosTabela'

import { _host, _menu, _sub_menu } from '../../config'

import { isLoggedIn } from '../../auth/auth';

import { Redirect } from 'react-router-dom'

import axios from 'axios'

const _permissoes = [_menu[0], _sub_menu[0][3]] //Cadastros - Usuarios

const Usuarios = () => {

    if (!isLoggedIn()) {
        return <Redirect to="/" />
    }

    const api_usuarios = async () => {

        const { data } = await axios.post(
            _host + 'lista_mongo_aspma_usuarios', { 'tb': 'usuarios_aspma' },
            {
                headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
            }
        )

        if (!data) {
            throw new Error(data.statusText)
        }

        return data
    }

    const [page, setPage] = useState(1)
    const { data, isLoading, isError, status, error } = useQuery(
        ['usuarios_aspma', page],
        () => api_usuarios(page),
        {
            keepPreviousData: true,
        }
    )

    return (
        <>
            <Navbar />

            <div className="mt-8">
                {status === 'success' && <UsuariosTabela
                    usuarios={JSON.parse(data['dados'])}
                    permissoes={data["menu_principal"][0][_permissoes[0]][1][0][_permissoes[1]][1]}
                    master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
                />}

                {isLoading && <div className="mt-12 text-center text-yellow-300">Aguarde...</div>}

                {isError && <div className="mt-12 text-center text-yellow-300">{error.message}</div>}

            </div>

        </>
    )
}

export default Usuarios
