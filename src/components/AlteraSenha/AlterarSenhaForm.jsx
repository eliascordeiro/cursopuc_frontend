import React, { } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
    Divider,
    IconButton,
} from "@material-ui/core";

//------------------------------------------------------------------------------------------//
const AlterarSenhaForm = ({ user, submitText, submitAction, titulo, email }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: user || {},
    })

    const history = useHistory()

    return (

        <div>

            <div className="mt-0">
                <IconButton
                    style={{ outline: "none", border: "none" }}
                    color="primary"
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

                                    <div className="xl:mt-0 xl:ml-0 xl:w-sm">
                                        <label className="block text-sm text-white">E-Mail</label>
                                        <input className="mt-1 w-full px-2 py-0 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                            disabled={true}
                                            {...register('email', { required: true, pattern: /^\S+@\S+$/i, value: email })}
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
        </div>

    )
}

export default AlterarSenhaForm
//------------------------------------------------------------------------------------------//

