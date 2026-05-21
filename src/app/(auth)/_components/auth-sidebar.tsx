import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";

export default function AuthSidebar() {
  const listItems = [
    {
      icon: <Brain aria-hidden="true" />,
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: <BookOpenCheck aria-hidden="true" />,
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: <RectangleEllipsis aria-hidden="true" />,
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];

  return (
    <>
      <aside className="hidden lg:block sticky top-0 h-screen py-12 px-16 bg-custom-blue overflow-hidden">
        {/* right circle */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-80 h-80 bg-blue-400 rounded-full blur-[170px] opacity-70"
        ></div>

        {/* lefft circle */}
        <div
          aria-hidden="true"
          className="absolute -bottom-5 -left-10 w-80 h-80 bg-blue-500 rounded-full blur-[200px] opacity-50"
        ></div>

        {/* Header  */}
        <header className="flex gap-3 mb-6">
          <FolderCode className="w-9 h-9 text-blue-500" aria-hidden="true" />

          <h2 className="text-blue-600 flex justify-center items-center text-xl font-bold">
            Exam App
          </h2>
        </header>

        {/* Content */}
        <div>
          <div className="mt-6 font-inter font-bold text-3xl">
            Empower your learning <p>journey with our</p> smart exam platform.
          </div>

          <ul>
            {listItems.map((item) => (
              <li key={item.title} className="flex gap-5 mt-8">
                <span
                  aria-hidden="true"
                  className="border text-blue-600 border-blue-600 w-9 h-9 p-1 flex items-center justify-center"
                >
                  {item.icon}
                </span>

                <div>
                  <h4 className="font-bold text-blue-600 text-xl">
                    {item.title}
                  </h4>

                  <p className="text-gray-700 w-11/12">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
