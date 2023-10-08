import Footer from "../../components/Footer";
import { supabase } from "../../utils/supabase";
import { useContext } from "react";
import Context2 from "../../components/ThemeContext";

// Page affichant un article en particulier
function ArticlePage({ article }) {
    const { colour } = useContext(Context2);
    return (
        <section className="flex items-center justify-between flex-col w-full h-screen  bg-background dark:bg-dark_background">
            <div className="p-5 mt-12 min-w-[70%] space-y-5">
                <h1 className={"pt-8 text-3xl font-extralight lg:text-5xl 2xl:text-7xl  text-" + colour.principale + " dark:text-" + colour.principaleDark}>Article : {article.title}</h1>
                <div className="text-xs text-right">
                    <p>
                        <b>Auteur :</b> {article.author} <b>Date :</b> {new Date(article.created_at).toLocaleDateString()} à {new Date(article.created_at).toLocaleTimeString()}
                    </p>
                </div>
                <div className="text-xl lg:text-lg">
                    <p>{article.content}</p>
                </div>
            </div>
            <div className="bottom-0 mt-auto fixed w-full">
                <Footer />
            </div>
        </section>
    );
}
export async function getStaticPaths() {
    const { data: listarticles } = await supabase.from("articles").select("id");
    const paths = listarticles.map((article) => ({
        params: { id: article.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
    const { data: article } = await supabase.from("articles").select("*").eq("id", id).single();
    return {
        props: {
            article,
        },
    };
}
export default ArticlePage;
