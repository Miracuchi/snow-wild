import { useState, } from "react";
import { createContext } from "react";

type UserType = {
  email: string | undefined,
  userId:  string | undefined,
  role:  string | undefined,
}

export const AuthContext = createContext<{
  user: UserType | null,
  setAuthUser: ({ userId , email, role} : {userId: string, email: string, role: string }) => void,
  logout: () =>  void
  authReady: boolean
}>({
  user: null,
  setAuthUser: () => {},
  logout: () =>  {},
  authReady: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [authReady, setAuthready] = useState<boolean>(false)
  const setAuthUser = ({ userId, role, email} : {userId: string, email: string, role: string }) => {
    setUser({
      userId,
      role,
      email
    })
  }

  const logout = () =>{
    setUser(null)
  }



  return (
    <AuthContext.Provider value={{ user, setAuthUser, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};