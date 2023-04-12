import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { Link } from "react-router-dom";

import { _host, _menu, _sub_menu, _rotas } from "../config";

import { isLoggedIn, deleteTokens } from "../auth/auth";

import SessionTimeout from "../timeout/SessionTimeout";

import { Redirect } from 'react-router-dom'

const MenuBar = (props) => {

  if (!isLoggedIn()) {
    return <Redirect to="/" />
  }

  const handleChange = (event) => {
    deleteTokens();
    window.location.replace("/");
  };

  const menu = _menu; //JSON.parse(sessionStorage.getItem("dados"))["menu"];
  const sub_menu = _sub_menu; //JSON.parse(sessionStorage.getItem("dados"))["sub_menu"];
  const master = true; //JSON.parse(sessionStorage.getItem("dados"))["master"];

  const [anchorCad, setAnchorCad] = React.useState(null);
  const cad_open = Boolean(anchorCad);

  const handleMenu = (event) => {
    setAnchorCad(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorCad(null);
  };

  const [anchorVen, setAnchorVen] = React.useState(null);
  const ven_open = Boolean(anchorVen);

  const handleMenuVen = (event) => {
    setAnchorVen(event.currentTarget);
  };

  const handleCloseVen = () => {
    setAnchorVen(null);
  };

  const [anchorRel, setAnchorRel] = React.useState(null);
  const rel_open = Boolean(anchorRel);

  const handleMenuRel = (event) => {
    setAnchorRel(event.currentTarget);
  };

  const handleCloseRel = () => {
    setAnchorRel(null);
  };

  const [openSecondLevel, setOpenSecondLevel] = React.useState(false);

  const handleClickSecondLevel = () => {
    setOpenSecondLevel(!openSecondLevel);
  };

  const _array_menu = master ? _menu : []
  const _array_submenu = master ? _sub_menu : []

  if (!master) {
    for (let property in menu) {
      if (menu[property]) {
        _array_menu.push(property)
      }
    }

    for (let property in _array_menu) {
      let __x = []
      for (let _property in sub_menu[_array_menu[property]]) {
        if (sub_menu[_array_menu[property]][_property]) {
          __x.push(_property)
        }
      }
      _array_submenu.push(__x)
    }
  }

  return (

    <React.Fragment>

      <SessionTimeout isAuthenticated={isLoggedIn()} logOut={handleChange} />

      {
        React.Children.toArray(
          _array_menu.map((item, i) => (
            <div>
              <Link className={props._classes}
                onClick={item.toUpperCase() === 'CADASTROS' ? handleMenu : (item.toUpperCase() === 'LANÇAMENTOS' ? handleMenuVen : handleMenuRel)}
              >
                {item}
              </Link>
              <Menu
                id={item.toUpperCase() === 'CADASTROS' ? "menu-appbar" : (item.toUpperCase() === 'LANÇAMENTOS' ? "_menu-appbar" : "__menu-appbar")}
                anchorEl={item.toUpperCase() === 'CADASTROS' ? anchorCad : (item.toUpperCase() === 'LANÇAMENTOS' ? anchorVen : anchorRel)}
                open={item.toUpperCase() === 'CADASTROS' ? cad_open : (item.toUpperCase() === 'LANÇAMENTOS' ? ven_open : rel_open)}
                onClose={item.toUpperCase() === 'CADASTROS' ? handleClose : (item.toUpperCase() === 'LANÇAMENTOS' ? handleCloseVen : handleCloseRel)}
              >
                {
                  React.Children.toArray(
                    _array_submenu[i].map((_item, _i) => (
                      <div>
                        <Link to={_rotas[i][_item]}>
                          <MenuItem>
                            {_item}
                          </MenuItem>
                        </Link>
                      </div>
                    ))
                  )
                }
              </Menu>
            </div>

          ))
        )

      }
    </React.Fragment>
  );
};

export default MenuBar;