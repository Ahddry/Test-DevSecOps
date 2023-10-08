import Image from "next/legacy/image";

// Une compétence d'une personne
function MiniCarteLangage({ langage }) {
    let illustration;
    switch (langage) {
        case "C":
            illustration = "/languages/c.png";
            break;
        case "C++":
            illustration = "/languages/cplusplus.png";
            break;
        case "C#":
            illustration = "/languages/csharp.png";
            break;
        case "CSS":
            illustration = "/languages/css3.png";
            break;
        case "HTML":
            illustration = "/languages/html5.png";
            break;
        case "Java":
            illustration = "/languages/java.png";
            break;
        case "JavaFX":
            illustration = "/languages/javafx.png";
            break;
        case "JavaScript":
            illustration = "/languages/javascript.png";
            break;
        case "JS":
            illustration = "/languages/javascript.png";
            break;
        case "PHP":
            illustration = "/languages/php.png";
            break;
        case "Python":
            illustration = "/languages/python.png";
            break;
        case "React":
            illustration = "/languages/react.png";
            break;
        case "SQL":
            illustration = "/languages/sql.png";
            break;
        case "MySQL":
            illustration = "/languages/sql.png";
            break;
        case "Tailwind":
            illustration = "/languages/tailwind.png";
            break;
        default:
            illustration = "/languages/unknown.png";
    }

    return (
        <div className="p-6 shadow-md rounded-xl hover:scale-105 ease-in duration-300 w-full bg-background2 dark:bg-dark_background2 overflow-hidden">
            <div className="grid grid-cols-2 gap-4 justify-center items-center ">
                <div className="relative m-auto w-[64px] h-[64px] lg:w-[80px] lg:h-[80px]">
                    <Image src={illustration} className="" layout="fill" alt={langage + " logo"} />
                </div>
                <div className="flex flex-col justify-center items-center m-auto">
                    <h3 className=" font-semibold md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl select-none">{langage}</h3>
                </div>
            </div>
        </div>
    );
}

export default MiniCarteLangage;
