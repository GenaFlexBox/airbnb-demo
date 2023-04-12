"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { useAppSelector } from "@/app/hooks/redux/redux.hooks";
import Heading from "../Heading/Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast"
import Button from "../Button/Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

type RegisterModalProps = {};

const RegisterModal: React.FC<RegisterModalProps> = () => {
    const { isOpen } = useAppSelector((state) => state.registerModalReducer);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("api/register", data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error("Ошибка при регистрации")
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Добро пожаловать на Airbnb" subtitle="Создание аккаунта"/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errros={errors} required/>
            <Input id="name" label="Name" disabled={isLoading} register={register} errros={errors} required/>
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
                    <div>Уже есть аккаунт?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>Войти</div>
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
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
