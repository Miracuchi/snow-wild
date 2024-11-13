import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/router";

export default function UserAuth({ className }: { className: string }) {
  const router = useRouter();
  const goToLogin = () => {
    router.push("/auth/login");
  };
  return (
    <button onClick={goToLogin} className={cn(className)}>
      <UserIcon />
    </button>
  );
}
