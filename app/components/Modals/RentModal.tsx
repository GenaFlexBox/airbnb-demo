"use client";
import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppSelector } from "@/app/hooks/redux/redux.hooks";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../Categories/Categories";
import Modal from "./Modal";
import Heading from "../Heading/Heading";
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import Map from "../Map/Map";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import { useRouter } from "next/navigation";


interface RentModalProps {}

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const { isOpen } = useAppSelector((state) => state.rentModalSlice);
    const rentModal = useRentModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: "",
            decription: "",
        },
    });

    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const Map = useMemo(
        () =>
            dynamic(() => import("../Map/Map"), {
                ssr: false,
            }),
        [location]
    );

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE) return onNext();

        setIsLoading(true);

        axios.post('api/listings', data)
        .then(() => {
            toast.success('Успешно созданно');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch((error) => {
            toast.error('При создании произошла ошибка!')
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    const actionsLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Создать"; 
        }

        return "Далее";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return "Назад";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Расскажите нам о жилье"
                subtitle="Выберите категорию"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue("category", category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            name={item.name}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Где находиться ваше жильё"
                    subtitle="Помогите клиенту найти вас"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Расскажите немного о своем жилье"
                    subtitle="Какие преимущества у тебя есть?"
                />
                <Counter
                    title="Гость"
                    subtitle="Cколько гостей вы принимаете?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <Counter
                    title="Комнат"
                    subtitle="Cколько комнат у вас имеется?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <Counter
                    title="Спален"
                    subtitle="Cколько спален у вас имеется?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Добавлние фото вашего жилья"
                    subtitle="покажите гостям, как выглядит ваше жильё"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Как бы вы описали свое место"
                    subtitle="Коротко и ясно"
                />
                <Input
                    id="title"
                    label="Название"
                    disabled={isLoading}
                    register={register}
                    errros={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Описание"
                    disabled={isLoading}
                    register={register}
                    errros={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Установите свою цену"
                    subtitle="Сколько вы берете за ночь?"
                />
                <Input
                    id="price"
                    label="Цена"
                    formarPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errros={errors}
                    required
                />
            </div>
        );
    }

    return (
        <Modal
            title="Сдать жильё на Airbnb"
            isOpen={isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionsLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    );
};

export default RentModal;
