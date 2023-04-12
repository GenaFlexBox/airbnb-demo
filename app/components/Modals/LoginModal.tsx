"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from 'next-auth/react'
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux/redux.hooks";
import Heading from "../Heading/Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast"
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

type LoginModalProps = {};

const LoginModal: React.FC<LoginModalProps> = () => {
    const { isOpen } = useAppSelector((state) => state.loginModalReducer);
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                toast.success('Вы успешно авторизованы');
                router.refresh();
                loginModal.onClose()
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Добро пожаловать в Airbnb" subtitle="Вход в аккаунт"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errros={errors} required/>
            <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errros={errors} required/>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Войти с помощью Google" icon={FcGoogle} onClick={() => signIn("google")}/>
            <Button outline label="Войти с помощью GitHub" icon={AiFillGithub} onClick={() => signIn("github")}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Нет аккаунта?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Создать аккаунт</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={isOpen}
            title="Войдите или зарегистрируйтесь"
            actionLabel="Продолжить"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
