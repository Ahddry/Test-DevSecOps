import CarteProjet from "./CarteProjet";
import { supabase } from "../utils/supabase";
import { useState, useEffect, useContext } from "react";
import Context from "./UserContext";
import Context2 from "../components/ThemeContext";
import Link from "next/link";

// Projets réalisé par une personne
function Projets({ userid, target }) {
    const { user } = useContext(Context);
    const { colour } = useContext(Context2);
    const [listprojets, setlistporjets] = useState([]);
    useEffect(() => {
        async function getprojets() {
            let { data: projets, error } = await supabase.from("projets").select("name,language,listeimage,id").eq("auteur", userid);
            if (error) throw error;
            setlistporjets(projets);
        }
        getprojets();
    }, [userid]);
    let projetsTel = [];
    let projetsMd = [];
    let projetsLg = [];
    let projetsXl = [];

    const AddProjet = () => {
        return (
            <div
                className={
                    "relative m-auto flex items-center justify-center h-auto  shadow-xl rounded-xl p-4 bg-background2 dark:bg-dark_background2 group hover:bg-gradient-to-r from-" +
                    colour.principaleDark +
                    " to-" +
                    colour.principale +
                    " max-w-2xl  h-24 p-4 "
                }
            >
                <div className="relative w-[300px] sm:w-[400px]  max-w-2xl">
                    <div className="block group-hover:hidden rounded-full bg-gray-200 dark:bg-[#1d1f23] w-fit px-5 p-3 justify-center mx-auto">+</div>
                </div>
                <div className="hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                    <h3 className="text-lg text-white font-bold tracking-wider text-center">Ajouter un projet</h3>
                    <Link href={"/nouveau-projet"}>
                        <p
                            className={
                                "text-center text-3xl p-1 rounded-full bg-white dark:bg-dark_background2 text-on_background2 dark:text-dark_on_background2 hover:dark:bg-gradient-to-r from-dark_principale to-dark_principale_V1 hover:text-" +
                                colour.secondaire +
                                " dark:hover:text-" +
                                colour.secondaireDark +
                                " hover:scale-105 ease-in duration-300 font-bold text-lg cursor-pointer"
                            }
                        >
                            +
                        </p>
                    </Link>
                </div>
            </div>
        );
    };

    //#region Tri des projets par taille d'écran
    for (let i = 0; i < listprojets.length; i += 2) {
        let array = [];
        array.push(listprojets[i]);
        if (listprojets[i + 1] !== undefined) {
            array.push(listprojets[i + 1]);
        }
        projetsTel.push(array);
    }

    for (let i = 0; i < listprojets.length; i += 4) {
        let array = [];
        array.push(listprojets[i]);
        if (listprojets[i + 1] !== undefined) {
            array.push(listprojets[i + 1]);
        }
        if (listprojets[i + 2] !== undefined) {
            array.push(listprojets[i + 2]);
        }
        if (listprojets[i + 3] !== undefined) {
            array.push(listprojets[i + 3]);
        }
        projetsMd.push(array);
    }

    for (let i = 0; i < listprojets.length; i += 6) {
        let array = [];
        array.push(listprojets[i]);
        if (listprojets[i + 1] !== undefined) {
            array.push(listprojets[i + 1]);
        }
        if (listprojets[i + 2] !== undefined) {
            array.push(listprojets[i + 2]);
        }
        if (listprojets[i + 3] !== undefined) {
            array.push(listprojets[i + 3]);
        }
        if (listprojets[i + 4] !== undefined) {
            array.push(listprojets[i + 4]);
        }
        if (listprojets[i + 5] !== undefined) {
            array.push(listprojets[i + 5]);
        }
        projetsLg.push(array);
    }
    for (let i = 0; i < listprojets.length; i += 8) {
        let array = [];
        array.push(listprojets[i]);
        if (listprojets[i + 1] !== undefined) {
            array.push(listprojets[i + 1]);
        }
        if (listprojets[i + 2] !== undefined) {
            array.push(listprojets[i + 2]);
        }
        if (listprojets[i + 3] !== undefined) {
            array.push(listprojets[i + 3]);
        }
        if (listprojets[i + 4] !== undefined) {
            array.push(listprojets[i + 4]);
        }
        if (listprojets[i + 5] !== undefined) {
            array.push(listprojets[i + 5]);
        }
        if (listprojets[i + 6] !== undefined) {
            array.push(listprojets[i + 6]);
        }
        if (listprojets[i + 7] !== undefined) {
            array.push(listprojets[i + 7]);
        }
        projetsXl.push(array);
    }
    //#endregion
    return (
        <section id="projets">
            <div className="md:hidden" key={"Projets taille S"}>
                {projetsTel.map((projets) => (
                    <div className="flex items-center w-full h-screen snap-start flex-col bg-gray-200 dark:bg-[#1d1f23]" key={`${Math.floor(Math.random() * 255)}`}>
                        <div className="w-full h-20" id="vide"></div>
                        <h2 className="my-8 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Les projets que j'ai réalisé</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-5">
                            {projets.map((projet) => (
                                <CarteProjet nom={projet.name} outils={projet.language} lien={projet.listeimage[0]} id={projet.id} key={projet.id + "s"} />
                            ))}
                        </div>
                        {user ? (
                            (user.id === "5db7ae9a-72c9-4b30-9d2c-f882ea540279" && target === "Adrien") || (user.id === "cbdd2007-e5de-49e4-9c11-ef15c0360c37" && target === "Aurelien") ? (
                                <AddProjet />
                            ) : (
                                <></>
                            )
                        ) : (
                            <> </>
                        )}
                    </div>
                ))}
            </div>
            <div className="hidden md:block lg:hidden" key={"Projets taille md"}>
                {projetsMd.map((projets) => (
                    <div className="flex items-center w-full h-screen snap-start flex-col bg-gray-200 dark:bg-[#1d1f23]" key={`${Math.floor(Math.random() * 255)}`}>
                        <div className="w-full h-20" id="vide"></div>
                        <h2 className="my-8 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Les projets que j'ai réalisé</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-5">
                            {projets.map((projet) => (
                                <CarteProjet nom={projet.name} outils={projet.language} lien={projet.listeimage[0]} id={projet.id} key={projet.id + "m"} />
                            ))}
                        </div>
                        {user ? (
                            (user.id === "5db7ae9a-72c9-4b30-9d2c-f882ea540279" && target === "Adrien") || (user.id === "cbdd2007-e5de-49e4-9c11-ef15c0360c37" && target === "Aurelien") ? (
                                <AddProjet />
                            ) : (
                                <></>
                            )
                        ) : (
                            <> </>
                        )}
                        <div className=" mt-[-500px] mx-5 p-3 rounded-3xl bg-gray-300 md:my-3 dark:bg-dark_background2 md:max-w-5xl 2xl:max-w-7xl">
                            <p className="text-justify text-sm lg:text-xl 2xl:text-3xl"> "Voici quelques projets que j'ai pu réaliser au cours de mes études."</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden lg:block xl:hidden" key={"Projets taille LG"}>
                {projetsLg.map((projets) => (
                    <div className="flex items-center w-full h-screen snap-start flex-col bg-gray-200 dark:bg-[#1d1f23]" key={`${Math.floor(Math.random() * 255)}`}>
                        <div className="w-full h-20" id="vide"></div>
                        <h2 className="my-8 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Les projets que j'ai réalisé</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-5">
                            {projets.map((projet) => (
                                <CarteProjet nom={projet.name} outils={projet.language} lien={projet.listeimage[0]} id={projet.id} key={projet.id + "l"} />
                            ))}
                        </div>
                        {user ? (
                            (user.id === "5db7ae9a-72c9-4b30-9d2c-f882ea540279" && target === "Adrien") || (user.id === "cbdd2007-e5de-49e4-9c11-ef15c0360c37" && target === "Aurelien") ? (
                                <AddProjet />
                            ) : (
                                <></>
                            )
                        ) : (
                            <> </>
                        )}
                        <div className="mb-5 mx-5 p-3 rounded-3xl bg-gray-300 md:my-3 dark:bg-dark_background2 md:max-w-5xl 2xl:max-w-7xl">
                            <p className="text-justify text-sm lg:text-xl 2xl:text-3xl"> "Voici quelques projets que j'ai pu réaliser au cours de mes études."</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="hidden xl:block" key={"Projets taille XL"}>
                {projetsXl.map((projets) => (
                    <div className="flex items-center w-full h-screen snap-start flex-col bg-gray-200 dark:bg-[#1d1f23] space-y-12" key={`${Math.floor(Math.random() * 255)}`}>
                        <div className="w-full h-20" id="vide"></div>
                        <h2 className="my-8 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Les projets que j'ai réalisé</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-5">
                            {projets.map((projet) => (
                                <CarteProjet nom={projet.name} outils={projet.language} lien={projet.listeimage[0]} id={projet.id} key={projet.id + "xl"} />
                            ))}
                        </div>
                        {user ? (
                            (user.id === "5db7ae9a-72c9-4b30-9d2c-f882ea540279" && target === "Adrien") || (user.id === "cbdd2007-e5de-49e4-9c11-ef15c0360c37" && target === "Aurelien") ? (
                                <AddProjet />
                            ) : (
                                <></>
                            )
                        ) : (
                            <> </>
                        )}
                        <div className="mb-5 mx-5 p-3 rounded-3xl bg-gray-300 md:my-3 dark:bg-dark_background2 md:max-w-5xl 2xl:max-w-7x">
                            <p className="text-justify text-sm lg:text-xl 2xl:text-3xl"> "Voici quelques projets que j'ai pu réaliser au cours de mes études."</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projets;
