import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { 
  IconButton,
  Divider,
  List,
  ListItem,
  Collapse,
  Checkbox,
  FormControlLabel,
  green,
  ExpandLess,
  ExpandMore
} from "@material-ui/core";

import {
  _menu,
  _sub_menu,
  _menu_checked,
  _checked,
  __menu,
  acoes_titulo,
  acoes_condicao,
} from "../../config";
//------------------------------------------------------------------------------------------//

const UsuariosForm = ({ usuarios, submitText, submitAction, titulo, _tipo, permissoes, master }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: usuarios || {},
  });

  const meu_menu = {}

  for (let _x = 0; _x < Object.keys(_menu_checked).length; _x++) {
    try {
      meu_menu[Object.keys(_menu_checked)[_x]] = usuarios['menu'][Object.keys(usuarios['menu'])[_x]] !== undefined ? usuarios['menu'][Object.keys(usuarios['menu'])[_x]] :
        _menu_checked[Object.keys(_menu_checked)[_x]]
    } catch (err) {
      meu_menu[Object.keys(_menu_checked)[_x]] = _menu_checked[Object.keys(_menu_checked)[_x]]
    }
  }

  const meu_sub_menu = {}

  for (let _property in _checked) {
    let __x = {}
    for (let _x = 0; _x < Object.keys(_checked[_property]).length; _x++) {
      try {
        __x[Object.keys(_checked[_property])[_x]] =
          usuarios['sub_menu'][_property][Object.keys(_checked[_property])[_x]] ?
            usuarios['sub_menu'][_property][Object.keys(_checked[_property])[_x]] :
            _checked[_property][Object.keys(_checked[_property])[_x]]
      } catch (err) {
        __x[Object.keys(_checked[_property])[_x]] = _checked[_property][Object.keys(_checked[_property])[_x]]
      }
    }

    meu_sub_menu[_property] = __x
  }

  const meu_menu_principal = {}

  const _menu_exato = []

  for (let _property in __menu[0]) {
    let __y = []
    let __z = {}
    let _c_1
    let _m_1
    for (let _x = 1; _x < Object.keys(__menu[0][_property]).length; _x++) {
      try {
        for (let _x_2 = 0; _x_2 < Object.keys(__menu[0][_property][1][0]).length; _x_2++) {
          let _c = Object.keys(__menu[0][_property][1][0])[_x_2]
          let _c_2
          try {
            _c_2 = usuarios["menu_principal"][0][_property][1][0][_c][0]
            _m_1 = usuarios["menu_principal"][0][_property][1][0][_c]
          } catch (err) {
            _c_2 = __menu[0][_property][1][0][_c][0]
            _m_1 = __menu[0][_property][1][0][_c]
            console.log(err)
          }
          __z[_c] = _m_1
        }
        _c_1 = usuarios["menu_principal"][0][_property][0]
      } catch (err) {
        console.log(err)
        _c_1 = __menu[0][_property][0]
      }
      __y.push(_c_1, [__z])
    }
    meu_menu_principal[_property] = __y
  }

  _menu_exato.push(meu_menu_principal)

  const history = useHistory();

  const menu_principal = Object.keys(__menu[0])

  const [cpfcnpj, setCpfCnpj] = useState(
    _tipo === "edita" ? usuarios["cpf_cnpj"] : ""
  );

  const [_nome, set_nome] = useState(
    _tipo === "edita" ? usuarios["nome"] : ""
  );

  const [_email, set_email] = useState(
    _tipo === "edita" ? usuarios["email"] : ""
  );

  const [_usuario, set_usuario] = useState(
    _tipo === "edita" ? usuarios["usuario"] : ""
  );

  const [celular, setCelular] = useState(
    _tipo === "edita" ? usuarios["celular"] : ""
  );

  const [menu_check, setMenu_Check] = useState(
    JSON.parse(
      JSON.stringify(
        _tipo === "edita"
          ? !usuarios["menu"]
            ? _menu_checked
            : meu_menu //usuarios["menu"]
          : _menu_checked
      )
    )
  );

  const [menu, setMenu] = useState(
    JSON.parse(
      JSON.stringify(
        _tipo === "edita"
          ? !usuarios["sub_menu"]
            ? _checked
            : meu_sub_menu //usuarios["sub_menu"]
          : _checked
      )
    )
  );

  const [oMenu, set_oMenu] = useState(
    JSON.parse(
      JSON.stringify(
        _tipo === "edita"
          ? !usuarios["menu_principal"]
            ? __menu
            : _menu_exato //usuarios["menu_principal"]
          : __menu
      )
    )
  );

  const [vai, setVai] = useState(
    _tipo === "edita" ? (usuarios["master"] ? true : false) : false
  );

  const [acoes, set_acoes] = useState(
    JSON.parse(JSON.stringify(acoes_condicao))
  );


  const [_colapse_dados_basico, set_colapse_dados_basico] = useState(true);
  const [_colapse_permissoes, set_colapse_permissoes] = useState(true);

  const handleChange_cpfcnpj = (e) => {
    let v = e.target.value.replace(/\D/g, "");

    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    } else {
      v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    }
    setCpfCnpj(v);
  };

  const phoneMask = (e) => {
    let r = e.target.value.replace(/\D/g, "");

    r = r.replace(/^0/, "");

    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (e.target.value.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }
    setCelular(r);
  };

  const handleChangeMenu_Check = (_m, _s, _index) => {
    let __menu = menu_check;
    __menu[_m] = !_s;

    setMenu_Check((prevState) => ({
      ...prevState,
    }));

    oMenu[0][_m][0] = !_s;

    for (let _x = 0; _x < _sub_menu[_index].length; ++_x) {
      var _check_sub = _sub_menu[_index][_x];
      menu[_m][_check_sub] = !_s;

      oMenu[0][_m][1][0][_check_sub][0] = !_s;

      let _titulos = Object.keys(oMenu[0][_m][1][0][_check_sub][1])

      _titulos.map(
        (_action, index) => (oMenu[0][_m][1][0][_check_sub][1][_action] = !_s)
      );
    }
  };

  const handleChangeCheck = (_m, _v, _s, _i, __i) => {
    let __menu = menu[_m];
    __menu[_v] = !_s;

    setMenu((prevState) => ({
      ...prevState,
    }));

    oMenu[0][_m][1][0][_sub_menu[_i][__i]][0] = !_s;

    var _conta_true = 0;

    for (let _x = 0; _x < _sub_menu[_i].length; _x++) {
      let _check_sub = _sub_menu[_i][_x];

      if (menu[_m][_check_sub] === true) {
        _conta_true++;
      }
    }

    if (_conta_true > 0) {
      menu_check[_m] = true;
      oMenu[0][_m][0] = true;
    } else {
      menu_check[_m] = false;
      oMenu[0][_m][0] = false;
    }

    let _titulos = Object.keys(oMenu[0][_m][1][0][_sub_menu[_i][__i]][1])

    _titulos.map(
      (_action, index) =>
        (oMenu[0][_m][1][0][_sub_menu[_i][__i]][1][_action] = !_s)
    );
  };

  const handleChange_Acoes = (
    _m,
    _v,
    _s,
    _i,
    item_menu,
    index_submenu,
    index_menu
  ) => {
    let __menu = oMenu;

    var __conta_true = 0;

    __menu[0][item_menu][1][0][_sub_menu[index_menu][index_submenu]][1][_v] =
      !__menu[0][item_menu][1][0][_sub_menu[index_menu][index_submenu]][1][_v];

    let ___acoes = Object.keys(__menu[0][item_menu][1][0][_sub_menu[index_menu][index_submenu]][1]).length

    for (let _x = 0; _x < ___acoes; ++_x) {
      if (
        __menu[0][item_menu][1][0][_sub_menu[index_menu][index_submenu]][1][
        acoes_titulo[_x]
        ] === true
      ) {
        __conta_true++;
      }
    }

    if (__conta_true > 0) {

      menu[item_menu][[_sub_menu[index_menu][index_submenu]]] = true;

      menu_check[item_menu] = true;

      __menu[0][item_menu][1][0][
        _sub_menu[index_menu][index_submenu]
      ][0] = true;

    } else {

      __menu[0][item_menu][1][0][
        _sub_menu[index_menu][index_submenu]
      ][0] = false;

      //__menu[0][item_menu][1][0][_sub_menu[index_menu][index_submenu]][1][acoes_titulo[0]] = true

      menu[item_menu][[_sub_menu[index_menu][index_submenu]]] = false;

      var _conta_true = 0;

      for (let _x = 0; _x < _sub_menu[index_menu].length; _x++) {
        if (menu[item_menu][[_sub_menu[index_menu][_x]]] === true) {
          _conta_true++;
        }
      }

      if (_conta_true > 0) {
        menu_check[item_menu] = true;
      } else {
        menu_check[item_menu] = false;
      }
    }

    if (menu[item_menu][[_sub_menu[index_menu][index_submenu]]]) {
      __menu[0][item_menu][1][0][_sub_menu[index_menu][index_submenu]][1][acoes_titulo[0]] = true
    }

    set_oMenu((prevState) => ({
      ...prevState,
    }));
  };


  const click_colapse = (e) => {
    if (e === "basico") {
      set_colapse_dados_basico(!_colapse_dados_basico);
    } else {
      set_colapse_permissoes(!_colapse_permissoes);
    }
  };

  const handleChange = (e, _set) => {
    _set(e.target.value);
  };


  const filtra_dados = () => {
    let dados = {
      bloqueio: _tipo === 'edita' ? usuarios['bloqueio'] : false,
      celular: celular,
      cpf_cnpj: cpfcnpj,
      email: _email,
      master: _tipo === 'edita' ? usuarios['master'] : false,
      menu: menu_check,
      menu_principal: oMenu,
      nome: _nome,
      sub_menu: menu,
      usuario: _usuario

    }

    const update = (value) => {
      let prevData = JSON.parse(sessionStorage.getItem('dados'));
      Object.keys(value).forEach(function (val, key) {
        prevData[val] = value[val];
      })
      sessionStorage.setItem('dados', JSON.stringify(prevData));
    }

    update({
      menu: menu_check,
      menu_principal: oMenu,
      sub_menu: menu
    })

    submitAction(dados)
  }

  return (
    <>

      <div className="mt-0">
        <IconButton
          style={{ outline: "none", border: "none" }}
          color="primary"
          onClick={() => history.goBack()}
        >
          <KeyboardBackspaceIcon className="text-white" />
          <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>{titulo}</label>
        </IconButton >
      </div>

      <div className="mb-4">
        <Divider style={{ backgroundColor: 'white' }} />
      </div>

      <div className="flex items-center justify-center">
        <div className="login bg-cover">
          <div className="w-full max-w-3xl">
            <div className="leading-loose">

              {/*<form className="max-w-2xl m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit(submitAction)}>*/}
              <form className="max-w-2md m-0 p-5 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit((data) => filtra_dados())}>

                <label
                  htmlFor="dados_basicos"
                  id="dados_basicos"
                  className="flex justify-center mt-4 mb-0 text-white btn bg-cyan-600 semi-bold"
                  onClick={() => click_colapse('basico')}
                >
                  Dados Básicos
                  {_colapse_dados_basico ? <ExpandLess /> : <ExpandMore />}
                </label>

                <Collapse in={_colapse_dados_basico} timeout="auto" unmountOnExit>

                  <section className="flex flex-col field xl:flex-row">
                    <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-sm">
                      <label className="block text-sm text-white">CPF/CNPJ</label>
                      <input className="text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                        type="text"
                        autoComplete="off"
                        {...register("cpf_cnpj", {
                          required: true,
                        })}
                        maxLength={18}
                        value={cpfcnpj}
                        onChange={handleChange_cpfcnpj}
                      />
                      <span className="errors">
                        {errors.cpf_cnpj && "Campo obrigatório"}
                      </span>
                    </div>

                    <div className="mt-2 xl:mt-0 xl:ml-4 xl:w-sm">
                      <label className="block text-sm text-white">Nome do Usuário</label>
                      <input className="uppercase text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                        type="text"
                        autoComplete="off"
                        {...register("nome", { required: true })}
                        value={_nome}
                        onChange={(e) => handleChange(e, set_nome)}
                      />
                      <span className="errors">
                        {errors.nome && "Campo obrigatório"}
                      </span>
                    </div>
                  </section>

                  <section className="flex flex-col field xl:flex-row">
                    <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-sm">
                      <label className="block text-sm text-white">Usuário (Apelido)</label>
                      <input className="uppercase text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                        type="text"
                        autoComplete="off"
                        {...register("usuario", { required: true })}
                        value={_usuario}
                        onChange={(e) => handleChange(e, set_usuario)}
                      />
                      <span className="errors">
                        {errors.usuario && "Campo obrigatório"}
                      </span>
                    </div>

                    <div className="mt-2 xl:mt-0 xl:ml-4 xl:w-sm">
                      <label className="block text-sm text-white">Celular</label>
                      <input className="uppercase text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                        type="text"
                        autoComplete="off"
                        {...register("celular", {
                          required: true,
                        })}
                        value={celular}
                        onChange={phoneMask}
                      />
                      <span className="errors">
                        {errors.celular && "Campo obrigatório"}
                      </span>
                    </div>
                  </section>

                  <section className="flex flex-col field xl:flex-row">
                    <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-3xl">
                      <label className="block text-sm text-white">E-Mail</label>
                      <input className="lowercase text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                        type="email"
                        autoComplete="off"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        value={_email}
                        onChange={(e) => handleChange(e, set_email)}
                      />
                      <span className="errors">
                        {errors.email &&
                          errors.email.type === "required" &&
                          "Email é obrigatório"}
                        {errors.email &&
                          errors.email.type === "pattern" &&
                          "E-Mail inválido!"}
                      </span>
                    </div>
                  </section>

                  <input type={"hidden"} {...register("sub_menu", { value: menu })} />
                  <input
                    type={"hidden"}
                    {...register("menu", { value: menu_check })}
                    value={menu_check}
                  />

                  <input
                    type={"hidden"}
                    {...register("menu_principal", { value: oMenu })}
                    value={oMenu}
                  />
                </Collapse>

                {!vai && (
                  <>
                    <label
                      htmlFor="permissoes"
                      className="flex justify-center mt-4 mb-0 text-white btn bg-cyan-600 semi-bold"
                      onClick={() => click_colapse('permissoes')}
                    >
                      Permissões
                      {_colapse_permissoes ? <ExpandLess /> : <ExpandMore />}
                    </label>

                    <Collapse in={_colapse_permissoes} timeout="auto" unmountOnExit>
                      <section className="flex justify-center flex-col field xl:flex-row">
                        <div className="mt-2 xl:mt-0 xl:ml-0 xl:w-4xl">
                          {React.Children.toArray(
                            menu_principal.map((item, i) => (
                              <div>
                                <ListItem className="block text-sm text-black">
                                  <FormControlLabel className="text-white btn bg-gray-600 semi-bold"
                                    control={
                                      <Checkbox style={{ color: green[500] }}
                                        checked={menu_check[item]}
                                        value={menu_check[item]}
                                        onChange={() => {
                                          handleChangeMenu_Check(
                                            item,
                                            menu_check[item],
                                            i
                                          );
                                        }}
                                      />
                                    }
                                    label={item.toUpperCase()}
                                  />
                                </ListItem>

                                <div style={{ marginLeft: 28 }}>
                                  <Collapse in={true} timeout="auto" unmountOnExit>
                                    {React.Children.toArray(
                                      _sub_menu[i].map((_item, __i) => (
                                        <List component="div" disablePadding>
                                          <FormControlLabel className="text-yellow-300"
                                            control={
                                              <Checkbox
                                                style={{ color: "white" }}
                                                checked={menu[item][_item]}
                                                value={menu[item][_item]}
                                                onChange={() =>
                                                  handleChangeCheck(
                                                    item,
                                                    _item,
                                                    menu[item][_item],
                                                    i,
                                                    __i
                                                  )
                                                }
                                              />
                                            }
                                            label={_item}
                                          />
                                          <div style={{ marginLeft: 30 }}>

                                            {/*{console.log(Object.keys(__menu[0][menu_principal[i]][1][0][_sub_menu[i][__i]][1]))}
                                            {console.log(acoes_titulo)}*/}

                                            {React.Children.toArray(
                                              Object.keys(__menu[0][menu_principal[i]][1][0][_sub_menu[i][__i]][1]).map((__acoes, _i) => (
                                                <FormControlLabel className="block text-sm text-gray-100"
                                                  control={
                                                    <Checkbox style={{ color: 'lime' }}
                                                      checked={
                                                        oMenu[0][item][1][0][
                                                        _sub_menu[i][__i]
                                                        ][1][__acoes]
                                                      }
                                                      value={
                                                        oMenu[0][item][1][0][
                                                        _sub_menu[i][__i]
                                                        ][1][__acoes]
                                                      }
                                                      onChange={() =>
                                                        handleChange_Acoes(
                                                          _item,
                                                          __acoes,
                                                          acoes[__acoes],
                                                          _i,
                                                          item,
                                                          __i,
                                                          i
                                                        )
                                                      }
                                                    />
                                                  }
                                                  label={__acoes}
                                                />
                                              ))
                                            )}
                                          </div>
                                        </List>
                                      ))
                                    )}
                                  </Collapse>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </section>
                    </Collapse>
                  </>
                )}

                <div className="mt-3 items-center flex justify-between">
                  {(permissoes['Alterar'] || _tipo === 'grava' || master) && (
                    <button
                      className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                      type="submit"
                    >
                      {submitText}
                    </button>
                  )}

                  <button
                    className="px-3 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"

                    type="button"
                    onClick={() => history.goBack()}
                  >
                    Voltar
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsuariosForm;
//------------------------------------------------------------------------------------------//
