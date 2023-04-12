import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import DeleteModal from "../Util/DeleteModal";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Box, IconButton, Divider } from "@material-ui/core";

import { _host } from "../../config";
import Toast from "light-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

import {
    DataGrid,
    GridToolbarExport,
    GridToolbarContainer,
    ptBR,
    gridClasses,
} from "@mui/x-data-grid";

import { useDemoData } from "@mui/x-data-grid-generator";

import Modal from 'react-modal'

const customStyles = {
    content: {
        height: window.screen.height - 180,
        width: window.screen.width / 2 + 100,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
}

const updateRegister = async (dados) =>
    await (await axios({
        method: 'put',
        url: _host + 'montagens/me',
        data: dados,
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

export default function MontagensProdutos({ produtos, cliente }) {

    console.log(cliente);
    
    const [deleteId, setDeleteId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation((dados) => updateRegister(dados), {
        onSuccess: (data) => {
            if (data) {
                Toast.hide();
                queryClient.invalidateQueries();
                hideModal();
            } else {
                Toast.hide();
                Toast.info('ERRO AO GRAVAR!!! Tente novamente!', 300);
            }
        },
    });

    const showDeleteModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const onDelete = async (id) => {

        Toast.loading('Excluíndo produto. Aguarde...');

        const novaLista = {};

        const listaAtual = updateLista.map((item) => ({
            ...item
        })).filter((obj) => obj.id !== id)

        novaLista['cliente'] = [cliente];
        novaLista['produtos'] = listaAtual;

        await deleteMutation.mutateAsync(novaLista);
    };

    const hideModal = () => setShowModal(false);

    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 10,
        maxColumns: 6,
    });

    const updateLista = produtos.map((p) => ({
        id: p.id,
        codigo: p.codigo,
        descricao: p.descricao,
        precoUnitario: p.precoUnitario,
        quantidade: p.quantidade,
        totalProdutos: p.totalProdutos,
        percentualMontagem: p.percentualMontagem,
        totalMontagem: p.totalMontagem
    }));

    const tHeight = updateLista.length * 80; //window.screen.height;

    const rota1 = {
        pathname: "/novo/produto",
        state: { 'produto': updateLista, 'cliente': cliente }
    };

    const columns = [
        { field: "id", headerName: "Id", width: 150, hide: true },
        {
            field: "codigo",
            headerName: "Código",
            width: 130,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "descricao",
            headerName: "Descrição",
            width: 350,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "precoUnitario",
            headerName: "Preço",
            width: 115,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "quantidade",
            headerName: "Qt.",
            width: 100,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "totalProdutos",
            headerName: "Total",
            width: 110,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "percentualMontagem",
            headerName: "(%)",
            width: 100,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "totalMontagem",
            headerName: "Valor",
            width: 110,
            editable: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: "action",
            headerName: "Ações",
            width: 120,
            disableClickEventBubbling: true,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            renderCell: (params) => (
                <div>
                    <IconButton
                        style={{ outline: "none", border: "none" }}
                        edge="start"
                        color="inherit"
                        onClick={(event) => {
                            event.ignore = true;
                        }}
                    >
                        <Link to={{
                            pathname: `/editaProduto/${params.id}`,
                            state: { 'produto': updateLista, 'cliente': cliente }
                        }}
                        >
                            <EditIcon />
                        </Link>
                    </IconButton>

                    {/*{(permissoes['Excluir'] || master) && (*/}
                    <IconButton
                        style={{ outline: "none", border: "none" }}
                        edge="start"
                        color="inherit"
                        onClick={(event) => {
                            event.ignore = true;
                            showDeleteModal(params.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    {/*})}*/}
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <DeleteModal
                id={deleteId}
                showModal={showModal}
                deleteAction={onDelete}
                cancelAction={hideModal}
            />
            <div className="flex justify-between">
                <div />
                <div />
                <div className="mt-0 mb-2">
                    <Link
                        to={rota1}
                        className="px-6 py-1 text-teal-600 border-2 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300 mt-0"
                    >
                        Novo Produto
                    </Link>

                    {/*
                    <button style={{ outline: "none" }}
                        className="outline-none px-6 py-1 text-orange-600 border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Voltar
                    </button>
                    */}

                </div>
            </div>


            {/*{showModal && (<ModalProdutos produto={updateLista}/>)}*/}


            <Box className="flex bg-gray-300 bg-opacity-100 rounded shadow-xl"
                sx={{
                    width: '100%',
                    '& .cold': {
                        backgroundColor: '#b9d5ff91',
                        color: '#1a3e72',
                    },
                    '& .hot': {
                        backgroundColor: '#ff943975',
                        color: '#1a3e72',
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: '#FFB52E',
                    },
                    '& .baixa': {
                        backgroundColor: 'lightgreen',
                        color: 'black',
                    },

                }}
                style={{ height: 300 }}>
                <DataGrid
                    {...data}
                    localeText={ptBR.props.MuiDataGrid.localeText}
                    rows={updateLista}
                    columns={columns}
                    disableSelectionOnClick
                    density="compact"
                    hideFooter
                />

            </Box>
        </React.Fragment>

    );
};


function convertFloat(e) {
    if (typeof e === 'undefined') return;

    let v = typeof e === 'number' ? e.toString().replace(/\D/g, "") : e.replace(/\D/g, "");

    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
};

export function ModalProdutos({produto}) {
    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });

    const [show, setShow] = useState(true);

    const [_codigo, set_codigo] = React.useState(produto.codigo ? produto.codigo : '');
    const [_descricao, set_descricao] = React.useState(produto.descricao ? produto.descricao : '');
    const [_precoUnitario, set_precoUnitario] = React.useState(produto.precoUnitario ? convertFloat(produto.precoUnitario) : '');
    const [_quantidade, set_quantidade] = React.useState(produto.quantidade ? produto.quantidade : 0);
    const [_totalProdutos, set_totalProdutos] = React.useState(produto.totalProdutos ? convertFloat(produto.totalProdutos) : '');
    const [_percentualMontagem, set_percentualMontagem] = React.useState(produto.percentualMontagem ? convertFloat(produto.percentualMontagem) : '');
    const [_totalMontagem, set_totalMontagem] = React.useState(convertFloat(produto.totalMontagem) ? convertFloat(produto.totalMontagem) : '');

    const handle_change_float = (e, _set) => {
        let v = convertFloat(e.target.value);
        _set(v);
    }

    const handle_change = (e, _set) => {
        _set(e.target.value);
    }

    function hidemodal() {
        setShow(false);
    }

    return (
        <Modal style={customStyles} isOpen={show}>

            <label className="ml-0" style={{ color: 'black', fontSize: 20, fontFamily: 'new-roman' }}>teste</label>

            <div className="mb-0">
                <Divider style={{ backgroundColor: 'black' }} />
            </div>

            <div className="flex items-center justify-center">
                <div className="w-full max-w-3xl">
                    <div className="leading-loose">

                        <form className="max-w-3xl m-2 p-2">

                            {produto !== [] && (
                                <input
                                    type="hidden"
                                    {...register("id", {
                                        value: produto.id,
                                        required: false,
                                    })}
                                />
                            )}

                            <section className="flex flex-col field sm:flex-row mt-4">
                                <div className="sm:w-sm">
                                    <label className="block text-sm text-blue-700">Código</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 200 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('codigo', { required: true })}
                                        value={_codigo}
                                        onChange={(e) => handle_change(e, set_codigo)}
                                    />
                                </div>
                            </section>

                            <section className="flex flex-col field xl:flex-row mt-1">
                                <div className="xm:w-xm">
                                    <label className="block text-sm text-blue-700">Descrição</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 550 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('descricao', { required: true })}
                                        value={_descricao}
                                        onChange={(e) => handle_change(e, set_descricao)}
                                    />
                                </div>
                            </section>

                            <section className="flex flex-col field sm:flex-row mt-1">
                                <div className="sm:w-sm">
                                    <label className="block text-sm text-blue-700">Preço</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 200 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('precoUnitario', { required: true })}
                                        value={_precoUnitario}
                                        onChange={(e) => handle_change_float(e, set_precoUnitario)}
                                    />
                                </div>
                            </section>

                            <section className="flex flex-col field sm:flex-row mt-1">
                                <div className="sm:w-sm">
                                    <label className="block text-sm text-blue-700">Quantidade</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 200 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('quantidade', { required: true })}
                                        value={_quantidade}
                                        onChange={(e) => handle_change(e, set_quantidade)}
                                    />
                                </div>
                            </section>

                            <section className="flex flex-col field sm:flex-row mt-1">
                                <div className="sm:w-sm">
                                    <label className="block text-sm text-blue-700">Total</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 200 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('totalProdutos', { required: true })}
                                        value={_totalProdutos}
                                        onChange={(e) => handle_change_float(e, set_totalProdutos)}
                                    />
                                </div>
                            </section>

                            <section className="flex flex-col field sm:flex-row mt-1">
                                <div className="sm:w-sm">
                                    <label className="block text-sm text-blue-700">(%) Montagem</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 200 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('percentualMontagem', { required: true })}
                                        value={_percentualMontagem}
                                        onChange={(e) => handle_change_float(e, set_percentualMontagem)}
                                    />
                                </div>
                            </section>

                            <section className="flex flex-col field sm:flex-row mt-1">
                                <div className="sm:w-sm">
                                    <label className="block text-sm text-blue-700">Valor Montagem</label>
                                    <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        style={{ width: 200 }}
                                        type="text"
                                        autoComplete="off"
                                        {...register('totalMontagem', { required: true })}
                                        value={_totalMontagem}
                                        onChange={(e) => handle_change_float(e, set_totalMontagem)}
                                    />
                                </div>
                            </section>

                            <div className="mt-4 mb-4">
                                <Divider style={{ backgroundColor: 'black' }} />
                            </div>


                            <div className="mt-4 items-center flex justify-between">
                                {/*{(permissoes['Alterar'] || _tipo === 'grava' || master) && (*/}
                                <button style={{ outline: "none" }}
                                    className="px-6 py-1 text-orange-600 border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                    type="submit"
                                >
                                    Salvar
                                </button>
                                {/*})}*/}

                                <button style={{ outline: "none" }}
                                    className="outline-none px-6 py-1 text-orange-600 border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                    type="button"
                                    onClick={() => hidemodal()}
                                >
                                    Voltar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}