import Footer from "../components/Footer";
import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useContext } from "react";
import Context2 from "../components/ThemeContext";

// Page de contact
function Contacts() {
    const { colour } = useContext(Context2);
    return (
        <section className="flex items-center justify-between flex-col w-full h-screen  bg-background dark:bg-dark_background">
            <div className="p-5 mt-12 min-w-[70%]">
                <div className="space-y-6">
                    <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl text-" + colour.principale + " dark:text-" + colour.principaleDark}>Contacts</h1>
                    <div className="space-y-4">
                        <p className="gap-4 text-justify flex-wrap space-x-2">
                            Pour nous contacter, rien de plus simple ! <br></br>
                            Vous pouvez envoyer un mail soit à
                            <a href="mailto:adrien.blair@edu.ece.fr" className=" text-lien visited:text-lien_click cursor-pointer">
                                <FaEnvelope className="mb-1 inline-block" /> Adrien
                            </a>{" "}
                            ou à
                            <a href="mailto:aurelien.bon@edu.ece.fr" className=" text-lien visited:text-lien_click cursor-pointer">
                                <FaEnvelope className="mb-1 inline-block" /> Aurélien
                            </a>
                            .<br></br>
                            Vous pouvez aussi nous contacter sur notre
                            <a href="https://github.com/Ahddry/ece-webapp-blair-bon/issues" target="_blank" rel="noopener noreferrer" className=" text-lien visited:text-lien_click cursor-pointer">
                                <FaGithub className="mb-1 inline-block" /> GitHub
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Footer className="mx-auto w-full" />
            </div>
        </section>
    );
}

export default Contacts;
