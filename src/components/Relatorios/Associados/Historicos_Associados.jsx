import React, { useState } from 'react'

import { useMutation } from "react-query";

import { Box } from "@material-ui/core";

import axios from 'axios'

import { _host } from '../../../config'

import CurrencyFormat from 'react-currency-format'

import Toast from "light-toast";

import ReactSelect, { createFilter } from 'react-select';

import CustomMenuList from './../../Util/virtuaLista'
import CustomOption from './../../Util/Custom'

import {
    DataGrid,
    GridToolbarExport,
    GridToolbarContainer,
    ptBR,
} from "@mui/x-data-grid";

import { useDemoData } from "@mui/x-data-grid-generator";

const Historicos_Associados_Tabela = (props) => {
    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 4,
        maxColumns: 6,
    });

    const api_historico_associado = async (_vars) => {
        let { data } = await axios.post(_host + 'historico_associados_aspma', _vars, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
        })
        Toast.hide()
        set_spin(false)
        return data
    }

    const [_associado, set_associado] = useState('')

    const [_mes_ano_inicial, set_mes_ano_inicial] = useState('')
    const [_mes_ano_final, set_mes_ano_final] = useState('')

    const [extrato, set_extrato] = useState([])
    const [relatorio, set_relatorio] = useState([])

    const [_resumo, set_resumo] = useState([])

    const [_total, set_total] = useState('')
    const [__total, set__total] = useState('')

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


    const procura = async () => {
        Toast.loading()
        set_spin(true)

        let _vars = {
            'mes_ano_inicial': _mes_ano_inicial,
            'mes_ano_final': _mes_ano_final,
            'associado': _associado
        }

        mutation.mutate(_vars)
    }

    const mutation = useMutation((_vars) => api_historico_associado(_vars), {
        onSuccess: (data) => {

            set_relatorio(JSON.parse(data['dados']))
            set_resumo(JSON.parse(data['dados']))
            set_total(data['total'])

            set_filtro(1)

        },
    })

    const columns = [
        { field: "id", headerName: "ID", width: 150, hide: true },
        {
            field: 'codigo_do_convenio',
            headerName: 'Código',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: true
        },
        {
            field: 'nome_do_convenio',
            headerName: 'Convênio',
            width: 360,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
            hide: _filtro === 1 ? false : true
        },
        {
            field: 'numero_do_contrato',
            headerName: 'Nº Venda',
            width: 140,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'data_contrato',
            headerName: 'Data',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'vencimento',
            headerName: 'Mês-Ano',
            width: 170,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'nrseq',
            headerName: 'Parcela',
            width: 140,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'numero_parcelas',
            headerName: 'De',
            width: 100,
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
            "numero_parcelas": vendas.numero_parcelas,
            "data_contrato": vendas.data_contrato
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

    const altura = window.screen.height - 303

    const handle_change = (e, _set) => {
        _set(e)
    }

    const handle_change_mes_ano = (e, _set) => {
        _set(e.target.value)
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
                            className="px-5 py-0 text-gray-700 border-2 border-blue-400 rounded hover:border-2 hover:bg-teal-700 hover:text-white"
                            type="button"
                            onClick={() => {
                                exportPDF(extrato, [_mes_ano_inicial, _mes_ano_final], [__total], _associado['nome'])
                            }
                            }
                        >
                            Imprimir
                        </button>

                        <GridToolbarContainer className="gridClasses.toolbarContainer sm:ml-5">
                            <GridToolbarExport style={{ height: 40, outline: "none", border: "none" }} />
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

                    <div className="md:mt-0 md:ml-0 md:w-md">
                        <label className="block text-yellow-300 text-left">Associado</label>
                        <div className="text-gray-700 bg-gray-300 rounded md:w-md">
                            <ReactSelect
                                placeholder={'Selecione'}
                                options={props.associados}
                                filterOption={createFilter({ ignoreAccents: false })}
                                captureMenuScroll={false}
                                classNamePrefix="custom-select"
                                components={{ Option: CustomOption, MenuList: CustomMenuList }}
                                value={_associado}
                                onChange={(e) => handle_change(e, set_associado)}
                            />
                        </div>
                    </div>

                </section>

                <section className="flex flex-col field md:flex-row">

                    <div className="mt-0 sm:mt-0 sm:ml-6 sm:min-w-min">
                        <label className="block text-sm text-yellow-300">Mês-Ano Inicial</label>
                        <CurrencyFormat className="text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white sm:w-sm"
                            value={_mes_ano_inicial}
                            format={cardExpiry}
                            onChange={(e) => handle_change_mes_ano(e, set_mes_ano_inicial)} />
                    </div>

                    <div className="mt-0 sm:mt-0 sm:ml-4 sm:min-w-min">
                        <label className="block text-sm text-yellow-300">Mês-Ano Final</label>
                        <CurrencyFormat className="text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white sm:w-sm"
                            value={_mes_ano_final}
                            format={cardExpiry}
                            onChange={(e) => handle_change_mes_ano(e, set_mes_ano_final)} />
                    </div>

                    <div className="mt-6 sm:mt-6 sm:ml-4 sm:min-w-min">
                        <button
                            className="px-2 py-1 text-white border-2 border-blue-400 rounded hover:border-2 hover:bg-teal-700 hover:text-white"
                            onClick={() => { procura() }}>
                            Procurar
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

export default Historicos_Associados_Tabela

import jsPDF from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'

applyPlugin(jsPDF)

const exportPDF = (extrato, mes_ano, valores, associado) => {

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const title = "Descontos: " + mes_ano[0] + " a " + mes_ano[1] + " Associado: " + associado

    const headers = [["MÊS-ANO", "CONVÊNIO", "PARCELA", "DE", "VALOR"]]

    const rodape = "Total: " + valores[0]

    let _dados

    _dados = extrato.map((elt) => [
        elt.vencimento,
        elt.nome_do_convenio,
        elt.nrseq,
        elt.numero_parcelas,
        elt.valor,
    ])

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