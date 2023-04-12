"use client";
import React from "react";
import Container from "../Container/Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoriesBox from "../CategoriesBox/CategoriesBox";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {}

export const categories = [
    {
        name: "У пляжа",
        label: "beach",
        icon: TbBeach,
        description: "Отели находятся в близи с пляжем",
    },
    {
        name: "Ветряные мельницы",
        label: "windmills",
        icon: GiWindmill,
        description: "Отель в ветрянной мельнице!",
    },
    {
        name: "Дизайн",
        label: "modern",
        icon: MdOutlineVilla,
        description: "Отели в стиле дизайн",
    },
    {
        name: "Загородные дома",
        label: "сountryside",
        icon: TbMountain,
        description: "Загородные дома",
    },
    {
        name: "Бассейны",
        label: "pools",
        icon: TbPool,
        description: "Отели с бассейном",
    },
    {
        name: "Острова",
        label: "islands",
        icon: GiIsland,
        description: "Отели на отсрове!",

    },
    {
        name: "Рядом с лыжней",
        label: "skiing",
        icon: FaSkiing,
        description: "Отели рядом с лыжней!",
    },
    {
        name: "У Озера",
        label: "lake",
        icon: GiBoatFishing,
        description: "Отели у озера!",
    },
    {
        name: "Замки",
        label: "castles",
        icon: GiCastle,
        description: "Отели в замке",
    },
    {
        name: "Кемпинг",
        label: "camping",
        icon: GiForestCamp,
        description: "Отели палатки",
    },
    {
        name: "Арктика",
        label: "arctic",
        icon: BsSnow,
        description: "Отели в заснеженных районах",
    },
    {
        name: "Пещеры",
        label: "cave",
        icon: GiCaveEntrance,
        description: "Отели в пещерах",
    },
    {
        name: "Пустыня",
        label: "desert",
        icon: GiCactus,
        description: "Отели в пустынях",
    },
    {
        name: "Амбары",
        label: "barns",
        icon: GiBarn,
        description: "Отели в амбарах",
    },
    {
        name: "Luxe",
        label: "lux",
        icon: IoDiamond,
        description: "Люкс отели",
    },
];

const Categories = (props: Props) => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoriesBox
                        key={item.label}
                        selected={category === item.label}
                        name={item.name}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
