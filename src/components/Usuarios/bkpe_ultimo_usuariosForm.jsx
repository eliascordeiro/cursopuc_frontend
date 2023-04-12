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

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./../form.css";
import { green } from "@material-ui/core/colors";

//------------------------------------------------------------------------------------------//

//const acoes = [{ 'ver': 'Ver', 'incluir': 'Incluir', 'alterar': 'Alterar', 'excluir': 'Excluir', 'exportar': 'Exportar' }]

//const acoes = ['Ver', 'Incluir', 'Alterar', 'Excluir', 'Exportar']

const UsuariosForm = ({ usuarios, submitText, submitAction, titulo, tipo }) => {
    const {
        register,
        setFocus,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: usuarios || {},
    });

    let _date = new Date().toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const history = useHistory();

    const [cpfcnpj, setCpfCnpj] = useState(
        tipo === "edita" ? usuarios["cpf_cnpj"] : ""
    );
    const [celular, setCelular] = useState(
        tipo === "edita" ? usuarios["celular"] : ""
    );

    const [menu_check, setMenu_Check] = useState(
        JSON.parse(
            JSON.stringify(tipo === "edita" ? (!usuarios['menu'] ? _menu_checked : usuarios['menu']) : _menu_checked))
    );

    const [menu, setMenu] = useState(
        JSON.parse(
            JSON.stringify(tipo === "edita" ? (!usuarios['sub_menu'] ? _checked : usuarios['sub_menu']) : _checked)
        )
    );

    const [vai, setVai] = useState(tipo === "edita" ? (usuarios['master'] ? true : false) : false)

    const [_acoes, set_acoes] = useState(true)

    const handleChangeMenu_Check = (_m, _s, _index) => {
        let __menu = menu_check;
        __menu[_m] = !_s;

        setMenu_Check((prevState) => ({
            ...prevState,
        }))

        for (let _x = 0; _x < _sub_menu[_index].length; _x++) {
            let _check_sub = _sub_menu[_index][_x];
            menu[_m][_check_sub] = !_s;

            //setMenu((prevState) => ({
            //  ...prevState,
            //}));
        }

        console.log(menu_check)

    };

    const handleChangeCheck = (_m, _v, _s, _i) => {
        let __menu = menu[_m];
        __menu[_v] = !_s;

        setMenu((prevState) => ({
            ...prevState,
        }));

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

        //console.log(menu)

    };

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

    const handleChange_acoes = (_a, __a, _i) => {
        let __acoes = __a
        __acoes = !_a

        set_acoes((prevState) => ({
            ...prevState,
        }));

        console.log(_a)
        console.log(__a)
        console.log(_i)

    };


    return (

        <div className="flex lg justify-center">

            <form className="max-w-lg text-gray btn bg-gray-200 border-1" onSubmit={handleSubmit(submitAction)}>

                <h5 className="flex justify-center mt-2 mb-4 text-gray btn bg-gray-300 border-1">{titulo}</h5>

                <div className="justify-center mt-2 mb-0 text-gray btn bg-gray-300 border-1">

                    <section className="flex flex-col field lg:flex-row">

                        <div className="mt-2 lg:mt-0 lg:ml-0 lg:w-md">
                            <label htmlFor="cpf_cnpj">CPF/CNPJ</label>
                            <input
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

                        <div className="mt-2 lg:mt-0 lg:ml-4 lg:w-md">
                            <label htmlFor="nome">Nome do Usuário</label>
                            <input
                                type="text"
                                autoComplete="off"
                                {...register("nome", { required: true })}
                            />
                            <span className="errors">
                                {errors.nome && "Campo obrigatório"}
                            </span>
                        </div>

                    </section>

                    <section className="flex flex-col field lg:flex-row">
                        <div className="mt-2 lg:mt-0 lg:ml-0 lg:w-md">
                            <label htmlFor="usuario">Usuário (Apelido)</label>
                            <input
                                type="text"
                                autoComplete="off"
                                {...register("usuario", { required: true })}
                            />
                            <span className="errors">
                                {errors.usuario && "Campo obrigatório"}
                            </span>
                        </div>

                        <div className="mt-2 lg:mt-0 lg:ml-4 lg:w-md">
                            <label htmlFor="celular" style={{ color: "teal" }}>
                                Celular
                            </label>
                            <input
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

                    <section className="flex flex-col field lg:flex-row">
                        <div className="mt-2 lg:mt-0 lg:ml-0 lg:w-lg">
                            <label htmlFor="email">E-Mail</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                })}
                                autoComplete="off"
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

                    <input type={'hidden'} {...register("sub_menu", { value: menu })} />
                    <input type={'hidden'} {...register("menu", { value: menu_check })} />

                </div>

                {(!vai) && (
                    <>

                        <h5 className="flex justify-center mt-4 mb-0 text-gray btn bg-gray-300 border-1">Permissões</h5>

                        <div className="justify-center mt-4 text-gray btn bg-gray-300 border-1">

                            <section className="flex flex-col field lg:flex-row">
                                {React.Children.toArray(
                                    _menu.map((item, i) => (
                                        <div className="justify-center text-gray btn bg-gray-100 border-1 md:ml-4 mt-2 mb-2" >
                                            <ListItem>
                                                <FormControlLabel
                                                    style={{ color: "#000" }}
                                                    control={
                                                        <Checkbox style={{ color: green[600] }}
                                                            checked={menu_check[item]}
                                                            value={menu_check[item]}
                                                            onChange={() => { handleChangeMenu_Check(item, menu_check[item], i) }
                                                            }
                                                        />
                                                    }
                                                    label={item.toUpperCase()}
                                                />
                                            </ListItem>

                                            <div style={{ marginLeft: 15 }}>
                                                <Collapse in={true} timeout="auto" unmountOnExit>
                                                    {React.Children.toArray(
                                                        _sub_menu[i].map((_item, _i) => (
                                                            <List component="div" disablePadding>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox style={{ color: green[600] }}
                                                                            checked={menu[item][_item]}
                                                                            value={menu[item][_item]}
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
                                                                <div style={{ marginLeft: 30 }}>
                                                                    {React.Children.toArray(
                                                                        acoes.map((__acoes, _i) => (
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox style={{ color: '#777' }}
                                                                                        checked={_acoes}
                                                                                        value={__acoes}
                                                                                        onChange={() =>
                                                                                            handleChange_acoes(
                                                                                                _acoes, __acoes, _i
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
                            </section>
                        </div>
                    </>
                )}

                <div className="flex mt-4 mb-4 justify-between">
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
    );
};

export default UsuariosForm;
//------------------------------------------------------------------------------------------//
