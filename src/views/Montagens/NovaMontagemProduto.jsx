import React, { useState } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router";

import MontagensFormProduto from "../../components/Montagens/MontagensFormProduto";

import { _host } from "../../config";

import Toast from "light-toast";

import { isLoggedIn, deleteTokens } from "../../auth/auth";
import SessionTimeout from "../../timeout/SessionTimeout";

const convertFloat = (values) => {
    let value = values;

    value = value.replace('.', '');
    value = parseFloat(value.replace(',', '.'));

    return value;
}

const NovaMontagemProduto = () => {
    if (!isLoggedIn()) {
        return <Redirect to="/" />;
    }

    const handleChange = (event) => {
        deleteTokens();
        window.location.replace("/");
    };

    const [showModal, setShowModal] = useState(true);
    const [clienteId, setClienteId] = useState('');

    const cliente = useLocation().state.cliente;
    const produtos = useLocation().state.produto;

    const updateRegister = async (dados) =>
        await (await axios({
            method: 'post',
            url: _host + 'montagens',
            data: dados,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        })).data

    const mutation = useMutation((dados) => updateRegister(dados), {
        onSuccess: (data) => {
            if (data) {
                setClienteId(data.id);
                Toast.hide();
                Toast.info('Salvo com sucesso!', 300);
            } else {
                Toast.hide();
                Toast.info('ERRO AO GRAVAR!!! Tente novamente!', 300);
            }
        },
    });

    const { isLoading, isError, error, isSuccess } = mutation;

    const novaLista = {};

    const onSubmit = async (data) => {

        console.log(cliente);

        const listaAtual = produtos.map((item) => ({
            ...item
        }))

        let newFields = {
            codigo: data.codigo,
            descricao: data.descricao,
            precoUnitario: convertFloat(data.precoUnitario),
            quantidade: parseInt(data.quantidade),
            totalProdutos: convertFloat(data.totalProdutos),
            percentualMontagem: convertFloat(data.percentualMontagem),
            totalMontagem: convertFloat(data.totalMontagem)
        };

        listaAtual.push(newFields);

        const newList = listaAtual.map((item) => ({
            codigo: item.codigo,
            descricao: item.descricao,
            precoUnitario: item.precoUnitario,
            quantidade: item.quantidade,
            totalProdutos: item.totalProdutos,
            percentualMontagem: item.percentualMontagem,
            totalMontagem: item.totalMontagem
        }))

        novaLista['cliente'] = [cliente];
        novaLista['produtos'] = newList;

        mutation.mutate(novaLista);
    };

    //if (isSuccess) {
    //    return <Redirect to={`/editaMontagem/${clienteId}`} />;
    //}

    return (
        <div>

            <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />

            <MontagensFormProduto
                submitText="Salvar"
                submitAction={onSubmit}
                titulo={"Novo Produto"}
                acao={"grava"}
                showModal={showModal}
                produto={produtos}
                cliente={cliente}
            />

            {isError && (
                <div>
                    <label style={{ color: "white", textAlign: "center", paddingTop: 20 }}>
                        {error.message}
                    </label>
                </div>
            )}
            {isLoading && (
                <div style={{ color: "white", textAlign: "center", paddingTop: 20 }}>Aguarde...</div>
            )}
        </div>
    );
};

export default NovaMontagemProduto;
