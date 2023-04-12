import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { useParams, Redirect } from "react-router-dom";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider, IconButton, makeStyles } from "@material-ui/core";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MontagensProdutos from './MontagensProdutos'

import { isLoggedIn, deleteTokens } from "../../auth/auth"
import SessionTimeout from "../../timeout/SessionTimeout"

import ReactSelect, { createFilter } from 'react-select';

import CustomMenuList from '../Util/virtuaLista'
import CustomOption from '../Util/Custom'

import axios from 'axios'
import { useQuery } from "react-query";
import { _host } from '../../config';

import '../Util/pesquisa.css';
import "../Util/select.css";

const useStyles = makeStyles({
  customLabelColor: {
    color: "red"
  }
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const getMontadores = async () =>
  await (await axios({
    method: 'get',
    url: _host + 'montadores',
    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
  })).data

export default function MontagensForm({ dados, submitAction, acao, titulo, permissoes, master }) {

  if (!isLoggedIn()) {
    return <Redirect to="/" />
  }

  const handleChangeToken = (event) => {
    deleteTokens();
    window.location.replace("/");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: dados.cliente || {}
  });

  console.log(dados);

  const dt = new Date();

  let _data = new Date().toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const classes = useStyles();

  const history = useHistory();

  const { data } = useQuery(["montadores"], getMontadores);

  let listaMontadores = [];

  if (data) {
    listaMontadores = data.map((item) => ({
      id: item.id,
      nome: item.nome,
    }))
  }

  const [value, set_Value] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    set_Value(newValue);
  }

  const [listaCliente, setListaCliente] = useState(acao === 'edita' ? dados.cliente : {});
  const [montador, setMontador] = useState(acao === 'edita' ? dados.cliente.montador : 0 );
  const [previsao, setPrevisao] = useState(acao === "edita" ? dados.cliente.previsao.substr(0, 10) : _data);
  const [dataCadastro, setDataCadastro] = useState(acao === "edita" ? dados.cliente.dataCadastro.substr(0, 10) : _data);

  const handle_change = (e, item) => {
    listaCliente[item] = e.target.value;
    setListaCliente(listaCliente);
  }

  const handle_change_all = (e, item) => {
    if (item === 'montador') {
      setMontador(parseInt(e.target.value));
    }

    if (item === 'previsao') {
      setPrevisao(e.target.value);
    }

    if (item === 'dataCadastro') {
      setDataCadastro(e.target.value);
    }

    listaCliente[item] = item === 'montador' ? parseInt(e.target.value) : e.target.value ;

    setListaCliente(listaCliente);
  }

  const filtra_dados = (data) => {
    submitAction({ cliente: data, produtos: dados.produtos })
  }

  return (
    <>
      <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChangeToken} />

      <div>
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

      <div className="App rounded">

        <form className="App max-w-7xl m-2 p-2 mt-0" onSubmit={handleSubmit((data) => filtra_dados(data))}>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ sx: { bgcolor: "#FF5733" } }}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="primary tabs example"
              >
                <Tab label="Montador" {...a11yProps(0)} classes={{
                  textColorSecondary: classes.customLabelColor
                }} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>

              <div className="flex items-center justify-left">
                <div className="w-full max-w-4xl">
                  <div className="leading-loose">

                    <section className="flex mt-2 flex-col field xl:flex-row">

                      <div className="xl:mt-0 xl:ml-0 xl:w-3xl">
                        <label className="block text-sm text-teal-600">Selecione um Montador</label>
                        <div className="text-gray-700 bg-gray-300 rounded">
                          <select className="text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white xl:w-2xl"
                            {...register("montador")}
                            value={montador}
                            onChange={(e) => handle_change_all(e, "montador")}
                          >
                            <option value=""></option>
                            {listaMontadores.map((list) => (
                              <option key={list.id} value={list.id}>
                                {list.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="xl:ml-4 xl:w-2xl">
                        <label className="block text-sm text-teal-600">Previsão de Montagem</label>
                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="date"
                          {...register('previsao', { required: false })}
                          autoComplete="off"
                          value={previsao}
                          onChange={(e) => handle_change_all(e, 'previsao')}
                        />
                        <span className="errors">
                          {errors.previsao && 'Campo obrigatório'}
                        </span>
                      </div>


                    </section>
                  </div>
                </div>
              </div>
            </TabPanel>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ sx: { bgcolor: "#FF5733" } }}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="primary tabs example"
              >
                <Tab label="Cliente" {...a11yProps(1)} classes={{
                  textColorSecondary: classes.customLabelColor
                }} />
              </Tabs>
            </Box>

            <TabPanel value={1} index={1}>
              <div className="flex items-center justify-left">
                <div className="w-full max-w-4xl">
                  <div className="leading-loose">

                    <section className="flex flex-col field xl:flex-row">
                      <div className="xl:mt-0 xl:ml-0 xl:w-3xl">
                        <label className="block text-sm text-teal-600">Nome</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white xl:w-2xl"
                          type="text"
                          {...register('nome', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'nome')}
                        />
                        <span className="errors">
                          {errors.nome && 'Campo obrigatório'}
                        </span>
                      </div>

                      <div className="sm:ml-4 sm:w-sm">
                        <label className="block text-sm text-teal-600">Data do Cadastro</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="date"
                          {...register('dataCadastro', { required: false })}
                          autoComplete="off"
                          value={dataCadastro}
                          onChange={(e) => handle_change_all(e, 'dataCadastro')}
                        />
                        <span className="errors">
                          {errors.dataCadastro && 'Campo obrigatório'}
                        </span>
                      </div>
                    </section>

                    <section className="flex mt-2 flex-col field xl:flex-row">
                      <div className="sm:ml-0 sm:w-sm">
                        <label className="block text-sm text-teal-600">Cep</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('cep', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'cep')}
                        />
                        <span className="errors">
                          {errors.cep && 'Campo obrigatório'}
                        </span>
                      </div>

                      <div className="xl:ml-4 xl:w-4xl">
                        <label className="block text-sm text-teal-600">Endereço</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('endereco', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'endereco')}
                        />
                        <span className="errors">
                          {errors.endereco && 'Campo obrigatório'}
                        </span>
                      </div>

                      <div className="sm:ml-4 sm:w-sm">
                        <label className="block text-sm text-teal-600">Número</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('numero', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'numero')}
                        />
                        <span className="errors">
                          {errors.numero && 'Campo obrigatório'}
                        </span>
                      </div>

                    </section>

                    <section className="flex mt-2 flex-col field xl:flex-row">
                      <div className="xl:xl-0 xl:w-2xl">
                        <label className="block text-sm text-teal-600">Bairro</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('bairro', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'bairro')}
                        />
                        <span className="errors">
                          {errors.bairro && 'Campo obrigatório'}
                        </span>
                      </div>

                      <div className="xl:ml-4 xl:w-2xl">
                        <label className="block text-sm text-teal-600">Cidade</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('cidade', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'cidade')}
                        />
                        <span className="errors">
                          {errors.cidade && 'Campo obrigatório'}
                        </span>
                      </div>

                      <div className="sm:ml-4 sm:w-sm">
                        <label className="block text-sm text-teal-600">Uf</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('uf', { required: true })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'uf')}
                        />
                        <span className="errors">
                          {errors.uf && 'Campo obrigatório'}
                        </span>
                      </div>
                    </section>

                    <section className="flex mt-2 flex-col field xl:flex-row">
                      <div className="w-full max-w-4xl">
                        <label className="block text-sm text-teal-600">Observações</label>
                        <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                          type="text"
                          {...register('complemento', { required: false })}
                          autoComplete="off"
                          onChange={(e) => handle_change(e, 'complemento')}
                        />
                        <span className="errors">
                          {errors.complemento && 'Campo obrigatório'}
                        </span>
                      </div>
                    </section>

                  </div>
                </div>
              </div>
            </TabPanel>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ sx: { bgcolor: "#FF5733" } }}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="primary tabs example"
              >
                <Tab label="Produtos" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel value={2} index={2}>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-6xl">
                  <div className="leading-loose">
                    <MontagensProdutos
                      produtos={acao === 'edita' ? dados.produtos : []}
                      cliente={listaCliente}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <div className="mt-4 mb-4 items-center flex justify-between">
              {/*{(permissoes['Alterar'] || acao === 'grava' || master) && (*/}
              <button style={{ outline: "none" }}
                className="outline-none px-6 py-2 text-teal-600 border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                type="submit"
              >
                Salvar
              </button>
              {/*})}*/}

              <button style={{ outline: "none" }}
                className="px-6 py-2 text-orange-600 outline-none border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                type="button"
                onClick={() => history.goBack()}
              >
                Voltar
              </button>
            </div>

          </Box>

        </form>
      </div>

    </>
  );
}
