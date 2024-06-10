import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { routes } from '@/routes';
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";
interface Payload {
  email: string;
  role: string;
  userId: string;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";


export default async function middleware(request: NextRequest) {
  // console.log('request: ===========>', request)
  const { cookies } = request;
  const token = cookies.get("token");
  // console.log("token in middleware: ", token)
  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(JWT_SECRET_KEY)
  );
  
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {

  const currentRoute = findRouteByPathname(request.nextUrl.pathname);
  // console.log("current ROUTE VAUT: ", currentRoute);
  let response = NextResponse.next();

  if(!token) {
    if (currentRoute && currentRoute.protected !== "PUBLIC") {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    }
    response.cookies.delete("email");
    response.cookies.delete("role");
    response.cookies.delete("userId");
    response = NextResponse.next();

    return response;
  }
  //On delete les cookies existants

  try {
    
    const { email, role, userId } = await verify(token);
    // console.log("request.nextUrl.pathname ==============>", request.nextUrl.pathname.startsWith("/auth/login"));


    if (currentRoute?.protected === "ADMIN" && role !== "ADMIN") {
      response = NextResponse.redirect(new URL("/error", request.url)); // redirige sur la Page error
    }
    
    if (email && role && userId) {
      //On vérifie que le role de l'utilisateur est "ADMIN" pour les routes "ADMIN"

      if (currentRoute?.protected === "ADMIN" && role !== "ADMIN") {
        response = NextResponse.redirect(new URL("/error", request.url)); // Créer une page "Access denied"
      } 


      //On ajoute des cookie avec les infos du user
      response.cookies.set("email", email);
      response.cookies.set("role", role);
      response.cookies.set("userId", userId);

      if (currentRoute?.protected === "ADMIN" && role === "ADMIN") { 
        console.log(request.nextUrl.pathname)
      }

      return response;
    } 
    return NextResponse.redirect(new URL("/auth/login", request.url));
    //penser au cas de figure où il a un token valide, il se rend sur une route admin, mais n'a pas le rôle admin pour y accéder => rediriger vers un "Not Authorized"
    // return NextResponse.redirect(new URL("/auth/login", request.url));
  // } catch (err) {
  //   console.log('%c⧭', 'color: #e50000', err);
  //   console.log("ERROR");
  //   if (request.nextUrl.pathname.startsWith("/auth/login")) {
  //     response = NextResponse.next();
  //   } else {
  //     response = NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  //   response.cookies.delete("token");//suppression du token s'il n'est pas valide (puisque l'on tombe dans le catch)

  //   return response;
  // 
  } catch(err) {
    console.error("Verification echouée", err);
    response = NextResponse.redirect(new URL("/auth/login", request.url));
    //On delete les cookies existants
    response.cookies.delete("token");
    response.cookies.delete("email");
    response.cookies.delete("role");
    response.cookies.delete("id");

    return response;
  }
}

function findRouteByPathname(url: string) {

  if (url === "/") {
    return routes.home;
  }
  // return url;
  const routeKeys = Object.keys(routes).filter((e) => e !== "home");
  for (const key of routeKeys) {
    if (url.includes(routes[key].pathname)) {
      return routes[key];
    }
  }
  return null;
}

// export const config = {
//   matcher: "/:path*",
// };