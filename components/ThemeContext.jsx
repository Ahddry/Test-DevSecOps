import { createContext, useState, useEffect } from "react";

// Contexte des themes de couleurs

const Context2 = createContext();
export default Context2;
export const ColourContext = ({ children }) => {
    const [colour, setColour] = useState({
        principale: "principale",
        secondaire: "principale_V1",
        tertiaire: "principale_V2",
        principaleDark: "dark_secondaire",
        secondaireDark: "dark_secondaire_V1",
        tertiaireDark: "dark_secondaire_V2",
    });

    return (
        <Context2.Provider
            value={{
                colour: colour,

                updateColour: (couleur) => {
                    switch (couleur) {
                        case "bleu":
                            setColour({
                                principale: "blue-700",
                                secondaire: "blue-800",
                                tertiaire: "blue-600",
                                principaleDark: "blue-400",
                                secondaireDark: "blue-300",
                                tertiaireDark: "blue-500",
                            });
                            break;
                        case "vert":
                            setColour({
                                principale: "lime-700",
                                secondaire: "lime-800",
                                tertiaire: "lime-600",
                                principaleDark: "lime-400",
                                secondaireDark: "lime-300",
                                tertiaireDark: "lime-500",
                            });
                            break;
                        case "rouge":
                            setColour({
                                principale: "red-700",
                                secondaire: "red-800",
                                tertiaire: "red-600",
                                principaleDark: "red-400",
                                secondaireDark: "red-300",
                                tertiaireDark: "red-500",
                            });
                            break;
                        case "rose":
                            setColour({
                                principale: "pink-700",
                                secondaire: "pink-800",
                                tertiaire: "pink-600",
                                principaleDark: "pink-400",
                                secondaireDark: "pink-300",
                                tertiaireDark: "pink-500",
                            });
                            break;
                        case "gris":
                            setColour({
                                principale: "slate-700",
                                secondaire: "slate-800",
                                tertiaire: "slate-600",
                                principaleDark: "slate-400",
                                secondaireDark: "slate-300",
                                tertiaireDark: "slate-500",
                            });
                            break;
                        default:
                            setColour({
                                principale: "principale",
                                secondaire: "principale_V1",
                                tertiaire: "principale_V2",
                                principaleDark: "dark_secondaire",
                                secondaireDark: "dark_secondaire_V1",
                                tertiaireDark: "dark_secondaire_V2",
                            });
                            break;
                    }
                },
                reset: () => {
                    setColour({
                        principale: "principale",
                        secondaire: "principale_V1",
                        tertiaire: "principale_V2",
                        principaleDark: "dark_secondaire",
                        secondaireDark: "dark_secondaire_V1",
                        tertiaireDark: "dark_secondaire_V2",
                    });
                },
            }}
        >
            {children}

            <div className=" hidden border-principale dark:border-principale bg-principale text-principale hover:text-principale focus:ring-principale hover:bg-principale" />
            <div className=" hidden border-principale_V1 dark:border-principale_V1 bg-principale_V1 text-principale_V1 hover:text-principale_V1 focus:ring-principale_V1" />
            <div className=" hidden border-principale_V2 dark:border-principale_V2 bg-principale_V2 text-principale_V2 hover:text-principale_V2 focus:ring-principale_V2" />
            <div className=" hidden border-dark_secondaire dark:border-dark_secondaire dark:bg-dark_secondaire dark:text-dark_secondaire hover:dark:text-dark_secondaire dark:focus:ring-dark_secondaire hover:dark:bg-dark_secondaire" />
            <div className=" hidden border-dark_secondaire_V1 dark:border-dark_secondaire_V1 dark:bg-dark_secondaire_V1 dark:text-dark_secondaire_V1 hover:dark:text-dark_secondaire_V1 dark:focus:ring-dark_secondaire_V1" />
            <div className=" hidden border-dark_secondaire_V2 dark:border-dark_secondaire_V2 dark:bg-dark_secondaire_V2 dark:text-dark_secondaire_V2 hover:dark:text-dark_secondaire_V2 dark:focus:ring-dark_secondaire_V2" />
            <div className=" hidden border-blue-300 dark:border-blue-300 dark:bg-blue-300 dark:text-blue-300 hover:dark:text-blue-300 dark:focus:ring-blue-300" />
            <div className=" hidden border-blue-400 dark:border-blue-400 dark:bg-blue-400 dark:text-blue-400 hover:dark:text-blue-400 dark:focus:ring-blue-400 hover:dark:bg-blue-400" />
            <div className=" hidden border-blue-500 dark:border-blue-500 dark:bg-blue-500 dark:text-blue-500 hover:dark:text-blue-500 dark:focus:ring-blue-500" />
            <div className=" hidden border-blue-600 dark:border-blue-600 bg-blue-600 text-blue-600 hover:text-blue-600 focus:ring-blue-600" />
            <div className=" hidden border-blue-700 dark:border-blue-700 bg-blue-700 text-blue-700 hover:text-blue-700 focus:ring-blue-700 hover:bg-blue-700" />
            <div className=" hidden border-blue-800 dark:border-blue-800 bg-blue-800 text-blue-800 hover:text-blue-800 focus:ring-blue-800" />
            <div className=" hidden border-red-300 dark:border-red-300 dark:bg-red-300  dark:text-red-300  hover:dark:text-red-300  dark:focus:ring-red-300" />
            <div className=" hidden border-red-400 dark:border-red-400 dark:bg-red-400  dark:text-red-400  hover:dark:text-red-400  dark:focus:ring-red-400 hover:dark:bg-red-400" />
            <div className=" hidden border-red-500 dark:border-red-500 dark:bg-red-500  dark:text-red-500  hover:dark:text-red-500  dark:focus:ring-red-500" />
            <div className=" hidden border-red-600 dark:border-red-600 bg-red-600  text-red-600  hover:text-red-600  focus:ring-red-600" />
            <div className=" hidden border-red-700 dark:border-red-700 bg-red-700  text-red-700  hover:text-red-700  focus:ring-red-700 hover:bg-red-700" />
            <div className=" hidden border-red-800 dark:border-red-800 bg-red-800  text-red-800  hover:text-red-800  focus:ring-red-800" />
            <div className=" hidden border-lime-300 dark:border-lime-300 dark:bg-lime-300 dark:text-lime-300 hover:dark:text-lime-300 dark:focus:ring-lime-300" />
            <div className=" hidden border-lime-400 dark:border-lime-400 dark:bg-lime-400 dark:text-lime-400 hover:dark:text-lime-400 dark:focus:ring-lime-400 hover:dark:bg-lime-400" />
            <div className=" hidden border-lime-500 dark:border-lime-500 dark:bg-lime-500 dark:text-lime-500 hover:dark:text-lime-500 dark:focus:ring-lime-500" />
            <div className=" hidden border-lime-600 dark:border-lime-600 bg-lime-600 text-lime-600 hover:text-lime-600 focus:ring-lime-600" />
            <div className=" hidden border-lime-700 dark:border-lime-700 bg-lime-700 text-lime-700 hover:text-lime-700 focus:ring-lime-700 hover:bg-lime-700" />
            <div className=" hidden border-lime-800 dark:border-lime-800 bg-lime-800 text-lime-800 hover:text-lime-800 focus:ring-lime-800" />
            <div className=" hidden border-pink-300 dark:border-pink-300 dark:bg-pink-300 dark:text-pink-300 hover:dark:text-pink-300 dark:focus:ring-pink-300 " />
            <div className=" hidden border-pink-400 dark:border-pink-400 dark:bg-pink-400 dark:text-pink-400 hover:dark:text-pink-400 dark:focus:ring-pink-400  hover:dark:bg-pink-400" />
            <div className=" hidden border-pink-500 dark:border-pink-500 dark:bg-pink-500 dark:text-pink-500 hover:dark:text-pink-500 dark:focus:ring-pink-500 " />
            <div className=" hidden border-pink-600 dark:border-pink-600 bg-pink-600 text-pink-600 hover:text-pink-600 focus:ring-pink-600" />
            <div className=" hidden border-pink-700 dark:border-pink-700 bg-pink-700 text-pink-700 hover:text-pink-700 focus:ring-pink-700 hover:bg-pink-700" />
            <div className=" hidden border-pink-800 dark:border-pink-800 bg-pink-800 text-pink-800 hover:text-pink-800 focus:ring-pink-800" />
            <div className=" hidden border-slate-300 dark:border-slate-300 dark:bg-slate-300 dark:text-slate-300 hover:dark:text-slate-300 dark:focus:ring-slate-300" />
            <div className=" hidden border-slate-400 dark:border-slate-400 dark:bg-slate-400 dark:text-slate-400 hover:dark:text-slate-400 dark:focus:ring-slate-400 hover:dark:bg-slate-400" />
            <div className=" hidden border-slate-500 dark:border-slate-500 dark:bg-slate-500 dark:text-slate-500 hover:dark:text-slate-500 dark:focus:ring-slate-500" />
            <div className=" hidden border-slate-600 dark:border-slate-600 bg-slate-600 text-slate-600 hover:text-slate-600 focus:ring-slate-600" />
            <div className=" hidden border-slate-700 dark:border-slate-700 bg-slate-700 text-slate-700 hover:text-slate-700 focus:ring-slate-700 hover:bg-slate-700" />
            <div className=" hidden border-slate-800 dark:border-slate-800 bg-slate-800 text-slate-800 hover:text-slate-800 focus:ring-slate-800" />
            <div className=" hidden dark:peer-checked:text-dark_secondaire peer-checked:border-principale peer-checked:text-principale ring-principale dark:ring-dark_secondaire" />
            <div className=" hidden dark:peer-checked:text-blue-400 peer-checked:border-blue-700 peer-checked:text-blue-700 ring-blue-700 dark:ring-blue-400" />
            <div className=" hidden dark:peer-checked:text-red-400 peer-checked:border-red-700 peer-checked:text-red-700 ring-red-700 dark:ring-red-400" />
            <div className=" hidden dark:peer-checked:text-lime-400 peer-checked:border-lime-700 peer-checked:text-lime-700 ring-lime-700 dark:ring-lile-400" />
            <div className=" hidden dark:peer-checked:text-pink-400 peer-checked:border-pink-700 peer-checked:text-pink-700 ring-pink-700 dark:ring-pink-400" />
            <div className=" hidden dark:peer-checked:text-slate-400 peer-checked:border-slate-700 peer-checked:text-slate-700 ring-slate-700 dark:ring-slate-400" />
            <div className=" hidden group hover:bg-gradient-to-r from-dark_secondaire to-principale  " />
            <div className=" hidden group hover:bg-gradient-to-r from-blue-400 to-blue-700  " />
            <div className=" hidden group hover:bg-gradient-to-r from-red-400 to-red-700  " />
            <div className=" hidden group hover:bg-gradient-to-r from-lime-400 to-lime-700  " />
            <div className=" hidden group hover:bg-gradient-to-r from-pink-400 to-pink-700  " />
            <div className=" hidden group hover:bg-gradient-to-r from-slate-400 to-slate-700  " />
            <p className="hidden hover:text-principale_V1 dark:hover:text-dark_secondaire_V1" />
            <p className="hidden hover:text-blue-800 dark:hover:text-blue-300  hover:scale-105 ease-in duration-300 " />
            <p className="hidden  hover:text-red-800 dark:hover:text-red-300  hover:scale-105 ease-in duration-300 " />
            <p className="hidden  hover:text-lime-800 dark:hover:text-lime-300  hover:scale-105 ease-in duration-300 " />
            <p className="hidden  hover:text-pink-800 dark:hover:text-pink-300  hover:scale-105 ease-in duration-300 " />
            <p className="hidden  hover:text-slate-800 dark:hover:text-slate-300  hover:scale-105 ease-in duration-300 " />
        </Context2.Provider>
    );
};
