import { LOGOUT } from "@/requetes/queries/auth.queries";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

function Logout() {
  const router = useRouter();
  const { loading } = useQuery(LOGOUT, {
    onCompleted: () => {
      router.push("/auth/login");
    },
  });
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {loading ? "Veuillez patienter..." : "Vous êtes déconnectés!"}
    </main>
  );
}

export default Logout;