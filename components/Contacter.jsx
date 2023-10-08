import { useState, useContext } from "react";
import { supabase } from "../utils/supabase.js";
import Context2 from "./ThemeContext.jsx";

// Formulaire de contact
function Contacter({ target }) {
    const { colour } = useContext(Context2);
    const [email, setEmail] = useState("");
    const [sujet, setSujet] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        data.preventDefault();
        console.log(email, sujet, message, target);
        const data2 = new FormData();
        data2.append("email", email);
        data2.append("sujet", sujet);
        data2.append("message", message);
        console.log(data2);
        for (const [key, value] of data2) {
            console.log(key, value);
        }

        let destinataire = "";

        switch (target) {
            case "Adrien":
                destinataire = "5db7ae9a-72c9-4b30-9d2c-f882ea540279";
                break;
            case "Aurelien":
                destinataire = "30b54f8f-e308-48e3-a3f0-d84670a8de01";
                break;
            default:
                break;
        }

        const contact = {
            email: email,
            sujet: sujet,
            message: message,
            date: new Date().toISOString(),
            destinataire: destinataire,
        };

        insertContact(contact);

        async function insertContact(contact) {
            try {
                setLoading(true);
                let { error } = await supabase.from("contacter").insert({
                    email: contact.email,
                    sujet: contact.sujet,
                    message: contact.message,
                    date: contact.date,
                    destinataire: contact.destinataire,
                });
                if (error) throw error;
            } catch (error) {
                alert("Erreur lors de l'envoi du message");
                console.log("erreur : ", error);
                return error;
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section className="flex items-center w-full h-screen snap-start flex-col bg-gray-200 dark:bg-[#1d1f23] space-y-16 lg:space-y-24 xl:space-y-32 2xl:space-y-48 " id="contacter">
            <h2 className="my-8 mt-28 ml-[10%] mr-auto text-3xl lg:text-5xl 2xl:text-7xl font-extralight">Me contacter</h2>
            <div className="mr-auto my-auto ml-[10%] lg:ml-[20%] text-lg lg:text-2xl xl:text-3xl w-[80%] lg:w-[60%]">
                <form className="p-2 bg-background2 dark:bg-dark_background2 rounded-2xl shadow-lg min-w-min space-y-2 xl:p-4 flex-col" onSubmit={onSubmit}>
                    <p>Votre email</p>
                    <input
                        type="text"
                        placeholder="email@exemple.fr"
                        className={"p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full  border-none focus:ring-" + colour.principale + " dark:focus:ring-" + colour.principaleDark}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        title="Veuillez rentrer une adresse mail valide."
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    />
                    <p>Sujet de votre message </p>
                    <input
                        type="text"
                        placeholder="Sujet"
                        className={"p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full border-none focus:ring-" + colour.principale + " dark:focus:ring-" + colour.principaleDark}
                        value={sujet}
                        onChange={(e) => setSujet(e.target.value)}
                        required
                    />
                    <p>Votre message</p>
                    <textarea
                        placeholder="Votre message"
                        className={
                            "p-2 bg-[#f9fafb] dark:bg-[#4e5359] rounded-2xl w-full min-h-[42px] max-h-64 lg:h-36 border-none focus:ring-" +
                            colour.principale +
                            " dark:focus:ring-" +
                            colour.principaleDark
                        }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-gray-200 dark:bg-[#36383c] rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-[#4F4F4F] active:bg-background dark:active:bg-dark_background cursor-pointer p-2 xl:p-3"
                        >
                            {loading ? "Envoi en cours..." : "Envoyer"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contacter;
