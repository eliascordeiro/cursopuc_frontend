import React from 'react'
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, Redirect } from "react-router-dom";

import UsuariosForm from "../../components/Usuarios/UsuariosForm";

import { _host, _menu, _sub_menu } from "../../config";

import { isLoggedIn } from "../../auth/auth";

const _permissoes = [_menu[0], _sub_menu[0][1]] //Cadastros - Convenios

const EditaUsuarios = () => {

  if (!isLoggedIn()) {
    return <Redirect to="/" />;
  }

  const busca_usuarios = async ({ queryKey }) => {
    const [_key, { id, email }] = queryKey;

    const { data } = await axios.post(
      _host + "edita_mongo_aspma",
      { tb: "usuarios_aspma", psq: { _id: id } },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      }
    );

    return data;
  };


  const { id, email } = useParams();

  const queryClient = useQueryClient()

  const { data, error, isLoading, isError } = useQuery(
    ["user_aspma", { id, email }],
    busca_usuarios,
  );

  const mutation = useMutation(
    (_dados) =>
      axios.post(
        _host + "salva_mongo_aspma",
        { tb: "usuarios_aspma", psq: { _id: id }, dados: _dados },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        }
      ),
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    delete data._id
    delete data.senha
    mutation.mutate(data)
  };

  if (isSuccess) {

    queryClient.fetchQuery(['user_aspma', { id }], busca_usuarios)

    return <Redirect to="/usuarios" />;
  }

  return (

    <div>

      {data && (<UsuariosForm
        usuarios={JSON.parse(data["dados"])}
        submitText="Salvar"
        submitAction={onSubmit}
        titulo='Edita Usuário'
        _tipo={"edita"}
        permissoes={data["menu_principal"][0][_permissoes[0]][1][0][_permissoes[1]][1]}
        master={JSON.parse(sessionStorage.getItem("dados"))["master"]}
      />)}

      {isError && <div><label style={{ color: 'red', textAlign: 'center', paddingTop: 20 }}>{error.message}</label></div>}
      {isLoading && <div style={{ textAlign: 'center', paddingTop: 20 }}>Aguarde...</div>}



    </div>
  );
};

export default EditaUsuarios;

//------------------------------------------------------------------------------------------//
