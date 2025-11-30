import { BookOpenCheck, Brain, FolderCode, RectangleEllipsis, } from "lucide-react";

export default function AuthSidebar() {
    const listItems = [
        {
            icon: <Brain />,
            title: "Tailored Diplomas",
            description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development."
        },
        {
            icon: <BookOpenCheck />,
            title: "Focused Exams",
            description: "Access topic-specific tests including HTML, CSS, JavaScript, and more."
        },
        {
            icon: <RectangleEllipsis />,
            title: "Smart Multi-Step Forms",
            description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development."
        }
    ]
    return <>
        <aside className="h-screen relative py-[7rem] px-[8.1875rem] bg-custom-blue">
            {/* right circle */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-400 rounded-full blur-[170px] opacity-70"></div>
            {/* lefft circle */}
            <div className="absolute -bottom-5 -left-10 w-80 h-80 bg-blue-500 rounded-full blur-[200px] opacity-50"></div>
            {/* Header  */}
            <header className="flex gap-3">
                <FolderCode className="w-9 h-9 text-blue-500" />
                <h2 className="text-blue-600 flex justify-center items-center text-xl font-bold">Exam App</h2>
            </header>
            {/* Content */}
            <div>
                <p className="mt-16 font-inter font-bold text-3xl">Empower your learning journey with our smart exam platform.</p>
                <ul>
                    {listItems.map((item, index) => (
                        <li key={index} className="flex gap-5 mt-10">
                            <span className="border text-blue-600 border-blue-600 w-9 h-9 p-1 " >{item.icon}</span>
                            <div >
                                <h4 className="font-bold text-blue-600 text-xl">{item.title}</h4>
                                <p className="text-gray-700">{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    </>
}
