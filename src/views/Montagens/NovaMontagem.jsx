import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import MontagensForm from "../../components/Montagens/MontagensForm";

import { _host } from "../../config";

import Toast from "light-toast";

import { isLoggedIn, deleteTokens } from "../../auth/auth";
import SessionTimeout from "../../timeout/SessionTimeout";

const createRegister = async (dados) =>
  await (await axios({
      method: 'post',
      url: _host + 'montagens',
      data: dados,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
  })).data


const NovaMontagem = () => {
  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  const handleChange = (event) => {
    deleteTokens();
    window.location.replace("/");
  };

  const [_id, set_id] = React.useState("");

  const mutation = useMutation((dados) => createRegister(dados), {
    onSuccess: async (data) => {
      if (data["msg"]) {
        set_id(data["id"]);
        Toast.info(data["msg"], 500);
      }
    },
  });

  const { isLoading, isError, error, isSuccess } = mutation;

  const onSubmit = async (data) => {
    const montaData = {};
    console.log(data);

    /*
    const produtos = data.produtos.map((p) => ({
      codigo: p.codigo,
      descricao: p.descricao,
      precoUnitario: p.precoUnitario,
      quantidade: p.quantidade,
      totalProdutos: p.totalProdutos,
      percentualMontagem: p.percentualMontagem,
      totalMontagem: p.totalMontagem
    }));

    delete data.produtos;
    */

    data['montadorId'] = 1; //cliente.montador[0].id;

    montaData['cliente'] = [data]
    //montaData['produtos'] = produtos

    console.log(montaData);

    mutation.mutate(montaData);
  };

  if (isSuccess) {
    return <Redirect to={'/montagens'} />;
  }

  return (
    <div>

      <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />

      <MontagensForm
        dados={[]}
        submitText="Salvar"
        submitAction={onSubmit}
        titulo={"Nova Montagem"}
        acao={"grava"}
      //_codigo={JSON.parse(data['dados'])}
      //_selects={JSON.parse(data['selects'])}
      //permissoes={[]}
      //master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
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

export default NovaMontagem;
