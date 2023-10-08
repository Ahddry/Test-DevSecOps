import Context from "../components/UserContext";
import Context2 from "../components/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

// Page de connexion à

function Github() {
    const router = useRouter();
    const { login } = useContext(Context);
    const { colour } = useContext(Context2);
    const { updateColour } = useContext(Context2);

    useEffect(() => {
        async function loginSupabase() {
            let user = (await supabase.auth.getUser()).data.user;
            if (user !== null) {
                let premiereConnexion = true;
                const { data: comptes, error2 } = await supabase.from("comptes").select("*").eq("id", user.id).single();
                if (comptes !== undefined && comptes !== null) {
                    premiereConnexion = false;
                }

                // Creation du compte si c'est sa première connexion
                if (premiereConnexion) {
                    let [first, last] = ["", ""];
                    if (user.user_metadata.full_name !== undefined) {
                        try {
                            [first, last] = user.user_metadata.full_name.split(" ");
                        } catch (e) {
                            [first, last] = [user.user_metadata.preferred_username, ""];
                        }
                    } else {
                        [first, last] = [user.user_metadata.preferred_username, ""];
                    }
                    const { data, error } = await supabase.from("comptes").insert([
                        {
                            id: user.id,
                            created_at: user.created_at,
                            username: user.user_metadata.preferred_username,
                            firstname: first,
                            lastname: last,
                            email: user.email,
                            is_admin: false,
                            gravatar_url: user.user_metadata.avatar_url,
                            colour: "default",
                        },
                    ]);
                    if (error) throw error;
                }

                //Login de l'utilisateur
                const { data, error } = await supabase.from("comptes").select("*").eq("id", user.id).single();
                if (error) throw error;
                await login({
                    id: user.id,
                    created_at: user.created_at,
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password,
                    admin: data.is_admin,
                    gravatarurl: data.gravatar_url,
                    colour: data.colour,
                    origin: "github",
                });
                updateColour(data.colour);
                router.push("/");
            } else console.error("NO USER");
        }
        loginSupabase();
    }, []);

    return <p>LA BONNE PAGE</p>;
}

export default Github;
