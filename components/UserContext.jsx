import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

// Contexte de l'utilisateur

const Context = createContext();
export default Context;
export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <Context.Provider
            value={{
                user: user,
                login: (user) => {
                    setUser(user);
                },
                logout: () => {
                    async function supalogout() {
                        await supabase.auth.signOut();
                    }
                    supalogout();
                    setUser(null);
                },
            }}
        >
            {children}
        </Context.Provider>
    );
};
