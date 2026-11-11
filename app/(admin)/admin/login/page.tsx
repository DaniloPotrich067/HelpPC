import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/admin-auth";
import LoginForm from "../_components/LoginForm";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="flex justify-center pt-16">
      <LoginForm />
    </div>
  );
}
