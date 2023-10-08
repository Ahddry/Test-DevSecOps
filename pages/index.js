import Image from "next/legacy/image";
import { ImArrowDown2 } from "react-icons/im";
import { useState, useContext, useEffect } from "react";
import Adrien from "../components/Adrien";
import Aurelien from "../components/Aurelien";
import Context2 from "../components/ThemeContext";

// Page d'accueil
function HomePage() {
    let [checked, setChecked] = useState(true);
    const { colour } = useContext(Context2);

    return (
        <div className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
            <section className="flex items-center justify-center w-full h-screen snap-start flex-col" id="portfolio">
                <div className="w-full h-20" id="vide"></div>
                <div className="my-auto px-5 space">
                    <h2 className="text-3xl font-extralight lg:text-5xl 2xl:text-7xl">Bonjour !</h2>
                    <h1 className={"pt-8 text-5xl lg:text-7xl 2xl:text-8xl text-" + colour.principale + " dark:text-" + colour.principaleDark + " font-thin"}>Nous sommes des développeurs web.</h1>
                </div>
                <div className="my-auto">
                    <ul className="grid gap-3 md:gap-6 w-full md:grid-cols-2 xl:gap-10 2xl:gap-16">
                        <li>
                            <input type="radio" id="adrien" name="profil" className="hidden peer" required defaultChecked={true} onClick={() => setChecked(true)} />
                            <label
                                htmlFor="adrien"
                                className={
                                    "inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer select-none dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-" +
                                    colour.principaleDark +
                                    " peer-checked:border-" +
                                    colour.principale +
                                    " peer-checked:text-" +
                                    colour.principale +
                                    " peer-checked:border-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-dark_background2 dark:hover:bg-dark_principale gap-10 overflow-hidden max-h-28 lg:max-h-52 2xl:max-h-64"
                                }
                            >
                                <div className="block">
                                    <div className="w-full text-lg font-semibold lg:text-2xl 2xl:text-4xl">Adrien</div>
                                    <div className="w-full lg:text-xl 2xl:text-3xl">Blair</div>
                                </div>
                                <div className="relative  overflow-hidden w-32 h-32 -right-12 lg:w-56 lg:h-56 lg:-right-24 2xl:w-80 2xl:h-80 2xl:-right-28">
                                    <Image src="/adrien.jpg" alt="Photo de profil d'Adrien" className=" -right-9 rounded-full shadow-lg  " layout="fill"></Image>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="aurelien" name="profil" className="hidden peer" value={false} onClick={() => setChecked(false)} />
                            <label
                                htmlFor="aurelien"
                                className={
                                    "inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer select-none dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-" +
                                    colour.principaleDark +
                                    " peer-checked:border-" +
                                    colour.principale +
                                    " peer-checked:text-" +
                                    colour.principale +
                                    " peer-checked:border-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-dark_background2 dark:hover:bg-dark_principale gap-10 overflow-hidden max-h-28 lg:max-h-52 2xl:max-h-64"
                                }
                            >
                                <div className="block">
                                    <div className="w-full text-lg font-semibold lg:text-2xl 2xl:text-4xl">Aurélien</div>
                                    <div className="w-full lg:text-xl 2xl:text-3xl">Bon</div>
                                </div>
                                <div className="relative  overflow-hidden w-32 h-32 -right-12 lg:w-56 lg:h-56 lg:-right-24 2xl:w-80 2xl:h-80 2xl:-right-28">
                                    <Image src="/aurelien.png" alt="Photo de profil d'Aurelien" className=" -right-9 rounded-full shadow-lg  " layout="fill"></Image>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className={"my-auto rounded-full bg-background2 dark:bg-dark_background2 p-3 animate-bounce ring-2 ring-" + colour.principale + " dark:ring" + colour.principaleDark}>
                    <ImArrowDown2 className={"text-3xl text-" + colour.principale + " dark:text-" + colour.principaleDark} />
                </div>
            </section>
            <div>{checked ? <Adrien /> : <Aurelien />}</div>
        </div>
    );
}
export default HomePage;
