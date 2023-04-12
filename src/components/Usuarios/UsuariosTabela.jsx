import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { AppContext } from "../../store/app-context";
import DeleteModal from "./../Util/DeleteModal";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/material-ui/Edit";
import { Box, IconButton } from "@material-ui/core";

import { _host } from "../../config";

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

const UsuariosTabela = ({ usuarios, permissoes, master }) => {
    const [deleteId, setDeleteId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [flashMessage, setFlashMessage] = useContext(AppContext);

    let _date = new Date().toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const { data } = useDemoData({
        dataSet: "Commodity",
        rowLength: 4,
        maxColumns: 6,
    });

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (id) =>
            axios.post(
                _host + 'exclui_mongo_aspma', { 'tb': 'usuarios_aspma', 'psq': { '_id': id } },
                {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
                    },
                }
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries();
                setFlashMessage("Registro Excluído!");
                hideModal();
            },
        }
    );

    const showDeleteModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const onDelete = async (id) => {
        deleteMutation.mutateAsync(id);
    };

    const hideModal = () => setShowModal(false);

    const renderDetailsButton = (params) => {
        return (
            <strong >
                <IconButton
                    variant="contained"
                    size="small"
                    style={{ outline: "none", border: "none" }}
                    onClick={(event) => {
                        event.ignore = true;
                    }}
                >
                    <Link
                        to={`/editaUsuarios/${params.id}`}>
                        <EditIcon />
                    </Link>
                </IconButton>

                {(permissoes['Excluir'] || master) && (
                    <IconButton
                        variant="contained"
                        size="small"
                        style={{ outline: "none", border: "none" }}
                        onClick={(event) => {
                            event.ignore = true;
                            showDeleteModal(params.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </strong>
        )
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 150, hide: true },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 530,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'usuario',
            headerName: 'Usuário',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'email',
            headerName: 'E-Mail',
            width: 280,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',
        },
        {
            field: 'celular',
            headerName: 'celular',
            width: 150,
            editable: false,
            headerClassName: 'super-app-theme--header',
            cellClassName: 'super-app-theme--cell',

        },
        {
            field: "action",
            headerName: "Ações",
            headerClassName: 'super-app-theme--header',
            width: 120,
            editable: false,
            cellClassName: 'super-app-theme--cell',
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <div>
                    <IconButton
                        size="small"
                        style={{ outline: "none", border: "none" }}
                        onClick={(event) => {
                            event.ignore = true;
                        }}
                    >
                        <Link to={`/editaUsuarios/${params.id}`}>
                            <EditIcon />
                        </Link>
                    </IconButton>

                    <IconButton
                        size="small"
                        color="inherit"
                        style={{ outline: "none", border: "none" }}
                        onClick={(event) => {
                            event.ignore = true;
                            showDeleteModal(params.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>

                </div >
            )
        },
    ]

    const rows = usuarios.map((_usuarios, index) => (
        {
            '_id': _usuarios._id['$oid'],
            'nome': _usuarios.nome.toUpperCase(),
            'usuario': _usuarios.usuario.toUpperCase(),
            'email': _usuarios.email.toLowerCase(),
            'celular': _usuarios.celular
        }
    )
    )

    const altura = window.screen.height - 300

    //console.log(JSON.parse(sessionStorage.getItem("dados")))

    return (
        <React.Fragment>
            <DeleteModal
                id={deleteId}
                showModal={showModal}
                deleteAction={onDelete}
                cancelAction={hideModal}
            />

            <div className="flex mt-6 justify-between">
                <h2 className="mt-4 text-center text-yellow-300">USUÁRIOS</h2>
                {(permissoes['Incluir'] || master) && (
                    <div className="mt-5 mb-0">
                        <Link
                            to="/user/novo"
                            className="px-2 py-1 font-normal text-teal-200 border-1 border-teal-400 rounded hover:border-2 hover:bg-gray-700 hover:text-white"
                        >
                            Novo Associado
                        </Link>
                    </div>
                )}
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
                    getRowId={(row) => row._id}
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
                    components={{
                        Toolbar: (permissoes['Exportar'] || master) ? MyExportButton : ''
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

export default UsuariosTabela
