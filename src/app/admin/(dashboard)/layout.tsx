import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const valid = process.env.ADMIN_PASSWORD;

  if (!token || token !== valid) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f5f2ec]">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
