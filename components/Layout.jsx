import Navbar from "./Navbar";
import Head from "next/head";
import { useState, useEffect } from "react";

// Layout d'une page

function Layout({ children }) {
    return (
        <div className="bg-background dark:bg-dark_background text-on_background dark:text-dark_on_background min-h-screen flex flex-col">
            <Head>
                <title>Nos Portfolios</title>
                <meta name="description" content="Portfolios d'Adrien BLAIR et Aurélien BON" />
                <link rel="icon" href="/bonjourapp.ico" />
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="">{children}</main>
        </div>
    );
}
export default Layout;
