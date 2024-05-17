import Footer from "./Footer";
import TopBar from "./Topbar";

function LayoutClient ({ children }: { children: JSX.Element }){

    return (
        <div>
            <TopBar />
            {children}
            <Footer />
        </div>
    )
}

export default LayoutClient; 