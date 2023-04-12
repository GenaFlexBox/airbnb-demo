import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value: string) => void;
    selected?: boolean;
    icon: IconType;
    label: string;
    name: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onClick,
    selected,
    icon: Icon,
    label,
    name,
}) => {
    return (
        <div
            className={`rounded-xl border-2 flex flex-col gap-3 p-4 hover:border-black transition cursor-pointer ${
                selected ? "border-black" : "border-neutral-200"
            }`}
            onClick={() => onClick(label)}
        >
            <Icon size={30} />
            <div className="font-semibold">
                {name}
            </div>
        </div>
    );
};

export default CategoryInput;
