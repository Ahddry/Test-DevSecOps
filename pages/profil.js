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

// Page d'informations du profil

function Profil() {
    const { user } = useContext(Context);
    const { colour } = useContext(Context2);
    const { updateColour } = useContext(Context2);
    const [admin, setAdmin] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [col, setCol] = useState(user ? user.colour : "default");

    const router = useRouter();

    useEffect(() => {
        updateColour(col);
        try {
            setLoading(true);
            async function editColour() {
                if (user) {
                    if (col != user.colour) {
                        const { data, error } = await supabase.from("comptes").update({ colour: col }).eq("id", user.id);
                        user.colour = col;
                        if (error) throw error;
                    }
                }
            }
            editColour();
        } catch (error) {
            console.log(error);
            console.error("Erreur lors de la modification de la couleur d'accentuation sur la base de données");
        } finally {
            setLoading(false);
        }
    }, [col]);

    const Connecte = () => {
        const role = user.admin ? "Administrateur" : "Visiteur";
        const [username, setUsername] = useState("");
        const [mdp, setMdp] = useState("");
        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");
        const [email, setEmail] = useState("");

        const [tryMdp, setTryMdp] = useState(false);

        function editAccount() {
            setEdit(true);
            setUsername(user.username);
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
            setMdp("");
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            try {
                setLoading(true);
                let ok = true;
                setEmail(email.toLowerCase());
                async function createCompte() {
                    if (username != user.username && username != "") {
                        const { data, error } = await supabase.from("comptes").select("*").eq("username", username).single();
                        if (data !== null) {
                            alert("Ce nom d'utilisateur existe déjà");
                            setTryMdp(true);
                            ok = false;
                            if (error) throw error;
                        }
                    }
                    if (!ok) return;
                    if (username != user.username && username != "") {
                        await supabase.from("comptes").update({ username: username }).eq("id", user.id);
                        user.username = username;
                    }
                    if (firstname != user.firstname && firstname != "") {
                        await supabase.from("comptes").update({ firstname: firstname }).eq("id", user.id);
                        user.firstname = firstname;
                    }
                    if (lastname != user.lastname && lastname != "") {
                        const res = await supabase.from("comptes").update({ lastname: lastname }).eq("id", user.id);
                        user.lastname = lastname;
                    }

                    if (ok) {
                        alert("Vos informations ont bien été modifiées");
                        setEdit(false);
                        router.push("/profil");
                    }
                }
                createCompte();
            } catch (error) {
                console.log(error);
                alert("Erreur lors de la modification des informations de votre compte");
            } finally {
                setLoading(false);
            }
        };
        setAdmin(user.admin);
        return (
            <div className="p-5 mt-12 min-w-[70%] space-y-5">
                <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl  text-" + colour.principale + " dark:text-" + colour.principaleDark}>Mon profil</h1>
                <div className="mr-4">
                    {user.gravatarurl ? (
                        <div
                            className={
                                " relative flex items-center justify-center h-[128px] w-[128px] shadow-xl rounded-full p-4 bg-background2 dark:bg-dark_background2 group hover:bg-gradient-to-r from-" +
                                colour.principaleDark +
                                " to-" +
                                colour.principale +
                                " max-w-2xl"
                            }
                        >
                            <Image
                                className="rounded-full overflow-hidden group-hover:opacity-10 w-8 h-8 mt-2"
                                src={`${user.gravatarurl}`}
                                alt={"profilepicture " + user.username}
                                width={128}
                                height={128}
                            ></Image>
                            <div className="hidden group-hover:block absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                {user.origin === "github" ? (
                                    <a href={"https://github.com/settings/profile"} target="_blank" rel="noopener noreferrer">
                                        <p className="py-2 text-dark_on_background font-semibold text-center">Modifier mon avatar</p>
                                    </a>
                                ) : (
                                    <a href={"https://fr.gravatar.com"} target="_blank" rel="noopener noreferrer">
                                        <p className="py-2 text-dark_on_background font-semibold text-center">Modifier mon avatar</p>
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="text-xl lg:text-lg">
                    <p>
                        <span className="font-bold">Nom d'utilisateur : </span> {user.username} <br />
                        <span className="font-bold">Nom : </span> {user.lastname} <br />
                        <span className="font-bold"> Prénom : </span> {user.firstname} <br />
                        <span className="font-bold"> Email : </span> {user.email} <br />
                        <span className="font-bold"> Rôle : </span> {role}
                        <br />
                    </p>
                    <form>
                        <div
                            className={
                                "mt-6 rounded-2xl border-2 border-" +
                                colour.principale +
                                " dark:border-" +
                                colour.principaleDark +
                                " text-" +
                                colour.principale +
                                " dark:text-" +
                                colour.principaleDark +
                                " hover:bg-" +
                                colour.principale +
                                " hover:text-white hover:dark:bg-" +
                                colour.principaleDark +
                                " dark:hover:text-on_background w-min"
                            }
                        >
                            <fieldset>
                                <legend className="p-4">Couleur d'accentuation</legend>
                                <div className="flex flex-col md:flex-row space-x-2 p-4">
                                    <div className="flex flex-row ">
                                        {col === "defaut" ? (
                                            <input type="radio" value={colour.principale} onChange={(e) => setCol("default")} checked />
                                        ) : (
                                            <input type="radio" value={colour.principale} onChange={(e) => setCol("default")} />
                                        )}
                                        <label className="m-2 text-xl w-full">Par défaut</label>
                                    </div>
                                    <div className="flex flex-row ">
                                        <input type="radio" value={colour.principale} onChange={(e) => setCol("bleu")} />
                                        <label className="m-2 mt-5 text-xl">Bleu</label>
                                    </div>
                                    <div className="flex flex-row ">
                                        <input type="radio" value={colour.principale} onChange={(e) => setCol("rouge")} />
                                        <label className="m-2 mt-5 text-xl">Rouge</label>
                                    </div>
                                    <div className="flex flex-row ">
                                        <input type="radio" value={colour.principale} onChange={(e) => setCol("vert")} />
                                        <label className="m-2 mt-5 text-xl">Vert</label>
                                    </div>
                                    <div className="flex flex-row ">
                                        <input type="radio" value={colour.principale} onChange={(e) => setCol("rose")} />
                                        <label className="m-2 mt-5 text-xl">Rose</label>
                                    </div>
                                    <div className="flex flex-row ">
                                        <input type="radio" value={colour.principale} onChange={(e) => setCol("gris")} />
                                        <label className="m-2 mt-5 text-xl">Gris</label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                    <button
                        className={
                            "mt-6 p-4 rounded-2xl border-2 border-" +
                            colour.principale +
                            " dark:border-" +
                            colour.principaleDark +
                            " text-" +
                            colour.principale +
                            " dark:text-" +
                            colour.principaleDark +
                            " hover:bg-" +
                            colour.principale +
                            " hover:text-white hover:dark:bg-" +
                            colour.principaleDark +
                            " dark:hover:text-white"
                        }
                        onClick={editAccount}
                    >
                        Modifier mes informations
                    </button>
                </div>
                {edit ? (
                    <div>
                        {user.origin === "github" ? (
                            <div className="p-2 bg-background2 dark:bg-dark_background2 rounded-2xl shadow-lg min-w-min space-y-2 xl:p-4 flex-col">
                                <p>Pour modifier vos informations de connexion, veuillez vous rendre sur votre compte GitHub</p>
                                <a href="https://github.com/settings/profile" target="_blank" rel="noopener noreferrer">
                                    <div className="mt-2 text-white bg-black rounded-xl shadow-md hover:bg-gray-800 dark:active:bg-gray-900 dark:active:border-2 dark:active:border-black w-fit cursor-pointer p-2 xl:p-3">
                                        <FaGithub className="inline-block" />
                                        <span className="ml-2">Accéder à mon compte GitHub</span>
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <form className="p-2 bg-background2 dark:bg-dark_background2 rounded-2xl min-w-min space-y-2 xl:p-4 flex-col" onSubmit={handleSubmit}>
                                <p>Nouveau Nom d'utilisateur</p>
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    className="p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <p>Nouveau Prénom</p>
                                <input
                                    type="text"
                                    placeholder="Prénom"
                                    className="p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                <p>Nouveau Nom</p>
                                <input type="text" placeholder="Nom" className="p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        className="bg-gray-200 dark:bg-[#36383c] rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                                    >
                                        {loading ? "Chargement..." : "Modifier mes informations"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <></>
                )}
                {admin ? <Messagerie /> : <></>}
            </div>
        );
    };

    const NonConnecte = () => {
        return (
            <div className="flex flex-col items-center justify-center space-y-2 mt-[10%]">
                <ImSad2 className="text-5xl text-gray-400" />
                <h1 className="text-3xl font-bold text-gray-400">Vous n'êtes pas connecté</h1>
                <p className="text-xl text-gray-400">
                    <Link href="/login">
                        <span className="text-lien visited:text-lien_click hover:border-b hover:border-lien hover:visited:border-lien_click cursor-pointer">Connectez</span>
                    </Link>
                    -vous pour accéder à votre profil
                </p>
            </div>
        );
    };

    const Messagerie = () => {
        const [messages, setMessages] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            fetchMessages();
        }, []);

        async function fetchMessages() {
            try {
                setLoading(true);
                setError(null);
                const messages = await supabase.from("contacter").select("*").eq("destinataire", user.id);
                setMessages(messages.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        return (
            <div>
                <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl  text-" + colour.principale + " dark:text-" + colour.principaleDark}>Messagerie</h1>
                <div className="my-8" />
                <div className="rounded-xl overflow-auto shadow mb-24">
                    <table className="w-full p-3 bg-gray-100 dark:bg-dark_background2">
                        <thead className="bg-gray-200 dark:bg-gray-800 border-b-2 border-gray-300 ">
                            <tr>
                                <th className="p-3 text-sm font-se tracking-wide text-left">De</th>
                                <th className="p-3 text-sm font-se tracking-wide text-left">Objet</th>
                                <th className="p-3 text-sm font-se tracking-wide text-left">Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {messages.map((message) => (
                                <tr key={message.id}>
                                    <td className="p-3 text-sm whitespace-nowrap">{message.email}</td>
                                    <td className="p-3 text-sm whitespace-nowrap">{message.sujet}</td>
                                    <td className="p-3 text-sm whitespace-nowrap">{message.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <section className="flex items-center justify-between flex-col w-full min-h-screen  bg-background dark:bg-dark_background">
            <div className="p-5 mt-12 min-w-[70%] space-y-5 max-w-full">
                <div>{user ? <Connecte /> : <NonConnecte />}</div>
            </div>
            <div className="mt-[10%] w-full">
                <Footer />
            </div>
        </section>
    );
}

export default Profil;
