import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useRecaptcha } from "react-hook-recaptcha";
import { Link } from 'react-router-dom'

//const containerId = import.meta.env.VITE_RECAPTCHA;

//const sitekey = import.meta.env.VITE_G_RECAPTCHA_PUBLIC_KEY;

const LoginForm = ({ login, submitText, submitAction }) => {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        defaultValues: login || {},
    })

    /*
    const successCallback = useCallback((response) => {
        handleSubmit((data) => submitAction({ ...data, catchaResponse: response }))();
    }, [submitAction]);

    const { recaptchaLoaded, recaptchaWidget } = useRecaptcha({
        containerId,
        successCallback,
        sitekey,
        size: "normal"
    });

    const executeCaptcha = useCallback((e) => {
        e.preventDefault();
        if (recaptchaWidget !== null) {
            window.grecaptcha.reset(recaptchaWidget);
            window.grecaptcha.execute(recaptchaWidget);
        }
    }, [recaptchaWidget]);
    */

    return (

        <>

            {/*
            <h2 className='text-center font-light mt-2 text-white'>Sistema em manutenção.</h2>
            <h2 className='text-center font-light mt-2 text-white'>Retorna em 06-07-2022.</h2>
            */}

            <div className="mt-20 flex items-center justify-center">

                <div className="font-sans login bg-cover">

                    <div className="w-full max-w-lg">

                        <div className="leading-loose">
                                
                            {/*    
                            <div className="flex justify-center">
                                <img src="/logo.png" alt="logo consig-express" width="200" />
                            </div>
                            */}

                            <form className="max-w-md m-2 p-5 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={handleSubmit(submitAction)}>
                                <p className="text-white font-medium text-center text-md">LOGIN</p>
                                <div className="mt-2">
                                    <label className="block text-sm text-white">Usuário ou E-mail</label>
                                    <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="text" id="email" placeholder="Digite o e-mail" aria-label="email" required
                                        //disabled={!recaptchaLoaded}
                                        {...register('username', { required: true })}
                                    />
                                    <span className="errors">
                                        {errors.usuario && 'Campo obrigatório'}
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <label className="block  text-sm text-white">Senha</label>
                                    <input className="w-full px-2 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                                        type="password" id="password" placeholder="Digite a sua senha" arial-label="password" required
                                        //disabled={!recaptchaLoaded}
                                        {...register('password', { required: true })}
                                    />
                                    <span className="errors">
                                        {errors.senha && 'Campo obrigatório'}
                                    </span>
                                </div>

                                <div className="mt-6 items-center flex justify-between">
                                    <button className="px-6 py-0 text-white border-1 border-teal-400 rounded hover:border-1 hover:bg-gray-700 hover:text-yellow-300"
                                        type="submit"
                                    //disabled={!recaptchaLoaded} 
                                    >
                                        {submitText}</button>

                                    <Link to="esqueceu_senha" className="ml-6 text-sm text-500 text-white hover:text-yellow-300">Esqueceu a senha ?</Link>

                                </div>
                                <div className="mt-4 text-center">
                                    <Link to="esqueceu_senha" className="inline-block right-0 align-baseline font-light text-sm text-white hover:text-yellow-300">
                                        Criar uma conta
                                    </Link>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

            {/*
            <footer className="bg-gray-200 text-center lg:text-left">
                <div className="text-gray-700 text-center p-4" style={{ background: "rgba(0, 0, 0, 0.2)" }}>
                    © 2021
                    <a className="text-gray-800" href="https://tailwind-elements.com/"> araudata serviços ltda. | WhatsApp: 41 99612-3839 | E-Mail: araudata@gmail.com</a>
                </div>
            </footer>
            */}

        </>



    )
}

export default LoginForm




