'use client'
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Точных совпадений нет",
    subtitle = "Попробуйте изменить или удалить некоторые из ваших фильтров",
    showReset,
}) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 items-center justify-center">
            <Heading  title={title} subtitle={subtitle} center/>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="Сбросить фильтры" onClick={() => router.push('/')} />
                )}
            </div>
        </div>
    );
};

export default EmptyState;
