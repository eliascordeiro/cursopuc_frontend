import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, Redirect } from "react-router-dom";

import MontadoresForm from "../../components/Montadores/MontadoresForm";

import { _host, _menu, _sub_menu } from "../../config";

import { isLoggedIn } from "../../auth/auth";

import Toast from "light-toast";

//const _permissoes = [_menu[0], _sub_menu[0][1]] //Cadastros - Convenios

const getRegister = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;

  const { data } = await axios({
      method: 'get',
      url: _host + `montadores/${id}`,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
  })

  return data;
}  

const EditaMontador = () => {
  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["montadores", { id }],
    getRegister
  );

  const updateRegister = async (dados) =>
    await (await axios({
        method: 'put',
        url: _host + 'montadores/me',
        data: dados,
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

  const mutation = useMutation((dados) => updateRegister(dados), {
    onSuccess: (data) => {
      //if (data) {
        Toast.info('Operação realizada com sucesso', 500);
        queryClient.fetchQuery(["montadores", { id }], getRegister);
      //}
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
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
        <MontadoresForm
          dados={data}
          submitAction={onSubmit}
          titulo={"Edita Montador"}
          _tipo={"edita"}
        //permissoes={data["menu_principal"][0][_permissoes[0]][1][0][_permissoes[1]][1]}
        //_selects={JSON.parse(data['selects'])}
        //master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
        />
      )}
    </div>
  );
};

export default EditaMontador;

const transforma_float = (_vl) => {
  let __vl = _vl
  __vl = __vl.replace('.', '')
  __vl = __vl.replace(',', '.')

  return parseFloat(__vl).toFixed(2)
}
