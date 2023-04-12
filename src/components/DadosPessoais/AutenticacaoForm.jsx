import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Divider,IconButton} from "@material-ui/core";
//------------------------------------------------------------------------------------------//
const AutenticaForm = ({ dados, submitText, submitAction }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: dados || {},
    })

    const history = useHistory()

    return (

        <>
            <div className="mt-0">
                <IconButton
                    style={{ outline: "none", border: "none" }}
                    color="primary"
                    onClick={() => history.goBack()}
                >
                    <KeyboardBackspaceIcon className="text-white" />
                    <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>Autenticação</label>
                </IconButton >
            </div>

            <div className="mb-4">
                <Divider style={{ backgroundColor: 'white' }} />
            </div>

            <div className="flex items-center justify-center">
                <div className="font-sans login bg-cover">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm m-4 p-5 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit(submitAction)}>
                                    
                                {/*    
                                <div className="mt-2">
                                    <label className="block  text-sm text-white">Usuário</label>
                                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="text" id="username" placeholder="Usuário" arial-label="username" required
                                        {...register('username', { required: true })}

                                    />
                                    <span className="errors">
                                        {errors.usrname && 'Campo obrigatório'}
                                    </span>
                                </div>
                                */}

                                <div className="mt-2">
                                    <label className="block  text-sm text-white">Senha</label>
                                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password" id="password" placeholder="Senha" arial-label="password" required
                                        {...register('password', { required: true })}

                                    />
                                    <span className="errors">
                                        {errors.password && 'Campo obrigatório'}
                                    </span>
                                </div>

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
}

export default AutenticaForm
//------------------------------------------------------------------------------------------//