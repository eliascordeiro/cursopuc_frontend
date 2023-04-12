import React, { Fragment } from "react";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SessionTimeout from "../timeout/SessionTimeout";
import { isLoggedIn, deleteTokens } from "../auth/auth";

import MenuBar from "./Menubar";
import { yellow } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: 'inherit',
    fontSize: "17px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElias, setAnchorElias] = React.useState(null);
  const open = Boolean(anchorEl);
  const openPrincipal = Boolean(anchorElias);

  const handleChange = (event) => {
    deleteTokens();
    window.location.replace("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //const handleMenuPrincipal = (event) => {
  //  setAnchorElias(event.currentTarget);
  //};

  const handleClose = () => {
    setAnchorEl(null);
  };

  //const handleClosePrincipal = () => {
  //  setAnchorElias(null);
  //};

  const rota1 = {
    pathname: "/autenticacao",
    state: "atualiza_cadastro",
  };

  //#619f30

  //background: #3f4f79;
  //background: radial-gradient(ellipse at center, #3f4f79 0%, #ebebf8 100%);

  //<AppBar position="absolute" style={{ background: '#2E3B55' }}>
  //<AppBar position="absolute" style={{ background: '#2E3B55' }}>

  return (
    <React.Fragment>
      <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />
      <AppBar position="absolute" >
        <CssBaseline />
        <Toolbar>
          <Typography className={classes.logo}>
            <Link className="w-full" to="/home" style={{ color: 'inherit', fontSize: 20, fontFamily: 'cursive' }}>
              {/*<img src="/logo.png" alt="logo" width="150" />*/}
              MONTAGENS
            </Link>
          </Typography>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <div className={classes.navlinks}>
              {isLoggedIn() && (
                <>
                  <MenuBar
                    _classes={classes.link}
                    _open={open}
                    _handle={handleMenu}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    className={classes.link}
                  />
                  <div>
                    <IconButton
                      className={classes.link}
                      style={{ outline: "none", border: "none" }}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <div
                        style={{
                          marginRight: "5px",
                          fontSize: 15,
                          fontWeight: "semibold",
                        }}
                      >
                        {JSON.parse(sessionStorage.getItem("dados"))["name"] ==
                          ""
                          ? JSON.parse(sessionStorage.getItem("dados"))[
                          "usuario"
                          ]
                          : JSON.parse(sessionStorage.getItem("dados"))["name"]}
                      </div>
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <Link to={rota1}>
                        {" "}
                        <MenuItem style={{ marginLeft: 10, marginRight: 10 }}>
                          {" "}
                          Dados Pessoais{" "}
                        </MenuItem>{" "}
                      </Link>

                      {/*  
                      <Link to='/alterar_senha'>
                        {" "}
                        <MenuItem style={{ marginLeft: 10, marginRight: 10 }}>
                          {" "}
                          Alterar Senha{" "}
                        </MenuItem>{" "}
                      </Link>
                    */}

                      <Link to="/sair">
                        {" "}
                        <MenuItem style={{ marginLeft: 10, marginRight: 10 }}>
                          {" "}
                          Sair do Aplicativo{" "}
                        </MenuItem>{" "}
                      </Link>
                    </Menu>
                  </div>
                </>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default Navbar;
