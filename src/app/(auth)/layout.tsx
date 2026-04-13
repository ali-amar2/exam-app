import AuthSidebar from "./_components/auth-sidebar";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <AuthSidebar />
        <div className="bg-white">{children}</div>
      </div>
    </>
  );
}
