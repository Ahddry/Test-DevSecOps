import CarteLangage from "./CarteLangage";

// Compétences d'une personne
function Competences({ langages, description }) {
    return (
        <section className="flex items-center w-full h-screen snap-start flex-col bg-background dark:bg-dark_background" id="competences">
            <div className="w-full h-20" id="vide"></div>
            <h2 className="my-8 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Quelles sont mes compétences ?</h2>
            <div className="my-auto grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-8 ">
                {langages.map((langage) => (
                    <CarteLangage langage={langage[0]} illustration={langage[1]} key={langage[0]} /> // langage[0] = nom du langage, langage[1] = illustration du langage
                ))}
            </div>
            <div className="hidden lg:block mb-5 mx-5 p-3 rounded-3xl bg-gray-300 md:my-3 dark:bg-dark_background2 md:max-w-5xl 2xl:max-w-7xl">
                <p className="text-justify text-sm lg:text-xl 2xl:text-3xl"> {description}</p>
            </div>
        </section>
    );
}

export default Competences;
