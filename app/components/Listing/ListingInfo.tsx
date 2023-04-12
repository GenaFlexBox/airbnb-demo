"use cleint";
import React from "react";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "../Avatar/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map/Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    category:
        | {
              icon: IconType;
              label: string;
              description: string;
              name: string
          }
        | undefined;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    location: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    location,
}) => {
    const { getByValue } = useCountries();

    const cordinators = getByValue(location)?.latlng;

    return (
        <div className="flex flex-col gap-8 col-span-4">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Создано {user?.name}</div>
                    <Avatar src={user.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} гостей</div>
                    <div>{roomCount} команаты</div>
                    <div>{bathroomCount} спален</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                    name={category.name}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={cordinators} />
        </div>
    );
};

export default ListingInfo;
