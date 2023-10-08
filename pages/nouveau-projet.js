import Footer from "../components/Footer";
import { ImSad2 } from "react-icons/im";
import Link from "next/link";
import Image from "next/legacy/image";
import Context from "../components/UserContext";
import { useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Context2 from "../components/ThemeContext";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import { BsUpload } from "react-icons/bs";

// Page de création d'un nouveau projet

function NouveauProjet() {
    const { user } = useContext(Context);
    const { colour } = useContext(Context2);

    const router = useRouter();

    const Connecte = () => {
        // Ajouter les variables ici
        const [images, setImages] = useState([]);
        const [test, setTest] = useState(false);
        const [titre, setTitre] = useState("");
        const [description, setDescription] = useState("");
        const [langages, setLangages] = useState([]);
        const [github, setGithub] = useState("");
        const [contributeur, setContributeur] = useState("");
        const handleTest = () => {
            setTest(!test);
        };

        const onChangePicture = (e) => {
            for (const file of e.target.files) {
                const fileType = file["type"];
                const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
                if (validImageTypes.includes(fileType)) {
                    setImages([...images, file]);
                } else {
                    alert("only images accepted");
                }
            }
        };

        const removeImage = (i) => {
            let modifiImage = images;
            modifiImage.splice(i, 1);
            setImages(modifiImage);
            handleTest();
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (titre === "" || description === "" || langages.length === 0 || contributeur === "") {
                alert("Veuillez remplir tous les champs");
                return;
            }
            if (images.length === 0) {
                alert("Veuillez ajouter une image");
                return;
            }
            async function pulishProjet() {
                try {
                    await supabase.from("projets").insert([
                        {
                            name: titre,
                            description: description,
                            language: langages,
                            github: github,
                            participants: contributeur,
                            auteur: user.id,
                        },
                    ]);
                    const { data, error } = await supabase.from("projets").select("id").match({ name: titre, auteur: user.id });
                    if (error) {
                        console.log(error);
                    } else {
                        let listimagetupush = [];
                        for (let i = 0; i < images.length; i++) {
                            const file = images[i];
                            const { data1, error } = await supabase.storage.from("projetsimage").upload(`${data[0].id}/${images[i].name}`, images[i]);
                            if (error) {
                                console.log(error);
                            } else {
                                listimagetupush.push(`https://mldxyasghmmynjxewzuv.supabase.co/storage/v1/object/public/projetsimage/${data[0].id}/${images[i].name}`);
                            }
                        }
                        await supabase.from("projets").update({ listeimage: listimagetupush }).match({ id: data[0].id });
                        router.push("/");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            pulishProjet();
        };

        const listLanguage = ["C", "C++", "C#", "CSS", "HTML", "Java", "JavaFX", "JavaScript", "PHP", "Python", "React", "SQL", "Tailwind"];

        const [checkedState, setCheckedState] = useState(new Array(listLanguage.length).fill(false));
        const updateLanguage = (checkboxValues) => {
            let newLangages = [];
            for (let i = 0; i < checkboxValues.length; i++) {
                if (checkboxValues[i]) {
                    newLangages.push(listLanguage[i]);
                }
            }
            setLangages(newLangages);
        };
        const handleOnChange = (position) => {
            const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
            setCheckedState(updatedCheckedState);
            updateLanguage(updatedCheckedState);
        };
        const handleCancel = () => {
            if (confirm("Voulez-vous vraiment annuler la création de votre projet ?")) {
                router.push("/");
            }
        };

        return (
            <div className="p-5 mt-12 min-w-[70%] space-y-5">
                <h1 className={"text-3xl font-extralight lg:text-5xl 2xl:text-7xl text-" + colour.principale + " dark:text-" + colour.principaleDark}>
                    Création d'un nouveau projet pour {user.firstname}
                </h1>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 bg-background2 dark:bg-dark_background2 text-on_background dark:text-dark_on_background rounded-2xl shadow-lg  min-w-min space-y-2 xl:p-4 flex-col"
                    >
                        <div className="flex flex-col w-full h-full space-y-5">
                            <div className="flex flex-col justify-center w-full h-full">
                                <label className="text-lg xl:text-2xl font-bold dark:text-dark_text">Titre du projet</label>
                                <input
                                    type="text"
                                    placeholder="Titre"
                                    value={titre}
                                    onChange={(e) => setTitre(e.target.value)}
                                    className={
                                        "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md  border-none focus:ring-" + colour.principale + " dark:focus:ring-" + colour.principaleDark
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col justify-center w-full h-full">
                                <label className="text-lg xl:text-2xl font-bold dark:text-dark_text">Description du projet</label>
                                <textarea
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={
                                        "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full min-h-[42px] max-h-96 h-36 lg:h-64 shadow-md border-none focus:ring-" +
                                        colour.principale +
                                        " dark:focus:ring-" +
                                        colour.principaleDark
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col  justify-center w-full h-full">
                                <label className="text-lg xl:text-2xl font-bold dark:text-dark_text">Contributeurs au projet</label>
                                <input
                                    type="text"
                                    placeholder="Contributeur"
                                    value={contributeur}
                                    onChange={(e) => setContributeur(e.target.value)}
                                    className={
                                        "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md border-none focus:ring-" + colour.principale + " dark:focus:ring-" + colour.principaleDark
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 items-center justify-center w-full h-full gap-4">
                                    {images.map((file, key) => {
                                        return (
                                            <div key={key} className="overflow-hidden relative">
                                                <button
                                                    onClick={() => {
                                                        title = "Supprimer l'image";
                                                        removeImage(key);
                                                    }}
                                                    className="mr-2 text-3xl font-bold text-red-600 hover:text-red-400 z-10 absolute left-3 cursor-pointer"
                                                >
                                                    X
                                                </button>
                                                <div className="relative w-[300px] h-[169px] sm:w-[400px] sm:h-[225px] border-4 border-[#f9fafb] dark:border-[#4e5359] bg-[#f9fafb] dark:bg-[#4e5359] rounded-xl shadow-2xl">
                                                    <Image className="rounded-xl r" src={URL.createObjectURL(file)} layout="fill" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col h-12 max-w-md mx-auto my-5 relative border-2 items-center cursor-pointer p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md">
                                    <input
                                        type="file"
                                        onChange={onChangePicture}
                                        multiple="multiple"
                                        name="files[]"
                                        title="Ajouter une image"
                                        className="h-full w-full opacity-0 absolute hover:bg-red-500"
                                    />

                                    <div className="flex space-x-4 my-auto hover:text-gray-300 hover:bg-red-500">
                                        <BsUpload className="text-2xl text-gray-600 dark:text-gray-400" /> <p>Ajouter une image</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col  justify-center w-full h-full">
                                <label className="text-lg xl:text-2xl font-bold dark:text-dark_text">Lien vers le dépôt GitHub du projet</label>
                                <input
                                    type="text"
                                    placeholder="Github"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                    className={
                                        "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md  border-none focus:ring-" + colour.principale + " dark:focus:ring-" + colour.principaleDark
                                    }
                                />
                            </div>
                            <label className="text-lg xl:text-2xl font-bold dark:text-dark_text">Langages utilisés</label>
                            <div className="flex flex-col lg:flex-row justify-center w-full h-full">
                                {listLanguage.map((langage, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            placeholder="Langage"
                                            value={langage}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                            className={
                                                "w-4 h-4 text-" +
                                                colour.principale +
                                                " dark:text-" +
                                                colour.principaleDark +
                                                " bg-gray-100 rounded-xl border-gray-300 focus:ring-" +
                                                colour.secondaire +
                                                " dark:focus:ring-" +
                                                colour.secondaireDark +
                                                "dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            }
                                        />
                                        <label htmlFor={langage} className="mx-2 mb-5">
                                            {langage}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-gray-200 dark:bg-[#36383c] rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                                >
                                    Enregister
                                </button>
                                <button
                                    type="reset"
                                    onClick={handleCancel}
                                    className="mx-2 bg-gray-200 dark:bg-[#36383c] rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const NonConnecte = () => {
        return (
            <div className="flex flex-col items-center justify-center space-y-2 mt-[10%]">
                <ImSad2 className="text-5xl text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-400">Vous n'êtes pas connecté à un comte administrateur !</h1>
                <p className="text-xl text-gray-400">
                    <Link href="/login">
                        <span className="text-lien visited:text-lien_click hover:border-b hover:border-lien hover:visited:border-lien_click cursor-pointer">Connectez</span>
                    </Link>
                    -vous pour accéder à votre profil
                </p>
            </div>
        );
    };

    return (
        <section className="flex items-center justify-between flex-col w-full min-h-screen  bg-background dark:bg-dark_background">
            <div className="p-5 mt-12 min-w-[70%] space-y-5 max-w-full">
                <div>{user ? user.id === "5db7ae9a-72c9-4b30-9d2c-f882ea540279" || user.id === "cbdd2007-e5de-49e4-9c11-ef15c0360c37" ? <Connecte /> : <NonConnecte /> : <NonConnecte />}</div>
            </div>
            <div className="mt-[10%] w-full">
                <Footer />
            </div>
        </section>
    );
}

export default NouveauProjet;

export async function getServerSideProps() {
    const { data: projet } = await supabase.from("projets").select("*");
    return {
        props: {
            projet,
        },
    };
}
