import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return <>
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full bg-white ml-[23rem]">
                <Header />
                <div className="min-h-[calc(100vh-48px)] p-3">{children}</div>
            </div>

        </div>

    </>



}   