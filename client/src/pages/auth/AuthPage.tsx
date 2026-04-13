import { useParams } from "react-router-dom";
import { AuthView } from "@daveyplate/better-auth-ui";

export default function AuthPage() {
  const { pathname } = useParams();

  return (
    <main className="section-shell flex min-h-[86vh] items-center justify-center p-6">
      <div className="glass-card w-full max-w-md rounded-3xl p-4 sm:p-6">
        <AuthView
          pathname={pathname}
          classNames={{
            base: "bg-black/15 ring ring-white/15 border border-white/10 rounded-2xl",
          }}
        />
      </div>
    </main>
  );
}
