"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/components/Categories/Categories";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import Container from "@/app/components/Container/Container";
import ListingHead from "@/app/components/Listing/ListingHead";
import ListingInfo from "@/app/components/Listing/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "@/app/components/Listing/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = [],
}) => {
    const loginModule = useLoginModal();
    const router = useRouter();
    
    console.log(reservations);
    
    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.stardDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModule.onOpen();
        }

        setIsLoading(true);

        axios
            .post("/api/reservations", {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success("Успешно забранировано!");
                setDateRange(initialDateRange);
                router.refresh();
            })
            .catch((error) => {
                toast.error("Произошла ошибка");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dateRange, totalPrice, listing.id, router, currentUser, loginModule]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md: gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            location={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
