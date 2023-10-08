import Footer from "../components/Footer";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import { useContext } from "react";
import Context2 from "../components/ThemeContext";

// Page affichant la liste des articles
function Articles({ listarticles }) {
    const { colour } = useContext(Context2);
    return (
        <section className="flex items-center justify-between flex-col w-full h-screen  bg-background dark:bg-dark_background">
            <div className="p-5 mt-12 min-w-[70%] space-y-5">
                <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl  text-" + colour.principale + " dark:text-" + colour.principaleDark}>Liste des articles</h1>
                <ul className="ml-5 list-disc">
                    {listarticles.map((article) => (
                        <li key={article.id}>
                            <Link href={`/articles/${article.id}`}>
                                <p className="text-xl text-lien visited:text-lien_click hover:border-b-2 hover:border-lien visited:hover:border-lien_click w-fit">{article.title}</p>
                            </Link>{" "}
                            par {article.author} le {new Date(article.created_at).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bottom-0 mt-auto fixed w-full">
                <Footer />
            </div>
        </section>
    );
}
export async function getStaticProps() {
    const { data: listarticles } = await supabase.from("articles").select("*");
    return {
        props: {
            listarticles,
        },
    };
}

export default Articles;
