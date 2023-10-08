import Footer from "../../components/Footer";
import MiniCarteLangage from "../../components/MiniCarteLangage";
import Image from "next/legacy/image";
import Commentaire from "../../components/Commentaire";
import { supabase } from "../../utils/supabase";
import { useState, useContext, useEffect } from "react";
import Context from "../../components/UserContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaGithub } from "react-icons/fa";
import Context2 from "../../components/ThemeContext";
import { useRouter } from "next/router";
import { BsUpload } from "react-icons/bs";

function ProjectPage({ projet, commentaire }) {
    const { colour } = useContext(Context2);
    const { user } = useContext(Context);
    const [addComm, setAddComm] = useState(false);
    const [closeBoxe, setCloseBox] = useState(false);
    const [edit, setEdit] = useState(false);
    const [canUserEdit, setCanUserEdit] = useState(false);
    const [titre, setTitre] = useState(projet.name);
    const [description, setDescription] = useState(projet.description);
    const [langages, setLangages] = useState(projet.language);
    const [images, setImages] = useState(projet.listeimage);
    const [github, setGithub] = useState(projet.github);
    const [contributeur, setContributeur] = useState(projet.participants);
    const [test, setTest] = useState(false);
    const [uploadImage, setUploadImage] = useState(new Array(projet.listeimage.length).fill(true));
    const handleTest = () => {
        setTest(!test);
    };

    const router = useRouter();

    const onChangePicture = (e) => {
        for (const file of e.target.files) {
            const fileType = file["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                let urlfile = URL.createObjectURL(file);
                setUploadImage([...uploadImage, file]);
                setImages([...images, urlfile]);
            } else {
                alert("only images accepted");
            }
        }
    };

    const removeImage = (i) => {
        let modifiImage = images;
        modifiImage.splice(i, 1);
        let modifiUploadImage = uploadImage;
        modifiUploadImage.splice(i, 1);
        setUploadImage(modifiUploadImage);
        setImages(modifiImage);
        handleTest();
    };

    const listLanguage = ["C", "C++", "C#", "CSS", "HTML", "Java", "JavaFX", "JavaScript", "PHP", "Python", "React", "SQL", "Tailwind"];
    const setprojetLanguage = () => {
        let newLangages = new Array(listLanguage.length).fill(false);
        for (let j = 0; j < projet.language.length; j++) {
            for (let i = 0; i < listLanguage.length; i++) {
                if (listLanguage[i] === projet.language[j]) {
                    newLangages[i] = true;
                }
            }
        }
        return newLangages;
    };

    const [checkedState, setCheckedState] = useState(setprojetLanguage);
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
        //update total
        updateLanguage(updatedCheckedState);
    };
    useEffect(() => {
        if (user !== null) {
            if (user.id === projet.auteur) {
                setCanUserEdit(true);
            }
        }
    }, [user]);

    const handleEdit = () => {
        setEdit(!edit);
    };
    const handleDelete = () => {
        if (confirm("Voulez-vous supprimer votre projet ?")) {
            async function deleteProjet() {
                try {
                    await supabase.from("projets").delete().match({ id: projet.id });
                    if (error) throw error;
                } catch (error) {
                    console.log(error);
                }
            }
            deleteProjet();
            router.push("/");
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        async function updateProjet() {
            try {
                let listimagetupush = [];
                for (let i = 0; i < images.length; i++) {
                    if (uploadImage[i] === true) {
                        console.log("Image deja en ligne");
                        listimagetupush.push(images[i]);
                    } else {
                        console.log("Image pas en ligne", images[i]);
                        await supabase.storage
                            .from("projetsimage")
                            .upload(`${projet.id}/${uploadImage[i].name}`, uploadImage[i])
                            .then((response) => {
                                if (response.error != null) throw response.error;
                            });
                        listimagetupush.push(`https://mldxyasghmmynjxewzuv.supabase.co/storage/v1/object/public/projetsimage/${projet.id}/${uploadImage[i].name}`);
                    }
                }
                let listlangueuseinprj = [];
                for (let i = 0; i < listLanguage.length; i++) {
                    if (checkedState[i]) {
                        listlangueuseinprj.push(listLanguage[i]);
                    }
                }
                await supabase
                    .from("projets")
                    .update({ name: titre, description: description, language: listlangueuseinprj, listeimage: listimagetupush, github: github, participants: contributeur })
                    .match({ id: projet.id })
                    .then((response) => {
                        if (response.error != null) throw response.error;
                    });
                projet.name = titre;
                projet.description = description;
                projet.language = listlangueuseinprj;
                projet.github = github;
                projet.participants = contributeur;
                projet.listeimage = listimagetupush;
                setEdit(false);
            } catch (error) {
                console.log(error);
                alert("Votre projet n'a pas pu être modifier");
            } finally {
                alert("Le projet a bien été mis à jour");
            }
        }
        updateProjet();
    };
    const handleCancel = (e) => {
        setCheckedState(setprojetLanguage());
        setTitre(projet.name);
        setContributeur(projet.participants);
        setDescription(projet.description);
        setGithub(projet.github);
        setImages(projet.listeimage);
        setUploadImage(new Array(projet.listeimage.length).fill(true));
        setEdit(false);
    };
    const getCloseBoxe = (state) => {
        setCloseBox(state);
    };
    useEffect(() => {
        if (closeBoxe) {
            setAddComm(false);
        }
    }, [closeBoxe]);

    return (
        <section className="flex items-center justify-between flex-col w-full min-h-screen  bg-background dark:bg-dark_background">
            {edit ? (
                <div className="p-5 mt-12">
                    <div className="space-y-6">
                        <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl  text-" + colour.principale + " dark:text-" + colour.principaleDark}>Modification du projet</h1>
                        <div className=" mt-20 space-y-5">
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
                                                "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md  border-none focus:ring-" +
                                                colour.principale +
                                                " dark:focus:ring-" +
                                                colour.principaleDark
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
                                                "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md border-none focus:ring-" +
                                                colour.principale +
                                                " dark:focus:ring-" +
                                                colour.principaleDark
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
                                                            title="Supprimer l'image"
                                                            onClick={() => {
                                                                removeImage(key);
                                                            }}
                                                            className="mr-2 text-3xl font-bold text-red-600 hover:text-red-400 z-10 absolute left-3 cursor-pointer"
                                                        >
                                                            X
                                                        </button>
                                                        <div className="relative w-[300px] h-[169px] sm:w-[400px] sm:h-[225px] border-4 border-[#f9fafb] dark:border-[#4e5359] bg-[#f9fafb] dark:bg-[#4e5359] rounded-xl shadow-2xl">
                                                            <Image className="rounded-xl r" src={file} layout="fill" />
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
                                                "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full shadow-md  border-none focus:ring-" +
                                                colour.principale +
                                                " dark:focus:ring-" +
                                                colour.principaleDark
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
                </div>
            ) : (
                <div className="p-5 mt-12 space-y-5">
                    <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl  text-" + colour.principale + " dark:text-" + colour.principaleDark}>{projet.name}</h1>
                    <div>
                        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={5000}>
                            {projet.listeimage.map(
                                (image, index) => (
                                    index++,
                                    (
                                        <div key={image}>
                                            <Image src={image} alt={projet.name + index} width={1000} height={500} />
                                            <p className="legend">{projet.name + " " + index}</p>
                                        </div>
                                    )
                                )
                            )}
                        </Carousel>
                    </div>
                    <h2 className="text-2xl font-semibold">Contributeurs : </h2>
                    <div className="mb-5 mx-5 p-3 rounded-3xl bg-background2 md:my-auto lg:mr-8 dark:bg-dark_background2 shadow">
                        <p>{projet.participants}</p>
                    </div>
                    <div className="flex flex-col xl:flex-row justify-between ">
                        <div className="mb-5 mx-5 p-3 rounded-3xl bg-background2 md:my-auto lg:mr-8 dark:bg-dark_background2 shadow xl:max-w-[60%] 2xl:max-w-[55%] xl:w-full">
                            <p className="text-justify text-sm lg:text-xl 2xl:text-3xl w-full h-max select-none">{projet.description}</p>
                        </div>
                        <div className="xl:w-[40%] 2xl:[45%]">
                            <h2 className="text-2xl font-semibold mb-2">Language utilisés:</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 justify-center gap-4">
                                {projet.language.map((lang) => (
                                    <MiniCarteLangage key={lang} langage={lang} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {projet.github ? (
                        <div className="max-w-full">
                            <h2 className="text-2xl font-semibold">Lien vers le dépôt du code source : </h2>
                            <a href={projet.github} target="_blank" rel="noopener noreferrer" className="text-2xl">
                                <div className="mb-5 mx-5 mt-2 p-3 rounded-3xl bg-background2 lg:mr-8 dark:bg-dark_background2 shadow flex ">
                                    <FaGithub className="text-5xl" />
                                    <p className="text-lien text-justify text-base md:hidden hover:underline m-3">GitHub</p>
                                    <p className="text-lien text-justify hidden md:block md:text-lg lg:text-xl 2xl:text-3xl hover:underline m-3 truncate">{projet.github}</p>
                                </div>
                            </a>
                        </div>
                    ) : (
                        <></>
                    )}
                    {canUserEdit ? (
                        <div className="flex flex-col xl:flex-row justify-between">
                            <button
                                onClick={handleEdit}
                                className="bg-background2 dark:bg-dark_background2 rounded shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                            >
                                <p className="text-2xl font-semibold">Modifier le projet</p>
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-background2 dark:bg-dark_background2 rounded shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                            >
                                <p className="text-2xl font-semibold">Supprimer le projet</p>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* Commentaires */}
                    <div className="border-t pt-4 pb-4">
                        <h2 className="text-2xl font-semibold">Commentaires :</h2>
                        <ul>
                            {commentaire.map((comments) => (
                                <li key={comments.id}>
                                    <Commentaire commentaire={comments} isNew={false} getCloseBoxe={getCloseBoxe} />
                                </li>
                            ))}
                            <li
                                key="last"
                                className="pb-2 mt-4 bg-background2 dark:bg-dark_background2 rounded shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                            >
                                {user ? (
                                    <button className="justify-center w-full transition-transform" onClick={() => setAddComm(!addComm)}>
                                        Ajouter un commentaire
                                    </button>
                                ) : (
                                    <p className="text-center w-full">Vous devez être connecter pour ajouter un commentaire</p>
                                )}
                                {addComm && user && (
                                    <Commentaire
                                        commentaire={{
                                            id: null,
                                            created_at: null,
                                            projets_id: projet.id,
                                            userid: user.id,
                                            auteur: user.username,
                                            titre: "",
                                            contenue: "",
                                            etoile: 0,
                                        }}
                                        isNew={true}
                                        getCloseBoxe={getCloseBoxe}
                                    />
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <div className="bottom-0 mt-auto w-full">
                <Footer />
            </div>
        </section>
    );
}

export async function getServerSideProps({ params: { id } }) {
    const { data: projet } = await supabase.from("projets").select("*").eq("id", id).single();
    const { data: commentaire, error } = await supabase.from("commentaire").select("id,created_at,projets_id,userid,auteur:userid(username),titre,contenue,etoile").eq("projets_id", id);
    return {
        props: {
            projet,
            commentaire,
        },
    };
}

export default ProjectPage;
