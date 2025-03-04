import AuthContext from "@/contexts/AuthContext";
import { LOGOUT } from "@/requetes/queries/auth.queries";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";

function Logout() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const { loading } = useQuery(LOGOUT, {
    onCompleted: () => {
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("email");
      Cookies.remove("role");
      logout();
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
