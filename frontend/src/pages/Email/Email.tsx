import React, { useContext, useState, MouseEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import "./Email.css";

import { colorPallete } from "../../styles/colors"
import { Input } from "../../styles/styled-components"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg";
import { ReactComponent as ImagemCadastro } from '../../assets/imgs/imgCadastro.svg';
import { EnvelopeSimple } from 'phosphor-react'

import Button from '../../components/Button/Button';
import { Message, ETypes } from '../../components/Message/Message';

import { AuthContext } from '../../contexts/AuthContext';

interface IEmail {
    type: "recover" | "create";
}

const Email: React.FC<IEmail> = (props) => {

    const email_regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const { GerarTokenResetPassword, GerarTokenSignup, signupEmail, signupToken, resetEmail, resetToken } = useContext(AuthContext)

    const [emailS, setEmail] = useState<string>("");

    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false)
    const [messageText, setMessageText] = useState<string>("")

    function showMessage(text: string) {
        setMessageText(text)
        setIsMessageVisible(true)
    }

    useEffect(() => {
        if (signupEmail != null && signupToken != null && props.type === 'create') {
            let template = "template_8uu6gsr";
            let link = "http://localhost:3000/signup/signup?token=" + signupToken;

            emailjs.send("service_9hn2m24", template, {
                link: link,
                email: signupEmail,
            }, "R8PqZdHwdz4VXKwKo")
                .then((result) => {
                    console.log(result.text);
                    showMessage("Enviamos uma mensagem de confirmação no email especificado. Verifique sua caixa de entrada.");
                }, (error) => {
                    console.log(error.text);
                    showMessage("Ocorreu um erro quando processávamos sua solicitação. Tente novamente mais tarde!");
                });
        }
        else if (resetEmail != null && resetToken != null && props.type === 'recover') {
            let template = "template_0062ef8";
            let link = "http://localhost:3000/recover-password/recover?token=" + resetToken;

            emailjs.send("service_9hn2m24", template, {
                link: link,
                email: resetEmail,
            }, "R8PqZdHwdz4VXKwKo")
                .then((result) => {
                    console.log(result.text);
                    showMessage("Enviamos uma mensagem de confirmação no email especificado. Verifique sua caixa de entrada.");
                }, (error) => {
                    console.log(error.text);
                    showMessage("Ocorreu um erro quando processávamos sua solicitação. Tente novamente mais tarde!");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetToken, signupToken, props.type])

    async function SendEmail(event: MouseEvent) {
        event.preventDefault();

        if (!email_regex.test(emailS))
            showMessage('Padrão de email incorreto!');

        try {
            if (emailS === "")
                showMessage('Insira um email!')
            else {
                if (props.type === 'recover') {
                    if (await GerarTokenResetPassword(emailS) === false) {
                        showMessage('Email inválido!');
                    }
                }
                else if (props.type === 'create') {
                    if (await GerarTokenSignup(emailS) === false) {
                        showMessage('Email inválido!');
                    }
                }
            }
        }
        catch (e: any) { showMessage(e.message) }
    }

    return (
        <div className='recover-password-wrapper'>
            <div className="img-container">
                {props.type === 'create' ?
                    <ImagemCadastro className='senha-img' /> :
                    <ImagemRecuperacaoSenha className='senha-img' />
                }
            </div>
            <div className="info-container">
                <div className="form-wrapper">
                    <h1>{props.type === 'create' ? 'Cadastre-se' : 'Recupere sua senha'}</h1>

                    {
                        resetEmail != null || signupEmail != null ?
                            <>
                                <Message isVisible={isMessageVisible} text={messageText} type={ETypes.Info} />

                                <form>
                                    <Input
                                        backgroundColor='#FFF'
                                        placeholderColor={colorPallete.fontGray}
                                        fontColor={colorPallete.fontBlack}
                                    >
                                        <div className='icon-container'>
                                            <EnvelopeSimple />
                                        </div>
                                        <input type='email' placeholder='Digite seu email' onChange={({ target }) => setEmail(target.value)} />
                                    </Input>
                                    <Button text='Reenviar email' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={25} eventHandler={SendEmail} />
                                </form>

                            </>
                            :
                            <>
                                <Message isVisible={isMessageVisible} text={messageText} type={ETypes.Warning} />

                                <form>
                                    <Input
                                        backgroundColor='#FFF'
                                        placeholderColor={colorPallete.fontGray}
                                        fontColor={colorPallete.fontBlack}
                                    >
                                        <div className='icon-container'>
                                            <EnvelopeSimple />
                                        </div>
                                        <input type='email' placeholder='Digite seu email' onChange={({ target }) => setEmail(target.value)} />
                                    </Input>

                                    <Button text='Enviar email' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={25} eventHandler={SendEmail} />
                                </form>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Email;