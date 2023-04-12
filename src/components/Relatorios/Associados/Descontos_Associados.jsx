import React, { useState, useEffect } from 'react'

import { useMutation } from "react-query";

import { Box } from "@material-ui/core";

import axios from 'axios'

import { _host } from '../../../config'

import CurrencyFormat from 'react-currency-format'

import Toast from "light-toast";

import SelectSearch from "react-select-search";

import {
    DataGrid,
    GridToolbarExport,
    GridToolbarContainer,
    ptBR,
    gridClasses,
} from "@mui/x-data-grid";

import { useDemoData } from "@mui/x-data-grid-generator";

const filtro = [{ 'value': 1, 'name': 'DETALHADO' }, { 'value': 2, 'name': 'RESUMIDO' }]

const Descontos_Associados_Tabela = (props) => {
    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 4,
        maxColumns: 6,
    });

    const postVendas = async (_vars) => {
        let { data } = await axios.post(_host + 'descontos_mensais_aspma_associados', _vars, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        })
        Toast.hide()
        set_spin(false)
        return data
    }

    const [_mes_ano, set_mes_ano] = useState(JSON.parse(sessionStorage.getItem('dados'))['mes_ano'])

    const [extrato, set_extrato] = useState([])
    const [relatorio, set_relatorio] = useState(props.descontos)

    const [_resumo, set_resumo] = useState(props.descontos)

    const [consig, set_consig] = useState(props.consignatarias)

    const [_total, set_total] = useState(props.total)
    const [__total, set__total] = useState('')

    const [_consignataria, set_consignataria] = useState(1)

    const [_filtro, set_filtro] = useState(1)

    const [_spin, set_spin] = useState(false)

    React.useEffect(
        () => {
            async function getExtrato() {
                set_extrato(_filtro === 1 ? relatorio : _resumo)
                set__total(_total)
            }
            getExtrato()
        }, [relatorio, _resumo, _total, _filtro])

    const pega = async (id, conta) => {
        Toast.loading()
        set_spin(true)

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


        set_mes_ano(mes_ano)


        let _vars = { 'mes_ano': mes_ano, 'consignataria': _consignataria }
        mutation.mutate(_vars)
    }

    const mutation = useMutation((_vars) => postVendas(_vars), {
        onSuccess: (data) => {

            set_relatorio(JSON.parse(data['dados']))
            set_resumo(JSON.parse(data['dados']))
            set_total(data['total'])

            set_filtro(1)

        },
    })

    const leftPad = (value, totalWidth, paddingChar) => {
        let length = totalWidth - value.toString().length + 1;
        return Array(length).join(paddingChar || '0') + value;
    };

    const columns = [
        { field: "id", headerName: "ID", width: 150, hide: true },
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
            width: 430,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'valor',
            headerName: 'Valor',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'codigo_do_convenio',
            headerName: 'Código',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: _filtro === 1 ? false : true
        },
        {
            field: 'nome_do_convenio',
            headerName: 'Convênio',
            width: 350,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: _filtro === 1 ? false : true
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
            field: 'situacao',
            headerName: 'Situação',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },

    ];

    const rows = extrato.map((vendas, index) => (
        {
            "id": vendas.id,
            "matricula_do_associado": vendas.matricula_do_associado,
            "numero_do_contrato": vendas.numero_do_contrato,
            "nrseq": vendas.nrseq,
            "vencimento": vendas.vencimento,
            "valor": (vendas.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
            "baixa": vendas.baixa,
            "codigo_do_convenio": vendas.codigo_do_convenio,
            "nome_do_associado": vendas.nome_do_associado,
            "codigo_da_consignataria": vendas.codigo_da_consignataria,
            "nome_da_consignataria": vendas.nome_da_consignataria,
            "nome_do_convenio": vendas.nome_do_convenio,
            "numero_parcelas": vendas.numero_parcelas
        }
    )
    )

    const consigs = consig.map((consig, index) => (
        {
            "value": consig.id,
            "name": consig.nome
        }
    ))

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

    const altura = window.screen.height - 303

    const handle_change = (e, _set) => {

        Toast.loading()
        set_spin(true)

        _set(e)
        set_filtro(1)

        let _vars = { 'mes_ano': _mes_ano, 'consignataria': e }
        mutation.mutate(_vars)
    }



    const filtra = async () => {

        let _result = [];

        if (_filtro === 1) {

            await _resumo.reduce(function (res, value) {
                if (!res[value.matricula_do_associado]) {
                    res[value.matricula_do_associado] = {
                        "id": value.id,
                        "matricula_do_associado": value.matricula_do_associado,
                        "numero_do_contrato": value.numero_do_contrato,
                        "nrseq": value.nrseq,
                        "vencimento": value.vencimento,
                        "valor": 0.00,
                        "baixa": value.baixa,
                        "codigo_do_convenio": value.codigo_do_convenio,
                        "nome_do_associado": value.nome_do_associado,
                        "codigo_da_consignataria": value.codigo_da_consignataria,
                        "nome_da_consignataria": value.nome_da_consignataria,
                        "nome_do_convenio": value.nome_do_convenio,
                        "numero_parcelas": value.numero_parcelas
                    };
                    _result.push(res[value.matricula_do_associado])
                }
                res[value.matricula_do_associado].valor += parseFloat(transforma_float(value.valor));
                return res;
            }, {});

        } else {

            _result = relatorio.map((vendas, index) => (
                {
                    "id": vendas.id,
                    "matricula_do_associado": vendas.matricula_do_associado,
                    "numero_do_contrato": vendas.numero_do_contrato,
                    "nrseq": vendas.nrseq,
                    "vencimento": vendas.vencimento,
                    "valor": vendas.valor,
                    "baixa": vendas.baixa,
                    "codigo_do_convenio": vendas.codigo_do_convenio,
                    "nome_do_associado": vendas.nome_do_associado,
                    "codigo_da_consignataria": vendas.codigo_da_consignataria,
                    "nome_da_consignataria": vendas.nome_da_consignataria,
                    "nome_do_convenio": vendas.nome_do_convenio,
                    "numero_parcelas": vendas.numero_parcelas
                }
            )
            )
        }

        set_extrato(_result)

        Toast.hide()
        set_spin(false)

    }

    const handle_change_resumido = (e, _set) => {

        Toast.loading()
        set_spin(true)
        _set(e)
        filtra()

    }

    const MyExportButton = () => {
        return (
            <>
                <div className="flex justify-between mb-0 mt-0">
                    <section className="flex flex-col field md:flex-row">
                        <div className="mt-0 sm:ml-2 md:min-w-0">
                            <div style={{ marginTop: -10, marginBottom: -5 }}>
                                <label style={{ fontSize: 12, color: 'black' }}>Valor Total</label>
                            </div>

                            <input className="text-gray-900 bg-gray-300 rounded"
                                style={{ width: 150 }}
                                type="text"
                                disabled={true}
                                value={__total}
                            />
                        </div>

                    </section>

                    <section className="flex flex-col field md:flex-row">
                        <button
                            className="px-10 py-0 text-gray-700 border-2 border-blue-400 rounded hover:border-2 hover:bg-teal-700 hover:text-white"
                            type="button"
                            onClick={() => {
                                exportPDF(extrato, _mes_ano, [__total], [consigs, _consignataria], _filtro)
                            }
                            }
                        >
                            Imprimir
                        </button>

                        <GridToolbarContainer className="gridClasses.toolbarContainer sm:ml-5">
                            <GridToolbarExport style={{ outline: "none", border: "none" }} />
                        </GridToolbarContainer>
                    </section>
                </div>
            </>
        );
    }

    return (

        <React.Fragment>
            <div className="flex justify-between mb-0 mt-0">

                <section className="flex flex-col field md:flex-row">

                    <div className="sm:mt-0 sm:ml-0 sm:w-sm">
                        <label className="mb-1 block text-yellow-300 text-left">Consignatária</label>
                        <div className="text-gray-700 bg-gray-300 rounded md:w-md">
                            <SelectSearch
                                options={consigs}
                                value={_consignataria}
                                onChange={(e) => handle_change(e, set_consignataria)}
                            />
                        </div>
                    </div>

                    <div className="sm:mt-0 sm:ml-20 sm:w-sm">
                        <label className="mb-1 block text-yellow-300 text-left">Filtro</label>
                        <div className="text-gray-700 bg-gray-300 rounded sm:w-sm">
                            <SelectSearch
                                options={filtro}
                                value={_filtro}
                                onChange={(e) => handle_change_resumido(e, set_filtro)}
                            />
                        </div>
                    </div>
                </section>

                <section className="flex flex-col field md:flex-row">

                    <div className="mt-6 sm:mt-6 sm:ml-6  sm:min-w-min">
                        <button
                            className="px-2 py-1 text-white border-2 border-blue-400 rounded hover:border-2 hover:bg-teal-700 hover:text-white"
                            disabled={_spin ? true : false}
                            onClick={() => { pega(_mes_ano, false) }}>
                            Anterior
                        </button>
                    </div>

                    <div className="mt-0 sm:mt-0 sm:ml-4 sm:min-w-min">
                        <label className="block text-sm text-yellow-300 text-center">Mês-Ano</label>
                        <CurrencyFormat className="text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white sm:min-w-min text-center"
                            value={_mes_ano}
                            format={cardExpiry}
                            onChange={event => set_mes_ano(event.target.value)} />
                    </div>

                    <div className="mt-6 sm:mt-6 sm:ml-4 sm:min-w-min">
                        <button
                            className="px-2 py-1 text-white border-2 border-blue-400 rounded hover:border-2 hover:bg-teal-700 hover:text-white"
                            disabled={_spin ? true : false}
                            onClick={() => { pega(_mes_ano, true) }}>
                            Próximo
                        </button>
                    </div>
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
                    components={{
                        Toolbar: MyExportButton,
                    }}
                    getCellClassName={(params) => {
                        return 'cold';
                    }}
                />
            </Box>



        </React.Fragment>
    );
}

export default Descontos_Associados_Tabela

import jsPDF from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'

applyPlugin(jsPDF)

const exportPDF = (extrato, _mes_ano, valores, consigs, filtro) => {

    let item = consigs[0].find((item) => item.value === consigs[1])

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const rodape = "Total: " + valores[0]

    const title = "Descontos Mês-Ano: " + _mes_ano + "   Consignatária: " + item.name

    const headers = filtro === 1 ? [["MATRÍCULA", "ASSOCIADO", "CONVÊNIO", "PARCELA", "DE", "VALOR"]] :
        [["MATRÍCULA", "ASSOCIADO", "VALOR"]];

    let _dados

    if (filtro === 1) {
        _dados = extrato.map((elt) => [
            elt.matricula_do_associado,
            elt.nome_do_associado,
            elt.nome_do_convenio,
            elt.nrseq,
            elt.numero_parcelas,
            elt.valor,
        ])
    } else {

        _dados = extrato.map((elt) => [
            elt.matricula_do_associado,
            elt.nome_do_associado,
            (elt.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
        ])

    }

    let content = {
        startY: 50,
        head: headers,
        body: _dados,
        styles: { overflow: 'linebreak', fontSize: 7 }
    };

    doc.text(title, doc.internal.pageSize.width / 2, 40, null, null, 'center');

    doc.autoTable(content)

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(12)
    doc.text(rodape, doc.internal.pageSize.width / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' })
    doc.save("vendas.pdf");

};

const transforma_float = (_vl) => {
    let __vl = _vl
    __vl = __vl.replace('.', '')
    __vl = __vl.replace(',', '.')

    return parseFloat(__vl).toFixed(2)
}




