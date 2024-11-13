import { MenuProvider } from "@/contexts/MenuContext";
import { Toaster } from "@/ui/Toaster";
import Footer from "./Footer";
import TopBar from "./Topbar";

function LayoutClient({ children }: { children: JSX.Element }) {
  return (
    <div>
      <MenuProvider>
        <TopBar />
        {children}
        <Toaster />
        <Footer />
      </MenuProvider>
    </div>
  );
}

export default LayoutClient;
