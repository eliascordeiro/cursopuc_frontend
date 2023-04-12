import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, Redirect } from "react-router-dom";

import MontagensForm from "../../components/Montagens/MontagensForm";

import { _host, _menu, _sub_menu } from "../../config";

import { isLoggedIn } from "../../auth/auth";

import Toast from "light-toast";

//const _permissoes = [_menu[0], _sub_menu[0][1]] //Cadastros - Convenios

const getRegister = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const { data } = await axios({
    method: 'get',
    url: _host + `montagens/${id}`,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
  })

  const result = { 'produtos': data.produtos };
  delete data.produtos;
  result['cliente'] = data;

  return result;
}

const EditaMontagem = () => {
  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["montagens", { id }],
    getRegister
  );

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
        queryClient.fetchQuery(["montagens", { id }], getRegister);
      } else {
        Toast.hide();
        Toast.info('ERRO AO GRAVAR!!! Tente novamente!', 300);
      }
    },
  });

  const onSubmit = async (data) => {

    Toast.loading('Salvando Aguarde...');

    data.cliente.montador = parseInt(data.cliente.montador);

    const novaLista = {};

    const listaAtual = data.produtos.map((item) => ({
      ...item
    }))

    novaLista['cliente'] = [data.cliente];
    novaLista['produtos'] = listaAtual;

    mutation.mutate(novaLista);
  };

  return (
    <div>
      {isError && (
        <div>
          <label style={{ color: "white", textAlign: "center", paddingTop: 25 }}>
            Erro ao acessar Servidores! Repita o processo.
          </label>
        </div>
      )}
      {isLoading && (
        <div style={{ textAlign: "center", paddingTop: 25, color: 'white' }}>Aguarde...</div>
      )}
      {data && (
        <MontagensForm
          dados={data}
          submitAction={onSubmit}
          titulo={"Edita Montagens"}
          acao={"edita"}
        //permissoes={data["menu_principal"][0][_permissoes[0]][1][0][_permissoes[1]][1]}
        //_selects={JSON.parse(data['selects'])}
        //master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
        />
      )}
    </div>
  );
};

export default EditaMontagem;
