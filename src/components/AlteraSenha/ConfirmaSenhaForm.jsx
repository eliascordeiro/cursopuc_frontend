import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import {
    Divider,IconButton,
} from "@material-ui/core";

//------------------------------------------------------------------------------------------//
const ConfirmaSenhaForm = ({ nova_senha, submitAction }) => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: nova_senha || {},
    })

    const history = useHistory()

    const routeChange = () => {
        let path = '/home';
        history.push(path);
    };

    return (
        <>
            

            <div className="mt-0">
                <IconButton
                    style={{ outline: "none", border: "none" }}
                    color="white"
                    onClick={() => history.goBack()}
                >
                    <KeyboardBackspaceIcon className="text-white" />
                    <label className="ml-2" style={{ color: 'yellow', fontSize: 20, fontFamily: 'new-roman' }}>Alteração da Senha</label>
                </IconButton >

                <div className="mb-4">
                    <Divider style={{ backgroundColor: 'white' }} />
                </div>

            </div>

            <div className="flex items-center justify-center">

                <div className="font-sans login bg-cover">

                    <div className="w-full max-w-lg">

                        <div className="leading-loose">

                            <form className="max-w-sm m-4 p-5 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit(submitAction)}>

                                <div className="mt-3">
                                    <label className="block text-sm text-white" htmlFor="nova_senha">Nova Senha - (Mínimo 6 dígitos)</label>
                                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="text"
                                        {...register('nova_senha', { required: true, minLength: 6 })}
                                        autoComplete="off"
                                    />
                                    <span className="errors">
                                        {errors.nova_senha &&
                                            errors.nova_senha.type === 'required' &&
                                            'Nova senha é Obrigatório!'}
                                        {errors.nova_senha &&
                                            errors.nova_senha.type === 'minLength' &&
                                            'Senha exige 6 dígitos!'}
                                    </span>

                                </div>

                                <div className="mt-3">
                                    <label className="block text-sm text-white" htmlFor="rep_nova_senha">Confirme a Nova Senha</label>
                                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="text"
                                        {...register('conf_senha', { required: true, minLength: 6 })}
                                        autoComplete="off"
                                    />
                                    <span className="errors">
                                        {errors.conf_senha &&
                                            errors.conf_senha.type === 'required' &&
                                            'Repetir Nova senha é Obrigatório!'}
                                        {errors.conf_senha &&
                                            errors.conf_senha.type === 'minLength' &&
                                            'Repetir Nova Senha exige 6 dígitos!'}
                                    </span>
                                </div>

                                <div className="mt-3">
                                    <label className="block text-sm text-white" htmlFor="codigo">Código enviado para o E-Mail</label>
                                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="text"
                                        {...register('codigo', { required: true, minLength: 6 })}
                                        autoComplete="off"
                                    />
                                    <span className="errors">
                                        {errors.cpf && 'Campo é obrigatório'}
                                    </span>
                                </div>

                                <div className="mt-6 items-center flex justify-between">
                                    <button
                                        className="px-6 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>

                                    <button
                                        className="px-6 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                        type="button"
                                        onClick={() => { routeChange() }}
                                    >
                                        Voltar
                                    </button>

                                </div>


                            </form>
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmaSenhaForm
//------------------------------------------------------------------------------------------//