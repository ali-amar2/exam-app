import AuthSidebar from "./_components/auth-sidebar";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <AuthSidebar />
        {children}
      </div>
    </>
  );
}
