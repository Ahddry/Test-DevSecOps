import "../styles/globals.css";
import Layout from "../components/Layout";
import { useState } from "react";
import { UserContext } from "../components/UserContext";
import { ColourContext } from "../components/ThemeContext";
import { ThemeProvider } from "next-themes";

// Page par défaut de l'application comprenant les éléments communs à toutes les pages
function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <UserContext>
                <ColourContext>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ColourContext>
            </UserContext>
        </ThemeProvider>
    );
}

export default MyApp;
