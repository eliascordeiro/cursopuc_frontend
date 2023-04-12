import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Divider,IconButton} from "@material-ui/core";

//------------------------------------------------------------------------------------------//
const AtualizarCadastroForm = ({ user, submitText, submitAction, titulo, pass }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: user || {},
    })

    const history = useHistory()

    return (

        <>
            <div className="mt-0">
                <IconButton
                    style={{ outline: "none", border: "none" }}
                    color="white"
                    onClick={() => history.goBack()}
                >
                    <KeyboardBackspaceIcon className="text-white" />
                    <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>{titulo}</label>
                </IconButton >

                <div className="mb-4">
                    <Divider style={{ backgroundColor: 'white' }} />
                </div>

            </div>

            <div className="flex items-center justify-center">
                <div className="font-sans login bg-cover">
                    <div className="w-full max-w-4xl">
                        <div className="leading-loose">
                            <form className="max-w-4xl m-4 p-5 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit(submitAction)}>

                                <section className="flex flex-col field xl:flex-row">
                                    
                                    <div className="xl:mt-0 xl:ml-0 xl:w-lg">
                                        <label className="block  text-sm text-white">Nome</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                            type="text"
                                            {...register('name', { required: true, value: JSON.parse(sessionStorage.getItem('dados'))['name'] })}
                                            autoComplete="off"
                                        />
                                        <span className="errors">
                                            {errors.nome_razao && 'Campo obrigatório'}
                                        </span>
                                    </div>

                                    <div className="xl:mt-0 xl:ml-4 xl:w-lg">
                                        <label className="block  text-sm text-white">Usuário (Apelido)</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                            type="text"
                                            {...register('username', { required: true, value: JSON.parse(sessionStorage.getItem('dados'))['username'] })}
                                            autoComplete="off"
                                        />
                                        <span className="errors">
                                            {errors.usuario && 'Campo obrigatório'}
                                        </span>
                                    </div>

                                </section>

                                <section className="flex mt-2 flex-col field xl:flex-row">

                                    <div className="xl:mt-0 xl:ml-0 xl:w-lg">
                                        <label className="block  text-sm text-white">E-Mail</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                            type="email"
                                            {...register('email', { required: true, pattern: /^\S+@\S+$/i, value: JSON.parse(sessionStorage.getItem('dados'))['email'] })}
                                            autoComplete="off"
                                        />
                                        <span className="errors">
                                            {errors.email &&
                                                errors.email.type === 'required' &&
                                                'Email é obrigatório'}
                                            {errors.email &&
                                                errors.email.type === 'pattern' &&
                                                'E-Mail inválido!'}
                                        </span>
                                    </div>

                                    <div className="xl:mt-0 xl:ml-4 xl:w-lg">
                                        <label className="block  text-sm text-white">Senha</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                            type="text"
                                            {...register('password', { required: true, value: pass })}
                                            autoComplete="off"
                                        />
                                        <span className="errors">
                                            {errors.password && 'Campo obrigatório'}
                                        </span>
                                    </div>

                                </section>

                                <div className="mt-6 items-center flex justify-between">
                                    <button
                                        className="px-6 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                        type="submit"
                                    >
                                        {submitText}</button>

                                    <button
                                        className="px-6 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
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
    )

    /*
    return (

        <div>

            <h2 style={{ textAlign: 'center' }} >{titulo}</h2>

            <form className="max-w-md mt-0" onSubmit={handleSubmit(submitAction)}>

                <div className="mt-3">
                    <label htmlFor="cpf_cnpj" style={{ color: 'teal' }}>CPF/CNPJ</label>
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('cpf_cnpj', { required: true, value: JSON.parse(sessionStorage.getItem('dados'))['cpf_cnpj'] })}
                        maxLength={18}
                        value={cpfcnpj}
                        onChange={handleChange_cpfcnpj}
                    />
                    <span className="errors">
                        {errors.cpf_cnpj && 'Campo obrigatório'}
                    </span>
                </div>

                <div className="mt-3">
                    <label htmlFor="nome">Nome/Razão Social</label>
                    <input
                        type="text"
                        {...register('nome_razao', { required: true, value: JSON.parse(sessionStorage.getItem('dados'))['nome_razao'] })}
                        autoComplete="off"
                    />
                    <span className="errors">
                        {errors.nome_razao && 'Campo obrigatório'}
                    </span>
                </div>

                <div className="mt-3">
                    <label htmlFor="fantasia">Nome Fantasia</label>
                    <input
                        type="text"
                        {...register('fantasia', { required: true, value: JSON.parse(sessionStorage.getItem('dados'))['fantasia'] })}
                        autoComplete="off"
                    />
                    <span className="errors">
                        {errors.fantasia && 'Campo obrigatório'}
                    </span>
                </div>

                <div className="mt-3">
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i, value: JSON.parse(sessionStorage.getItem('dados'))['email'] })}
                        autoComplete="off"
                    />
                    <span className="errors">
                        {errors.email &&
                            errors.email.type === 'required' &&
                            'Email é obrigatório'}
                        {errors.email &&
                            errors.email.type === 'pattern' &&
                            'E-Mail inválido!'}
                    </span>
                </div>

                <div className="mt-3">
                    <label htmlFor="usuario">Usuário</label>
                    <input
                        type="text"
                        {...register('usuario', { required: true, value: JSON.parse(sessionStorage.getItem('dados'))['usuario'] })}
                        autoComplete="off"
                    />
                    <span className="errors">
                        {errors.usuario && 'Campo obrigatório'}
                    </span>
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

    )
    */
}

export default AtualizarCadastroForm
//------------------------------------------------------------------------------------------//

