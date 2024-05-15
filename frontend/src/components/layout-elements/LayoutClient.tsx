import TopBar from "./Topbar";

function LayoutClient ({ children }: { children: JSX.Element }){

    return (
        <div>
            <TopBar />
            {children}
        </div>
    )
}

export default LayoutClient; 