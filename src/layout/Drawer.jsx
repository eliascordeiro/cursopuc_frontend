import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

import { _host, _menu, _sub_menu, _rotas } from "../config";

import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Collapse
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "20px",
  },
  icon: {
    color: "white"
  }
}));

const DrawerComponent = () => {

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [openSecondLevel, setOpenSecondLevel] = React.useState(false);

  const handleClickSecondLevel = () => {
    setOpenSecondLevel(!openSecondLevel);
  };

  const [Cadastros, setCadastros] = useState(true);
  const [Lançamentos, setLançamentos] = useState(true);
  const [Relatórios, setRelatórios] = useState(true);

  const [usuario, setUsuario] = useState(false);

  const menu = JSON.parse(sessionStorage.getItem("dados"))["menu"];
  const sub_menu = JSON.parse(sessionStorage.getItem("dados"))["sub_menu"];
  const master = JSON.parse(sessionStorage.getItem("dados"))["master"];

  const handleClickUsuario = () => {
    setUsuario(!usuario)
  };

  const handleClick = (_item) => {
    if (_item === 'Cadastros') {
      setCadastros(!Cadastros)
    }

    if (_item === 'Lançamentos') {
      setLançamentos(!Lançamentos)
    }

    if (_item === 'Relatórios') {
      setRelatórios(!Relatórios)
    }

  };

  const sair = (event) => {
    deleteTokens();
    window.location.replace("/");
  };

  const ve_c_vai = (_item) => {
    if (_item === 'Cadastros') {
      return Cadastros
    }

    if (_item === 'Lançamentos') {
      return Lançamentos
    }

    if (_item === 'Relatórios') {
      return Relatórios
    }
  }

  const rota1 = {
    pathname: "/autenticacao",
    state: "atualiza_cadastro",
  };

  const MeuMenu = () => {
    return (
      <div>
        <ListItem onClick={() => handleClickUsuario()} style={{ justifyContent: "center" }} >
          <IconButton style={{ outline: "none", border: "none" }}>
            <AccountCircle style={{ marginRight: 5 }} />
            <ListItemText
              disableTypography
              primary={
                <Typography
                  type="body2"
                  style={{
                    color: "#777",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {JSON.parse(sessionStorage.getItem("dados"))["nome"] == ""
                    ? JSON.parse(sessionStorage.getItem("dados"))["usuario"]
                    : JSON.parse(sessionStorage.getItem("dados"))["nome"]}
                </Typography>
              }
            />
          </IconButton>
        </ListItem>

        <Collapse in={usuario} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <Link to={rota1}>
              <ListItem
                button
                className={classes.nested}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      type="body2"
                      style={{
                        color: "teal",
                        fontWeight: "semibold",
                        fontSize: 14,
                      }}
                    >
                      Dados Pessoais
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
            <Link to='/alterar_senha'>
              <ListItem
                button
                className={classes.nested}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      type="body2"
                      style={{
                        color: "teal",
                        fontWeight: "semibold",
                        fontSize: 14,
                      }}
                    >
                      Alterar Senha
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <Divider />

        <Collapse in={usuario} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <Link to="/sair">
              <ListItem
                button
                className={classes.nested}
                onClick={handleClickSecondLevel}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      type="body2"
                      style={{
                        color: "teal",
                        fontWeight: "semibold",
                        fontSize: 14,
                      }}
                    >
                      Sair
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <Divider />

        {React.Children.toArray(
          _menu.map((item, i) => (
            <div>
              {master ? (
                <ListItem button onClick={() => handleClick(item)}>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        type="body2"
                        style={{
                          color: "#777",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {item.toUpperCase()}
                      </Typography>
                    }
                  />
                  {ve_c_vai(item) ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              ) : (
                <>
                  {menu[item] && (
                    <ListItem button onClick={() => handleClick(item)}>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            type="body2"
                            style={{
                              color: "#777",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            {item.toUpperCase()}
                          </Typography>
                        }
                      />
                      {ve_c_vai(item) ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  )}
                </>
              )}

              <Divider />

              <Collapse in={ve_c_vai(item)} timeout="auto" unmountOnExit>
                {React.Children.toArray(
                  _sub_menu[i].map((_item, _i) => (
                    <List component="div" disablePadding>
                      {master ? (
                        <Link to={_rotas[i][_item]}>
                          <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClickSecondLevel}
                          >
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography
                                  type="body2"
                                  style={{
                                    color: "teal",
                                    fontWeight: "semibold",
                                    fontSize: 15,
                                  }}
                                >
                                  {_item}
                                </Typography>
                              }
                            />
                          </ListItem>
                        </Link>
                      ) : (
                        <>
                          {sub_menu[item][_item] && (
                            <Link to={_rotas[i][_item]}>
                              <ListItem
                                button
                                className={classes.nested}
                                onClick={handleClickSecondLevel}
                              >
                                <ListItemText
                                  disableTypography
                                  primary={
                                    <Typography
                                      type="body2"
                                      style={{
                                        color: "teal",
                                        fontWeight: "semibold",
                                        fontSize: 15,
                                      }}
                                    >
                                      {_item}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            </Link>
                          )}
                        </>
                      )}
                      <Divider />
                    </List>
                  ))
                )}
              </Collapse>
            </div>
          ))
        )}
        <ListItem button onClick={() => sair()} style={{ justifyContent: "center" }}>
          <IconButton style={{ outline: "none", border: "none" }}>

            <LogoutIcon style={{ marginRight: 5 }} />

            <ListItemText
              disableTypography
              primary={
                <Typography
                  type="body2"
                  style={{
                    color: "blue",
                    fontWeight: "semibold",
                    fontSize: 15,
                  }}
                >
                  Sair do Aplicativo
                </Typography>
              }
            />
          </IconButton>
        </ListItem>
        <Divider />
      </div>
    );
  };


  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List
        >
          <MeuMenu />
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon} style={{ outline: "none", border: "none" }}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
