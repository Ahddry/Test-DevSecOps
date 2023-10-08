import Presentation from "./Presentation";
import Competences from "./Competences";
import Projets from "./Projets";
import Experiences from "./Experiences";
import Contacter from "./Contacter";

// Portfolio d'Aurélien
function Aurelien() {
    const dataAure = {
        id: "cbdd2007-e5de-49e4-9c11-ef15c0360c37",
        prenom: "Aurélien",
        nom: "Bon",
        age: "21 ans",
        image: "/aurelien.png",
        description: "Bonjour, je m'appelle Aurélien, j'étudie à l'ECE Paris depuis 4 ans et adore le développement web. J'aime aussi le sport, la musique et les jeux vidéos.",
    };

    const compAure = {
        langages: [
            ["C", "/languages/c.png"],
            ["C++", "/languages/cplusplus.png"],
            ["C#", "/languages/csharp.png"],
            ["Python", "/languages/python.png"],
            ["Java", "/languages/java.png"],
            ["JavaScript", "/languages/javascript.png"],
            ["HTML", "/languages/html5.png"],
            ["SQL", "/languages/sql.png"],
        ], //! MAX 8
        description:
            "J'ai depuis toujours été passioné par la manière dont fonctionne les choses. Je suis donc très intéressé par la programmation, qui permet de créer des choses à partir de rien, plus partoculièrement la partie back-end. J'ai donc eu l'occasion de travailler sur des projets back-end, notamment en C, C++, C#, Python et Java.",
    };

    const expAure = {
        entreprises: [
            ["Devoteam", "Mai 2022 - Juillet 2022", "Développeur low code", "/entreprises/devoteam.png"],
            ["Evernex", "Janvier 2021 - Février 2021", "Stage support du service de développement", "/entreprises/evernex.png"],
        ],
        description: "Les entreprises dans le secteur informatique avec lesquels j'ai eu la chance de travailler.",
    };

    return (
        <div>
            <Presentation {...dataAure} />
            <Competences {...compAure} />
            <Projets userid={dataAure.id} target={"Aurelien"} />
            <Experiences {...expAure} />
            <Contacter target={"Aurelien"} />
        </div>
    );
}

export default Aurelien;
