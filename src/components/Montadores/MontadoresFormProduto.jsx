import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Divider,IconButton,} from "@material-ui/core";

const MontagemsFormProduto = ({ dados, submitAction, _tipo, _codigo, _selects, titulo, permissoes, master }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: dados || {},
  });

  let _data = new Date().toISOString().slice(0, 10)

  const history = useHistory();

  const [nome, setNome] = useState(
    _tipo === "edita" ? dados["nome"] : ""
  );

  const [email, setEmail] = useState(
    _tipo === "edita" ? dados["email"] : ""
  );

  const [telefone, setTelefone] = useState(
    _tipo === "edita" ? dados["telefone"] : ""
  );

  return (

    <>

      <div className="mt-0">
        <IconButton
          style={{ outline: "none", border: "none" }}
          color="primary"
          onClick={() => history.goBack()}
        >
          <KeyboardBackspaceIcon className="text-white" />
          <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>{titulo}</label>
        </IconButton >
      </div>

      <div className="mb-4">
        <Divider style={{ backgroundColor: 'white' }} />
      </div>

      <div className="flex items-center justify-center">
        <div className="login bg-cover">
          <div className="w-full max-w-2xl">
            <div className="leading-loose">

              <form className="max-w-2xl m-2 p-4 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit(submitAction)}>

                <section className="flex flex-col field xl:flex-col">

                  <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-xl">
                    <label className="mt-2 block text-sm text-white">Nome</label>
                    <input className="w-xl uppercase text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                      type="text"
                      autoComplete="off"
                      {...register("nome", { required: true })}
                    />
                    <span className="errors">
                      {errors.nome && "Campo obrigatório"}
                    </span>
                  </div>

                  <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-xl">
                    <label className="mt-2 block  text-sm text-white">E-Mail</label>
                    <input className="w-xl lowercase text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                      type="text"
                      autoComplete="off"
                      {...register("email", { required: true })}
                    />
                    <span className="errors">
                      {errors.endereco && "Campo obrigatório"}
                    </span>
                  </div>

                  <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-xl">
                    <label className="mt-2 block text-sm text-white">Telefone</label>
                    <input className="w-xl text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                      type="text"
                      autoComplete="off"
                      {...register("telefone", { required: true })}
                    />
                    <span className="errors">
                      {errors.fone && "Campo obrigatório"}
                    </span>
                  </div>

                </section>


                {/*
                <input type={'hidden'} {...register("codigo", { value: _codigo })} />

                <input type={'hidden'} {...register("data", { value: _data })} />
                */}

                <div className="mt-6 items-center flex justify-between">
                  {/*{(permissoes['Alterar'] || _tipo === 'grava' || master) && (*/}
                    <button
                      className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                      type="submit"
                    >
                      Salvar
                    </button>
                  {/*})}*/}

                  <button
                    className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                    type="button"
                    onClick={() => history.goBack()}
                  >
                    Voltar
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MontagemsFormProduto;