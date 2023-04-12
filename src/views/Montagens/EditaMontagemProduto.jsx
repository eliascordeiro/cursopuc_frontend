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

const createRegister = async (dados) =>
    await (await axios({
        method: 'put',
        url: _host + 'montagens/me',
        data: dados,
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

const convertFloat = (values) => {
    let value = values;

    value = value.replace('.', '');
    value = parseFloat(value.replace(',', '.'));

    return value;
}

const EditaProdutos = () => {
    if (!isLoggedIn()) {
        return <Redirect to="/" />;
    }

    const handleChange = (event) => {
        deleteTokens();
        window.location.replace("/");
    };

    const { id } = useParams();

    const [showModal, setShowModal] = useState(true);

    const queryClient = useQueryClient();

    const produtos = useLocation().state.produto;

    const itemList = produtos.map((item) => ({
        id: item.id,
        codigo: item.codigo,
        descricao: item.descricao,
        precoUnitario: item.precoUnitario,
        quantidade: item.quantidade,
        totalProdutos: item.totalProdutos,
        percentualMontagem: item.percentualMontagem,
        totalMontagem: item.totalMontagem
    })).filter((obj) => obj.id == id)

    const cliente = useLocation().state.cliente;

    const _id = cliente.id;

    const updateRegister = async (dados) =>
        await (await axios({
            method: 'put',
            url: _host + 'montagens/me',
            data: dados,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        })).data

    const mutation = useMutation((dados) => updateRegister(dados), {
        onSuccess: (data) => {
            if (data) {
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

        const listaAtual = produtos.map((item) => ({
            ...item
        }))

        listaAtual.map(field => {
            if (field.id === data.id) {
                field.id = data.id;
                field.codigo = data.codigo;
                field.descricao = data.descricao;
                field.precoUnitario = convertFloat(data.precoUnitario);
                field.quantidade = parseInt(data.quantidade);
                field.totalProdutos = convertFloat(data.totalProdutos);
                field.percentualMontagem = convertFloat(data.percentualMontagem);
                field.totalMontagem = convertFloat(data.totalMontagem);
            }
        });

        novaLista['cliente'] = [cliente];
        novaLista['produtos'] = listaAtual;

        mutation.mutate(novaLista);
    };

    if (isSuccess) {

       //setShowModal(false);

        /*
        return <Redirect to={{
            pathname: '/montagens'
        }} />;
        */
    }

    return (
        <div>

            <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />

            <MontagensFormProduto
                submitText="Salvar"
                submitAction={onSubmit}
                titulo={"Novo Produto"}
                acao={"grava"}
                showModal={showModal}
                produto={itemList[0]}
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

export default EditaProdutos;
