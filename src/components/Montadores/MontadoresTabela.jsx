import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import DeleteModal from "../Util/DeleteModal";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Box, IconButton } from "@material-ui/core";

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

function MyExportButton() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport style={{ outline: "none", border: "none" }} />
    </GridToolbarContainer>
  );
}

const MontadoresTabela = ({ dados, selects, permissoes, master }) => {

  const [deleteId, setDeleteId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  let _date = new Date().toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id) =>
      axios({
        method: 'delete',
        url: _host + `montadores/${id}`,
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token') }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
        hideModal();
        Toast.info("Registro excluído com sucesso!", 500);
      },
    }
  );

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  const hideModal = () => setShowModal(false);

  const rota1 = {
    pathname: "/novo/montador",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    {
      field: "nome",
      headerName: "Nome",
      width: 450,
      editable: false,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: "email",
      headerName: "E-Mail",
      width: 400,
      editable: false,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: "telefone",
      headerName: "Telefone",
      width: 230,
      editable: false,
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
            <Link to={`/editaMontador/${params.id}`}>
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

  const rows = dados.map((dados, index) => ({
    id: dados.id,
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone
  }));

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Montadores - Data: " + _date;
    const headers = [["NOME", "E-MAIL"]];

    const dados2 = dados.map((elt) => [
      elt.nome,
      elt.email,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: dados2,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("montadores.pdf");
  };

  const altura = window.screen.height - 300

  return (
    <React.Fragment>
      <DeleteModal
        id={deleteId}
        showModal={showModal}
        deleteAction={onDelete}
        cancelAction={hideModal}
      />

      <div className="flex mt-6 justify-between">
        <h2 className="mt-4 text-center text-yellow-300">Montadores</h2>
        {/*{(permissoes['Incluir'] || master) && (*/}
        <div className="mt-5 mb-0">
          <Link
            to={rota1}
            className="px-2 py-1 font-normal text-teal-200 border-1 border-teal-400 rounded hover:border-2 hover:bg-gray-700 hover:text-white"
          >
            Novo Montador
          </Link>
        </div>
        {/*})}*/}

        {/*
        <button
          className="px-4 py-1 font-semibold text-purple-200 border-2 border-purple-200 rounded hover:border-2 hover:bg-purple-200 hover:text-black"
          type="button"
          onClick={() => exportPDF()}
        >
          Imprimir
        </button>
        */}

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
            backgroundColor: '#FFB52E',
          },
        }}
        style={{ height: altura }}>
        <DataGrid
          {...data}
          localeText={ptBR.props.MuiDataGrid.localeText}
          rows={rows}
          columns={columns}
          checkboxSelection={false}
          disableSelectionOnClick
          density="compact"
          onRowClick={(params, event) => {
            if (!event.ignore) {
              console.log("push -> /roles/" + params.id);
            }
          }}
          //components={{
          //  Toolbar: (permissoes['Exportar'] || master) ? MyExportButton : ''
          //}}
          components={{
            Toolbar: MyExportButton
          }}
          getCellClassName={(params) => {
            if (params.field === '..nome') {
              return '';
            }
            return 'cold';
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default MontadoresTabela;
