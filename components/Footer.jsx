import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Context2 from "../components/ThemeContext";
import { useContext } from "react";

// Pied de page affiché sur toutes les pages
function Footer() {
    const { colour } = useContext(Context2);
    return (
        <div className="text-center content-center ">
            <footer className={"bg-" + colour.tertiaire + " dark:bg-dark_background2 text-white dark:text-dark_on_background font-medium py-3 bottom-0 w-full shadow-2xl"}>
                <div id="footer" className=" inline-block">
                    <p className=" ">
                        © Adrien BLAIR - Aurélien BON<br></br>
                    </p>
                    <div className="inline-flex gap-4">
                        <Link href="/">
                            <div className={"inline-flex gap-1 cursor-pointer text-white dark:text-dark_on_background hover:underline"}>
                                <FaHome className={"my-auto text-" + colour.secondaire + " dark:text-" + colour.secondaireDark}></FaHome> Accueil
                            </div>
                        </Link>
                        <span> ● </span>
                        <a href="https://github.com/Ahddry/ece-webapp-blair-bon" target="_blank" rel="noopener noreferrer">
                            <div className="inline-flex gap-1 cursor-pointer text-white dark:text-dark_on_background hover:underline">
                                <FaGithub className={"my-auto text-" + colour.secondaire + " dark:text-" + colour.secondaireDark}></FaGithub> GitHub
                            </div>
                        </a>
                        <span> ● </span>
                        <a href="https://github.com/adaltas/ece-webtech-2022-fall" target="_blank" rel="noopener noreferrer">
                            <div className="inline-flex gap-1 cursor-pointer text-white dark:text-dark_on_background hover:underline">
                                <FaGithub className={"my-auto text-" + colour.secondaire + " dark:text-" + colour.secondaireDark}></FaGithub> Consignes
                            </div>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
