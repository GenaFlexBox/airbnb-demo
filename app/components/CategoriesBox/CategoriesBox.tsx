'use client'
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string';

interface CategoriesBoxProps {
    name: string
    label: string;
    icon: IconType;
    description?: string;
    selected?: boolean;
}

const CategoriesBox: React.FC<CategoriesBoxProps> = ({
    name,
    label,
    description,
    icon: Icon,
    selected,
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})

        router.push(url)
    }, [label, params, router])

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-300 transition cursor-pointer ${
                selected ? "border-b-neutral-800" : "border-transparent"
            } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
        >
            <Icon  size={26}/>
            <div className="font-medium text-sm">
                {name}
            </div>
        </div>
    );
};

export default CategoriesBox;
