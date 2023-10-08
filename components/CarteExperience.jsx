import Image from "next/legacy/image";
import { useContext } from "react";
import Context2 from "../components/ThemeContext";

// Une expérience d'une personne
function CarteLangage({ entreprise, periode, poste, illustration }) {
    const { colour } = useContext(Context2);
    return (
        <div
            className={
                "p-6 shadow-md rounded-xl hover:scale-105 ease-in duration-300 md:w-80 xl:w-[300px] 2xl:w-[400px] bg-background2 dark:bg-dark_background2 group hover:bg-gradient-to-r from-" +
                colour.principaleDark +
                " to-" +
                colour.principale +
                " max-w-2xl"
            }
        >
            <div className="grid grid-cols-2 gap-4 justify-center items-center my-auto">
                <div className="relative m-auto w-[64px] h-[64px] lg:w-[80px] lg:h-[80px] 2xl:w-[100px] 2xl:h-[100px] group-hover:opacity-10">
                    <Image src={illustration} className="" layout="fill" alt={entreprise + " logo"} />
                </div>
                <div className="flex flex-col justify-center items-center m-auto group-hover:opacity-10">
                    <h3 className=" font-semibold md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{entreprise}</h3>
                </div>
            </div>
            <div className=" hidden group-hover:block group-hover:overflow-hidden absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  w-[90%]">
                <h3 className="lg:text-lg 2xl:text-2xl text-white font-bold tracking-wider text-center w-full">{entreprise}</h3>
                <hr className=" w-[80%]] mx-auto rounded border-1 my-1 h-1 bg-gradient-to-r from-gray-300 to-gray-200 border-transparent" />
                <p className="text-xs lg:text-base 2xl:text-xl text-white text-center  w-full">{periode}</p>
                <hr className=" w-[80%]] mx-auto rounded border-1 my-1 h-1  bg-gradient-to-r from-gray-300 to-gray-200 border-transparent" />
                <p className="text-xs lg:text-base 2xl:text-xl text-white text-center  w-full">{poste}</p>
            </div>
        </div>
    );
}

export default CarteLangage;
