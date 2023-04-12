import React from 'react'
import Modal from 'react-modal'

import "./select.css";

import SelectSearch from "react-select-search";

import {
    Divider,
} from "@material-ui/core";


const customStyles = {
    content: {
        height: 550,
        width: window.screen.height - 100,
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

const convertFloatString = (e) => {
    if (typeof e === 'undefined') return;

    let v = typeof e === 'number' ? e.toString().replace(/\D/g, "") : e.replace(/\D/g, "");

    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
};


const convertFloat = (e) => {
    if (typeof e === 'undefined') return;

    let v = typeof e === 'number' ? e.toString().replace(/\D/g, "") : e.replace(/\D/g, "");

    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
};

const transforma_float = (_vl) => {
    let __vl = _vl;

    __vl = __vl.replace('.', '');
    __vl = __vl.replace(',', '.');

    __vl = parseFloat(__vl);

    return __vl;
}

Modal.setAppElement('#modal-root')

const ProdutosForm = ({ lista, showModal, novaLista, cancelAction, title, produto }) => {

    const [_codigo, set_codigo] = React.useState('');
    const [_descricao, set_descricao] = React.useState('');
    const [_preco, set_preco] = React.useState('');
    const [_quantidade, set_quantidade] = React.useState(0);
    const [_total, set_total] = React.useState('');
    const [_percentualComissao, set_percentualComissao] = React.useState('');
    const [_totalComissao, set_totalComissao] = React.useState('');

    React.useEffect(() => {
        async function run() {
            set_codigo(produto.codigo);
            set_descricao(produto.descricao);
            set_preco(convertFloat(produto.precoUnitario));
            set_quantidade(produto.quantidade);
            set_total(convertFloat(produto.totalProdutos));
            set_percentualComissao(convertFloat(produto.percentualMontagem));
            set_totalComissao(convertFloat(produto.totalMontagem));
        }
        run();
    }, [produto]);

    const listaAtual = lista.map((item) => ({
        ...item
    }))

    const handle_change_float = (e, _set) => {
        let v = convertFloat(e.target.value);
        _set(v);
    }

    const handle_change = (e, _set) => {
        _set(e.target.value);
    }

    const alterItem = () => {
        listaAtual.map(field => {
            if (field.id === produto.id) {
                field.id = produto.id;
                field.codigo = _codigo;
                field.descricao = _descricao;
                field.precoUnitario = transforma_float(_preco);
                field.quantidade = parseInt(_quantidade);
                field.totalProdutos = transforma_float(_total);
                field.percentualMontagem = transforma_float(_percentualComissao);
                field.totalMontagem = transforma_float(_totalComissao);
            }
        });
        novaLista(listaAtual);
        emptyCampos()
    }

    const addLista = () => {
        let newFields = {
            id: Math.floor(Math.random() * 1000),
            codigo: _codigo,
            descricao: _descricao,
            precoUnitario: transforma_float(_preco),
            quantidade: parseInt(_quantidade),
            totalProdutos: transforma_float(_total),
            percentualMontagem: transforma_float(_percentualComissao),
            totalMontagem: transforma_float(_totalComissao)
        };

        listaAtual.push(newFields);

        let conta = 1;

        const newList = listaAtual.map((item) => ({
            id: conta++,
            codigo: item.codigo,
            descricao: item.descricao,
            precoUnitario: item.precoUnitario,
            quantidade: item.quantidade,
            totalProdutos: item.totalProdutos,
            percentualMontagem: item.percentualMontagem,
            totalMontagem: item.totalMontagem
        }))

        novaLista(newList);
        emptyCampos()
    };

    const volta = () => {
        cancelAction();
    }

    const emptyCampos = () => {
        set_codigo('');
        set_descricao('');
        set_preco('');
        set_quantidade(0);
        set_total('');
        set_percentualComissao('');
        set_totalComissao('');
    }

    return (
        <Modal style={customStyles} isOpen={showModal}>

            <label className="ml-0" style={{ color: 'black', fontSize: 20, fontFamily: 'new-roman' }}>{title}</label>

            <div className="mb-0">
                <Divider style={{ backgroundColor: 'black' }} />
            </div>


            <div className="flex items-center justify-center">
                <div className="w-full max-w-xl">
                    <div className="leading-loose">

                        <section className="flex flex-col field sm:flex-row mt-4">
                            <div className="sm:w-sm">
                                <label className="block text-sm text-blue-700">Código</label>
                                <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    style={{ width: 200 }}
                                    type="text"
                                    autoComplete="off"
                                    value={_codigo}
                                    onChange={(e) => handle_change(e, set_codigo)}
                                />
                            </div>
                        </section>

                        <section className="flex flex-col field sm:flex-row mt-1">
                            <div className="sm:w-sm">
                                <label className="block text-sm text-blue-700">Descrição</label>
                                <input className="px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                    style={{ width: 550 }}
                                    type="text"
                                    autoComplete="off"
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
                                    value={_preco}
                                    onChange={(e) => handle_change_float(e, set_preco)}
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
                                    value={_total}
                                    onChange={(e) => handle_change_float(e, set_total)}
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
                                    value={_percentualComissao}
                                    onChange={(e) => handle_change_float(e, set_percentualComissao)}
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
                                    value={_totalComissao}
                                    onChange={(e) => handle_change_float(e, set_totalComissao)}
                                />
                            </div>
                        </section>

                        <div className="mt-4 mb-4">
                            <Divider style={{ backgroundColor: 'black' }} />
                        </div>

                        <div className="mt-5 items-center flex justify-between">
                            <button
                                className="px-6 py-0 text-orange-600 border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                type="button"
                                onClick={produto.id ? alterItem : addLista}
                            >
                                Confirmar
                            </button>

                            <button
                                className="px-6 py-0 text-orange-600 border-1 border-blue-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300 xl:ml-85"
                                type="button"
                                onClick={volta}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ProdutosForm;