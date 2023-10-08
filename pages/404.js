import Footer from "../components/Footer";
import { FaExclamationTriangle } from "react-icons/fa";
import { ImSad2 } from "react-icons/im";

// Page pour les erreurs 404
function E404() {
    return (
        <div className="h-screen flex-col justify-between">
            <div className="w-full h-60" id="vide"></div>
            <div id="P404" className="my-auto">
                <h1 className="text-erreur dark:text-dark_erreur text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-center">
                    <div className="inline-flex gap-5 my-10">
                        Erreur 404
                        <FaExclamationTriangle className="" />
                    </div>
                </h1>
                <div className="text-center">
                    <p className="inline-flex text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        La page que vous avez demandé n'existe pas
                        <ImSad2 className="my-auto ml-2 text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
                    </p>
                </div>
            </div>
            <div className="bottom-0 mt-auto fixed w-full">
                <Footer />
            </div>
        </div>
    );
}

export default E404;
