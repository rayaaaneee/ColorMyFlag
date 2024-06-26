"use client";

import countriesArray from "@/asset/data/countries.json";
import verifyIcon from "@/asset/img/pages/dev/verify.png";
import NotFound from "@/components/not-found";
import CardLink, { type Card } from "@/components/utils/card-link";
import DEV_MODE from "@/utils/dev-mode";
import type Country from "@/utils/interfaces/country";

//export const metadata: Metadata = {
//    title: "Dev",
//}

const DevPage = () => {

    let countries = countriesArray as Country[];

    const cardsContent: Card[] = [
        {
            image: verifyIcon,
            title: "Treat all SVGs",
            imgClass: "w-1/2",
            description: "Treat all SVGs for setting selectables shapes",
            href: `/dev/verify/country/${countries.at(0)?.id}`,
        }
    ]
    
    if (!DEV_MODE) {
        return (<NotFound />);
    }

    return (
        <>
            <div className="flex flex-row gap-5 items-center justify-center">
                { cardsContent.map((el: Card, index: number) => {
                    return (<CardLink heightClass="min-h-[20rem]" element={el} key={`cardlink-${index}`} />);
                }) }
            </div>
        </>
    );
}

export default DevPage;