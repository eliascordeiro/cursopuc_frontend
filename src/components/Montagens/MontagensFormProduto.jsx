import React, { useState } from "react";
import Modal from 'react-modal'

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider, IconButton, } from "@material-ui/core";


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
        backgroundColor: 'rgba(24, 48, 63, 0.79)',
    },
}

function MontagemsFormProduto({ dados, submitAction, titulo, showModal, produto }) {

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: dados || {},
    });

    const history = useHistory();

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

    /*
    const handle_change = (e, setItem, item) => {
        console.log(e)
        //let items = !listaCliente ? {} : listaCliente;
        //items[item] = e.target.value;
        setItem(e.target.value);

        //setListaCliente(items);
      }
      */

    return (
        <Modal style={customStyles} isOpen={showModal}>

            <label className="ml-0" style={{ color: 'black', fontSize: 20, fontFamily: 'new-roman' }}>{titulo}</label>

            <div className="mb-0">
                <Divider style={{ backgroundColor: 'black' }} />
            </div>

            <div className="flex items-center justify-center">
                <div className="w-full max-w-3xl">
                    <div className="leading-loose">

                        <form className="max-w-3xl m-2 p-2" onSubmit={handleSubmit(submitAction)}>

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
                                    onClick={() => history.goBack()}
                                >
                                    Voltar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Modal>

    );
};

export default MontagemsFormProduto;

function convertFloat(e) {
    if (typeof e === 'undefined') return;

    let v = typeof e === 'number' ? e.toString().replace(/\D/g, "") : e.replace(/\D/g, "");

    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
};