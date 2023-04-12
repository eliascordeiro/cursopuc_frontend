import React, { useState, useEffect } from 'react'

import { useMutation, useQueryClient } from "react-query";

import DeleteModal from "./../Util/DeleteModal";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { Box, IconButton } from "@material-ui/core";

import axios from 'axios'

import { _host } from '../../config'

import CurrencyFormat from 'react-currency-format'

import { Link } from 'react-router-dom'

import Toast from "light-toast";

import ReactSelect, { createFilter } from 'react-select';

import CustomMenuList from './../Util/virtuaLista'
import CustomOption from './../Util/Custom'

import {
    DataGrid,
    GridToolbarExport,
    GridToolbarContainer,
    ptBR,
    gridClasses,
} from "@mui/x-data-grid";

import { useDemoData } from "@mui/x-data-grid-generator";

function MyExportButton() {
    return (
        <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport style={{ outline: "none", border: "none" }} />
        </GridToolbarContainer>
    );
}

const postVendas = async (_vars) =>
    await (await axios.post(_host + 'vendas_mensais_aspma_novo', _vars, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
    })).data

const VendasTabela = (props) => {

    const [matricula, set_matricula] = useState('')
    const [contrato, set_contrato] = useState('')

    const [deleteId, setDeleteId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [_associado, set_associado] = useState('')

    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 4,
        maxColumns: 6,
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (id) =>
            axios.post(
                _host + 'exclui_contratos_aspma',
                { 'tab': "contratos", 'id': id, 'matricula': matricula, 'contrato': contrato },
                {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
                    },
                }
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries();
                hideModal();
            },
        }
    );

    const showDeleteModal = (id, _mt, _ct) => {

        set_matricula(_mt)
        set_contrato(_ct)

        setDeleteId(id);
        setShowModal(true);
    };

    const onDelete = async (id) => {
        Toast.loading('Aguarde... Excluindo registro.')
        deleteMutation.mutateAsync(id);
    };

    const hideModal = () => (setShowModal(false), Toast.hide());

    const rota1 = {
        pathname: "/nova/venda",
    };

    const [extrato, setExtrato] = useState([])
    const [pesquisa, setPesquisa] = useState(JSON.parse(sessionStorage.getItem('dados'))['mes_ano'])
    const [_total, setTotal] = useState(props.total)

    const [spin, setSpin] = useState(false)

    const pega = async (id, conta) => {
        Toast.loading()
        setSpin(true)

        let _mes = ''
        let _ano = ''

        if (conta) {
            _mes = id.trim().substr(0, 2) == '12' ? '01' : leftPad((parseInt(id.trim().substr(0, 2)) + 1), 2)
            _ano = id.trim().substr(0, 2) == '12' ? leftPad((parseInt(id.trim().substr(3, 7)) + 1), 4) : id.trim().substr(3, 7)
        } else {
            _mes = id.trim().substr(0, 2) == '01' ? '12' : leftPad((parseInt(id.trim().substr(0, 2)) - 1), 2)
            _ano = id.trim().substr(0, 2) == '01' ? leftPad((parseInt(id.trim().substr(3, 7)) - 1), 4) : id.trim().substr(3, 7)
        }

        let mes_ano = _mes + '-' + _ano

        setPesquisa(mes_ano)

        let _vars = { 'mes_ano': mes_ano }
        mutation.mutate(_vars)

    }

    const mutation = useMutation((_vars) => postVendas(_vars), {
        onSuccess: (data) => {
            setExtrato(JSON.parse(data['dados']))
            setTotal(data['total'])
            setSpin(false)
            Toast.hide()
        },
    })

    useEffect(
        () => {
            async function getExtrato() {
                setExtrato(props.descontos)
                setTotal(props.total)
            }
            getExtrato();
        }, [props.descontos])


    const leftPad = (value, totalWidth, paddingChar) => {
        let length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
    };

    const columns = [
        { field: "id", headerName: "ID", width: 150, hide: true },
        {
            field: 'data_da_venda',
            headerName: 'Data',
            width: 110,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'numero_do_contrato',
            headerName: 'Número',
            width: 130,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true,
        },
        {
            field: 'matricula_do_associado',
            headerName: 'Matrícula',
            width: 135,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'nome_do_associado',
            headerName: 'Associado',
            width: 300,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'nome_do_convenio',
            headerName: 'Convênio',
            width: 280,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'valor_total',
            headerName: 'Valor Total',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'numero_de_parcelas',
            headerName: 'Parcelas',
            width: 140,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'valor_da_parcela',
            headerName: 'Valor',
            width: 130,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'tipo_do_parcelamento',
            headerName: 'Parcelamento',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'desconto_inicial',
            headerName: 'Início',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'desconto_final',
            headerName: 'Final',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'margem_no_dia',
            headerName: 'Margem Dia',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'codigo_do_convenio',
            headerName: 'Cód. Convênio',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'codigo_da_consignataria',
            headerName: 'Cód. Consignatária',
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'nome_da_consignataria',
            headerName: 'Consignatária',
            width: 350,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'data_hora_da_inclusao',
            headerName: 'Inclusão',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'cpf_cnpj_do_usuario_inclusao',
            headerName: 'Cpf Usuário',
            width: 200,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'nome_do_usuario_inclusao',
            headerName: 'Usuário',
            width: 200,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'situacao',
            headerName: 'Situação',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'ip',
            headerName: 'IP',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
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
                        <Link to={`/editaVenda/${params.id}`}>
                            <EditIcon />
                        </Link>
                    </IconButton>

                    {(props.permissoes['Excluir'] || props.master) && (
                        <IconButton
                            style={{ outline: "none", border: "none" }}
                            edge="start"
                            color="inherit"
                            onClick={(event) => {
                                event.ignore = true;
                                showDeleteModal(params.id, params.row.matricula_do_associado, params.row.numero_do_contrato);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}

                </div>
            ),
        },
    ];

    const rows = extrato.map((vendas, index) => (
        {
            'id': vendas.id,
            'numero_do_contrato': vendas.numero_do_contrato,
            'data_da_venda': vendas.data_da_venda,
            'tipo_do_parcelamento': vendas.tipo_do_parcelamento,
            'desconto_inicial': vendas.desconto_inicial,
            'desconto_final': vendas.desconto_final,
            'margem_no_dia': vendas.margem_no_dia,
            'valor_total': vendas.valor_total,
            'numero_de_parcelas': vendas.tipo_do_parcelamento == 1 ? vendas.numero_de_parcelas : 'RECORRENTE',
            'valor_da_parcela': vendas.valor_da_parcela,
            'codigo_do_convenio': vendas.codigo_do_convenio,
            'nome_do_convenio': vendas.nome_do_convenio,
            'codigo_da_consignataria': vendas.codigo_da_consignataria,
            'nome_da_consignataria': vendas.nome_da_consignataria,
            'matricula_do_associado': vendas.matricula_do_associado,
            'nome_do_associado': vendas.nome_do_associado,
            'data_hora_da_inclusao': vendas.data_hora_da_inclusao,
            'cpf_cnpj_do_usuario_inclusao': vendas.cpf_cnpj_do_usuario_inclusao,
            'nome_do_usuario_inclusao': vendas.nome_do_usuario_inclusao,
            'situacao': vendas.situacao,
            'ip': vendas.ip,
            'sequencia': vendas.sequencia
        }
    )
    )

    function cardExpiry(val) {
        let month = limit(val.substring(0, 2), '12');
        let year = val.substring(2, 6);

        return month + (year.length ? '-' + year : '');
    }

    function limit(val, max) {
        if (val.length === 1 && val[0] > max[0]) {
            val = '0' + val;
        }

        if (val.length === 2) {
            if (Number(val) === 0) {
                val = '01';

            } else if (val > max) {
                val = max;
            }
        }

        return val;
    }

    const altura = window.screen.height - 321

    const handle_change = (e, _set) => {
        _set(e)
    }

    const api_historico_associado = async (_vars) => {
        let { data } = await axios.post(_host + 'vendas_mensais_aspma_por_socio', _vars, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        })

        Toast.hide()
        setSpin(true)

        return data
    }

    const procura = async () => {

        if (!_associado) {
            return
        }

        Toast.loading()
        setSpin(true)

        let _vars = {
            'associado': _associado
        }

        _mutation.mutate(_vars)
    }

    const _mutation = useMutation((_vars) => api_historico_associado(_vars), {
        onSuccess: (data) => {

            setExtrato(JSON.parse(data['dados']))
            setTotal(data['total'])
            setSpin(false)
            Toast.hide()

        },
    })

    return (

        <React.Fragment>

            <DeleteModal
                id={deleteId}
                showModal={showModal}
                deleteAction={onDelete}
                cancelAction={hideModal}
            />

            <div className="flex justify-between mb-0 mt-0">

                <section className="flex flex-col field md:flex-row">
                    {(props.permissoes['Incluir'] || props.master) && (
                        <div className="mt-8 sm:mt-8 sm:ml-4 sm:min-w-min">
                            <Link
                                to={rota1}
                                className="px-2 py-2 font-normal text-teal-200 border-1 border-teal-400 rounded hover:border-2 hover:bg-gray-700 hover:text-white"
                            >
                                Nova Venda
                            </Link>
                        </div>
                    )}
                </section>

                <section className="flex flex-col field lg:flex-row">
                    <div className="md:mt-2 md:ml-0 md:w-md">
                        <label className="block text-yellow-300 text-left">Associado</label>
                        <div className="text-gray-700 bg-gray-300 rounded md:w-md">
                            <ReactSelect
                                placeholder={'Selecione'}
                                options={props.pesq_socios}
                                filterOption={createFilter({ ignoreAccents: false })}
                                captureMenuScroll={false}
                                classNamePrefix="custom-select"
                                components={{ Option: CustomOption, MenuList: CustomMenuList }}
                                value={_associado}
                                onChange={(e) => handle_change(e, set_associado)}
                            />
                        </div>
                    </div>

                    <div className="mt-8 sm:mt-8 sm:ml-4 sm:min-w-min">
                        <button
                            className="px-2 py-1 text-white border-2 border-blue-400 rounded hover:border-2 hover:bg-teal-700 hover:text-white"
                            onClick={() => { procura() }}>
                            Procurar
                        </button>
                    </div>
                </section>


                <section className="flex flex-col field md:flex-row">
                    {(props.permissoes['Imprimir'] || props.master) && (
                        <div className="mt-6 md:mt-6 md:min-w-min">
                            <button
                                className="px-2 py-2 font-normal text-teal-200 border-1 border-teal-400 rounded hover:border-2 hover:bg-gray-700 hover:text-white"
                                type="button"
                                onClick={() => exportPDF(extrato)}
                            >
                                Imprimir
                            </button>
                        </div>
                    )}
                </section>
            </div>

            <Box className="flex bg-gray-300 bg-opacity-100 rounded shadow-xl mt-2"
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
                        backgroundColor: 'rgba(255, 7, 0, 0.55)',
                    },
                }}
                style={{ height: altura }}>

                <DataGrid
                    {...data}
                    localeText={ptBR.props.MuiDataGrid.localeText}
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    density="compact"
                    onRowClick={(params, event) => {
                        if (!event.ignore) {
                            console.log("push -> /roles/" + params.id);
                        }
                    }}
                    components={{
                        Toolbar: (props.permissoes['Exportar'] || props.master) ? MyExportButton : ''
                    }}
                    getCellClassName={(params) => {
                        if (params.field === '..nome') {
                            return '';
                        }
                        return 'cold';
                    }}
                />
            </Box>

            <div className="flex mt-2 justify-between">

                <section className="flex flex-col field md:flex-row">
                    {!spin ? (
                        <button className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                            onClick={() => { pega(pesquisa, false) }}>
                            Anterior
                        </button>

                    ) : (
                        <button className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                            disabled
                            onClick={() => { pega(pesquisa, false) }}>
                            Anterior
                        </button>

                    )
                    }
                </section>

                <section className="flex flex-col field sm:flex-row">
                    <div className="flex mt-0 justify-between">
                        <div className="mt-0 sm:min-w-min">
                            <CurrencyFormat className="text-gray-900 bg-gray-300 rounded"
                                style={{ width: 85 }}
                                value={pesquisa}
                                format={cardExpiry}
                                onChange={event => setPesquisa(event.target.value)} />
                        </div>

                        <div className="mt-0 sm:ml-4 md:min-w-0">
                            <input className="text-gray-900 bg-gray-300 rounded"
                                style={{ width: 105 }}
                                type="text"
                                disabled={true}
                                value={_total}
                            />
                        </div>
                    </div>
                </section>

                <section className="flex flex-col field md:flex-row">
                    {!spin ? (
                        <button className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                            onClick={() => { pega(pesquisa, true) }}>
                            Próximo
                        </button>

                    ) : (
                        <button className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                            disabled
                            onClick={() => { pega(pesquisa, true) }}>
                            Próximo
                        </button>

                    )
                    }
                </section>

            </div>

        </React.Fragment >
    );
}

export default VendasTabela

import jsPDF from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'

applyPlugin(jsPDF)

const exportPDF = (extrato) => {

    let _date = new Date().toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Vendas - Data: " + _date;
    const headers = [["DATA", "ASSOCIADO", "CONVÊNIO", "PARCELAS", "VALOR"]];

    const dados2 = extrato.map((elt) => [
        elt.data_da_venda,
        elt.nome_do_associado,
        elt.nome_do_convenio,
        elt.numero_de_parcelas,
        elt.valor_da_parcela,
    ]);

    let content = {
        startY: 50,
        head: headers,
        body: dados2,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content)
    doc.save("vendas.pdf");
};
