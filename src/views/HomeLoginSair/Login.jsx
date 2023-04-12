import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useMutation } from "react-query";

import LoginForm from "../../components/Login/LoginForm";

import { _host } from "../../config";

import Toast from "light-toast";

const postLogin = async (dados) =>
  await (await axios({
    method: 'post',
    url: _host + 'users/login',
    data: dados
  })).data

const Login = () => {

  const mutation = useMutation((dados) => postLogin(dados), {
    onSuccess: (data) => {

      sessionStorage.setItem("access_token", data.token);
      sessionStorage.setItem("dados", JSON.stringify(data));
      sessionStorage.setItem("painel", '1');

    },
  });

  const { isLoading, isError, error, isSuccess } = mutation;

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    if (
      sessionStorage.getItem("access_token") !== null &&
      sessionStorage.getItem("access_token") !== "undefined"
    ) {
      return <Redirect to="/home" />
    } else {
      return <Redirect to="/sair" />
    }
  }

  return (
    <>
      <div>
        <LoginForm submitText="Entrar" submitAction={onSubmit} />
        {isError && (
          <>
            <div>
              <label
                style={{
                  color: "white",
                  textAlign: "center",
                  paddingTop: 10,
                }}
              >
                Usuário não encontrato!
              </label>
            </div>

            {/*
              <div className="mt-0 justify-center">
                <section className="flex flex-col field sm:flex-col">
                  <button
                    className="border-2 border-gray-600 shadow-md text-white text-gray-600 btn-qr hover:bg-gray-600 hover:text-gray-100"
                    type="button"
                    onClick={() => window.location.replace("/")}
                  >
                    Tentar novamente
                  </button>
                </section>
              </div>
              */}

          </>
        )}
        {isLoading && (
          <div style={{ color: 'white', textAlign: "center", paddingTop: 10 }}>
            Aguarde...
          </div>
        )}
      </div>
    </>

  );
};

export default Login;
