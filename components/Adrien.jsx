import Presentation from "./Presentation";
import Competences from "./Competences";
import Projets from "./Projets";
import Experiences from "./Experiences";
import Contacter from "./Contacter";

// Portfolio d'Adrien
function Adrien() {
    const dataAdri = {
        id: "5db7ae9a-72c9-4b30-9d2c-f882ea540279",
        prenom: "Adrien",
        nom: "Blair",
        age: "21 ans",
        image: "/adrien.jpg",
        description:
            "Moi c'est Adrien, j'ai 21 ans et je suis étudiant en 4ème année à l'ECE Paris. Je suis passionné par l'informatique et la programmation, j'éprouve aussi un grand intérêt pour le monde de la sécurité informatique.<br></br> Lorsque je ne programme pas, j'aime jouer à des jeux vidéo et passer du temps avec mes amis.",
    };

    const compAdri = {
        langages: [
            ["C#", "/languages/csharp.png"],
            ["C++", "/languages/cplusplus.png"],
            ["Java", "/languages/java.png"],
            ["JavaScript", "/languages/javascript.png"],
            ["HTML", "/languages/html5.png"],
            ["CSS", "/languages/css3.png"],
            ["React", "/languages/react.png"],
            ["Tailwind", "/languages/tailwind.png"],
        ], //! MAX 8
        description:
            "J'adore créer des applications web et mobiles, que ce soit la partie back-end ou front-end. Lors de mes projets passés, j'ai de nombreuses fois été amené à m'occuper de la partie front-end, ce qui m'a permis d'acquérir de solides connaissances en JavaScript, CSS, React et Tailwind. J'ai également eu l'occasion de travailler sur des projets back-end, notamment en C# et Java.",
    };

    const expAdri = {
        entreprises: [
            ["Capgemini Engineering", "Janvier 2022 - Février 2022", "Technicien assitance informatique", "/entreprises/capgemini.png"],
            ["Lagardère News", "Décembre 2020 - Février 2021", "Technicien assitance informatique", "/entreprises/lagardere_media.png"],
            ["Brose", "Juillet 2019 - Août 2019", "Stage support de production", "/entreprises/brose.png"],
        ],
        description: "Voici quelques expériences professionnelles que j'ai pu acquérir au cours de mes études.",
    };
    return (
        <div>
            <Presentation {...dataAdri} />
            <Competences {...compAdri} />
            <Projets userid={dataAdri.id} target={"Adrien"} />
            <Experiences {...expAdri} />
            <Contacter target={"Adrien"} />
        </div>
    );
}

export default Adrien;
