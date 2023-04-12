import React from "react";
import Navbar from '../../layout/Navbar'
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useMutation } from "react-query";

import UsuariosForm from "../../components/Usuarios/UsuariosForm";

import { _host } from "../../config";

import Toast from "light-toast";

import { isLoggedIn, deleteTokens } from "../../auth/auth";
import SessionTimeout from "../../timeout/SessionTimeout";

const busca_api = async (newUser) =>
  await (
    await axios.post(
      _host + "insert_usuario_mongo_aspma",
      { tb: "usuarios_aspma", dados: newUser },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      }
    )
  ).data;

const altura = window.screen.height

const NovoUsuario = () => {
  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  const handleChange = (event) => {
    deleteTokens();
    window.location.replace("/");
  };

  const mutation = useMutation((newUser) => busca_api(newUser), {
    onSuccess: (data) => {
      if (data["msg"]) {
        Toast.info(data["msg"], 2000);
      }
    },
  });

  const { isLoading, isError, error, isSuccess } = mutation;

  const onSubmit = async (data) => {
    //console.log(data)
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Redirect to={"/usuarios"} />;
  }

  return (
    <div>
      <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />

      <UsuariosForm
        submitText="Salvar"
        submitAction={onSubmit}
        titulo={'Novo Usuário'}
        _tipo={"grava"}
        permissoes={[]}
        master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
      />

      {isError && (
        <div>
          <label
            style={{ color: "red", textAlign: "center", paddingTop: 20 }}
          >
            {error.message}
          </label>
        </div>
      )}
      {isLoading && (
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          Aguarde...
        </div>
      )}
    </div>
  );
};

export default NovoUsuario;
