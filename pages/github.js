import Context from "../components/UserContext";
import Context2 from "../components/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// Page de connexion à

function Github() {
    const router = useRouter();
    const { login } = useContext(Context);
    const { colour } = useContext(Context2);
    const { updateColour } = useContext(Context2);

    return <p>LA BONNE PAGE</p>;
}

export default Github;
