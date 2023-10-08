import "../styles/globals.css";
import Layout from "../components/Layout";
import { useState } from "react";
import { UserContext } from "../components/UserContext";
import { ColourContext } from "../components/ThemeContext";
import { ThemeProvider } from "next-themes";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

// Page par défaut de l'application comprenant les éléments communs à toutes les pages
function MyApp({ Component, pageProps }) {
    const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <ThemeProvider attribute="class">
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <UserContext>
                    <ColourContext>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ColourContext>
                </UserContext>
            </SessionContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
