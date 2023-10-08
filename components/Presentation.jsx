import Image from "next/legacy/image";
const parse = require("html-react-parser");

// Présentation d'une personne
function Presentation({ prenom, nom, age, image, description }) {
    return (
        <section className="flex items-center justify-center w-full h-screen snap-start flex-col bg-gray-200 dark:bg-[#1d1f23]" id="presentation">
            <div className="w-full h-20 md:hidden" id="vide"></div>
            <div>
                <h2 className="text-3xl lg:text-5xl 2xl:text-7xl font-extralight hidden md:block">Qui suis-je ?</h2>
                <div className="flex items-center justify-center flex-col my-auto space-y-3 sm:space-y-5 md:flex-row">
                    <h2 className="text-3xl font-extralight mt-auto mr-auto ml-5 md:hidden">Qui suis-je ?</h2>
                    <div className="relative justify-center items-center max-w-lg w-72 h-72 sm:w-96 sm:h-96 mt-auto md:h-[100px] md:w-[100px] md:my-auto lg:h-[200px] lg:w-[200px] xl:h-[300px] xl:w-[300px] 2xl:h-[400px] 2xl:w-[400px] md:ml-auto">
                        <Image src={image} alt={image + ".jpg"} layout="fill" className="rounded-3xl" />
                    </div>
                    <div className="md:flex-col md:mr-auto lg:space-y-20">
                        <div className=" inline-block space-y-1 mr-auto ml-14 my-2 md:my-auto">
                            <h2 className="text-3xl lg:text-5xl 2xl:text-7xl font-semibold tracking-tight leading-none">{prenom}</h2>
                            <h2 className="text-3xl lg:text-5xl 2xl:text-7xl font-bold tracking-tight leading-none">{nom}</h2>
                            <h4 className="text-2xl lg:text-3xl 2xl:text-5xl font-medium">{age}</h4>
                        </div>
                        <div className="mb-5 mx-5 p-3 rounded-3xl bg-gray-300 md:my-auto lg:mr-8 dark:bg-dark_background2 md:max-w-xl 2xl:max-w-screen-2xl">
                            <p className="text-justify text-xs md:text-sm lg:text-xl 2xl:text-3xl">{parse(description)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Presentation;
