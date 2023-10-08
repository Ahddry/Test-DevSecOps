import CarteExperience from "./CarteExperience";

// Expériences d'une personne
function Experiences({ entreprises, description }) {
    return (
        <section className="flex items-center w-full h-screen snap-start flex-col bg-background dark:bg-dark_background space-y-16 lg:space-y-24 xl:space-y-32 2xl:space-y-48" id="experiences">
            <h2 className="my-8 mt-28 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Les entreprises où j'ai travaillé</h2>
            <div className="mx-5 my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-8 ">
                {entreprises.map((entreprise) => (
                    <CarteExperience entreprise={entreprise[0]} periode={entreprise[1]} poste={entreprise[2]} illustration={entreprise[3]} key={entreprise[0]} /> // entreprise[0] = nom de l'entreprise, entreprise[1] = logo de l'entreprise
                ))}
            </div>
            <div className="hidden lg:block mb-5 mx-5 p-3 rounded-3xl bg-gray-300 md:my-3 dark:bg-dark_background2 md:max-w-5xl 2xl:max-w-7xl">
                <p className="text-justify text-sm lg:text-xl 2xl:text-3xl"> {description}</p>
            </div>
        </section>
    );
}

export default Experiences;
