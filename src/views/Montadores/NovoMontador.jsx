import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import MontadoresForm from "../../components/Montadores/MontadoresForm";

import { _host } from "../../config";

import Toast from "light-toast";

import { isLoggedIn, deleteTokens } from "../../auth/auth";
import SessionTimeout from "../../timeout/SessionTimeout";

const createRegister = async (dados) =>
  await (await axios({
      method: 'post',
      url: _host + 'montadores',
      data: dados,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
  })).data


const NovoMontador = () => {
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
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Redirect to={'/montadores'} />;
  }

  return (
    <div>

      <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />

      <MontadoresForm
        submitText="Salvar"
        submitAction={onSubmit}
        titulo={"Novo Montador"}
        _tipo={"grava"}
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

export default NovoMontador;
