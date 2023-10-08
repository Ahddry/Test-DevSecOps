import Image from "next/legacy/image";
import Link from "next/link";
import { useContext } from "react";
import Context2 from "../components/ThemeContext";

// Projets réalisés par une personne
function CarteProjet({ nom, outils, lien, id }) {
    const { colour } = useContext(Context2);
    let languagearray = [];
    for (let i = 0; i < outils.length; i++) {
        if (outils[i + 1] != null) {
            languagearray.push(outils[i]);
            languagearray.push(" ● ");
        } else {
            languagearray.push(outils[i]);
        }
    }
    return (
        <div
            className={
                " relative flex items-center justify-center h-auto w-full shadow-xl rounded-xl p-4 bg-background2 dark:bg-dark_background2 group hover:bg-gradient-to-r from-" +
                colour.principaleDark +
                " to-" +
                colour.principale +
                " max-w-2xl"
            }
        >
            <div className="relative w-[300px] h-[169px] sm:w-[400px] sm:h-[225px]">
                <Image src={lien} layout="fill" alt={nom + " logo"} className="rounded-xl group-hover:opacity-10" />
            </div>
            <div className="hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%]">
                <h3 className="text-2xl text-white font-bold tracking-wider text-center">{nom}</h3>
                <p className="pb-4 pt-2 text-white text-center">
                    {languagearray.map((language, index) => (
                        <span key={language + index}>{language}</span>
                    ))}
                </p>
                <Link href={"/project/" + id}>
                    <p
                        className={
                            "text-center p-3 rounded-lg bg-white dark:bg-dark_background2 text-on_background2 dark:text-dark_on_background2 hover:dark:bg-gradient-to-r from-dark_principale to-dark_principale_V1 hover:text-" +
                            colour.secondaire +
                            " dark:hover:text-" +
                            colour.secondaireDark +
                            " hover:scale-105 ease-in duration-300 font-bold text-lg cursor-pointer"
                        }
                    >
                        Plus d'informations
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default CarteProjet;
