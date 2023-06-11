import React, { useContext, useState, MouseEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import "./Email.css";

import { colorPallete } from "../../styles/colors"
import { Input } from "../../styles/styled-components"

import { ReactComponent as ImagemRecuperacaoSenha } from "../../assets/imgs/imgRecSenha.svg"
import { EnvelopeSimple } from 'phosphor-react'

import Button from '../../components/Button/Button';
import { Message, ETypes } from '../../components/Message/Message';

import { AuthContext } from '../../contexts/AuthContext';

const Email: React.FC = () => {

    const email_regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const { GerarTokenPassword, token, email } = useContext(AuthContext)

    const [emailS, setEmail] = useState<string>("");

    const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false)
    const [messageText, setMessageText] = useState<string>("")

    function showMessage(text: string) {
        setMessageText(text)
        setIsMessageVisible(true)
    }

    useEffect(() => {
        if (email != null && token != null) {
            emailjs.send("service_9hn2m24", "template_0062ef8", {
                link: "http://localhost:3000/recover-password?token=" + token,
                email: email,
            }, "R8PqZdHwdz4VXKwKo")
                .then((result) => {
                    console.log(result.text);
                    showMessage("Enviamos uma mensagem de confirmação no email especificado. Verifique sua caixa de entrada.");
                }, (error) => {
                    console.log(error.text);
                    showMessage("Ocorreu um erro quando processávamos sua solicitação. Tente novamente mais tarde!");
                });
        }
    }, [token, email])

    async function SendEmail(event: MouseEvent) {
        event.preventDefault();

        if (!email_regex.test(emailS))
            showMessage('Padrão de email incorreto!');

        try {
            if (emailS === "")
                showMessage('Insira um email!')
            else {
                if (await GerarTokenPassword(emailS) === false) {
                    showMessage('Email inválido!');
                }
            }
        }
        catch (e: any) { showMessage(e.message) }
    }

    return (
        <div className='recover-password-wrapper'>
            <div className="img-container">
                <ImagemRecuperacaoSenha className='senha-img' />
            </div>
            <div className="info-container">
                <div className="form-wrapper">
                    <h1>Recupere sua senha</h1>

                    {
                        token != null ?
                            <>
                                <Message isVisible={isMessageVisible} text={messageText} type={ETypes.Info} />
                                <Button text='Reenviar email' backgroundColor={colorPallete.bgBlack} fontColor={colorPallete.fontWhite} fontSize={25} eventHandler={SendEmail} />
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