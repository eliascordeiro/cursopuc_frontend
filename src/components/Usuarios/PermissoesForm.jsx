import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  _quadro,
  _menu,
  _sub_menu,
  _menu_checked,
  _checked,
} from "../../config";

import { makeStyles } from "@mui/styles";

import List from "@mui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./../form.css";

//------------------------------------------------------------------------------------------//

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedSecondLevel: {
    paddingLeft: theme.spacing(8),
  },
}));

const PermissoesForm = ({
  permissoes,
  submitText,
  submitAction,
  titulo,
}) => {
  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: permissoes || {},
  });

  console.log(permissoes)

  const classes = useStyles();

  const _date = new Date().toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const history = useHistory();

  const [menu_check, setMenu_Check] = useState(
    JSON.parse(JSON.stringify(!permissoes['menu'] ? _menu_checked : permissoes['menu']))
  );
  const [menu, setMenu] = useState(JSON.parse(JSON.stringify(!permissoes['sub_menu'] ? _checked : permissoes['sub_menu'])));

  const handleChangeMenu_Check = (_m, _s, _index) => {
    menu_check[_m] = !_s;

    setMenu_Check((prevState) => ({
      ...prevState,
    }));

    for (let _x = 0; _x < _sub_menu[_index].length; _x++) {
      let _check_sub = _sub_menu[_index][_x];
      menu[_m][_check_sub] = !_s;

      setMenu((prevState) => ({
        ...prevState,
      }));
    }
  };

  const handleChangeCheck = (_m, _v, _s, _i) => {
    let __menu = menu[_m];
    __menu[_v] = !_s;

    var _conta_true = 0;

    for (let _x = 0; _x < _sub_menu[_i].length; _x++) {
      let _check_sub = _sub_menu[_i][_x];

      if (menu[_m][_check_sub] === true) {
        _conta_true++;
      }
    }

    if (_conta_true > 0) {
      menu_check[_m] = true;
    } else {
      menu_check[_m] = false;
    }

    setMenu((prevState) => ({
      ...prevState,
    }));

  };

  return (
    <div className="flex lg justify-center">
      <div style={_quadro}>
        <h2 style={{ textAlign: "center" }}>{titulo}</h2>

        <form className="max-w-md mt-4" onSubmit={handleSubmit(submitAction)}>
          <div className="flex mt-4 justify-between">
            {React.Children.toArray(
              _menu.map((item, i) => (
                <div>
                  <ListItem>
                    <FormControlLabel
                      style={{ color: "#000" }}
                      control={
                        <Checkbox
                          {...register("menu", { value: menu_check })}
                          checked={menu_check[item]}
                          value={item}
                          onChange={() =>
                            handleChangeMenu_Check(item, menu_check[item], i)
                          }
                        />
                      }
                      label={item.toUpperCase()}
                    />
                  </ListItem>

                  <div style={{ marginLeft: 40 }}>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      {React.Children.toArray(
                        _sub_menu[i].map((_item, _i) => (
                          <List component="div" disablePadding>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...register("sub_menu", { value: menu })}
                                  checked={menu[item][_item]}
                                  value={_item}
                                  onChange={() =>
                                    handleChangeCheck(
                                      item,
                                      _item,
                                      menu[item][_item],
                                      i
                                    )
                                  }
                                />
                              }
                              label={_item}
                            />
                          </List>
                        ))
                      )}
                    </Collapse>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex mt-8 justify-between">
            <button
              className="bg-teal-800 border-teal-800 shadow-md text-white btn hover:bg-gray-100 hover:border-2 hover:text-teal-900"
              type="submit"
            >
              {submitText}
            </button>
            <button
              className="border-2 border-gray-600 shadow-md text-white text-gray-600 btn hover:bg-gray-600 hover:text-gray-100"
              type="button"
              onClick={() => history.goBack()}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissoesForm;
//------------------------------------------------------------------------------------------//
