import Link from "next/link";

function TopBar() {

    return (
        <nav>
             <div className="">
          <Link
            href="/"
            className=""
          >
            Qui sommes-nous 
          </Link>
          <Link
            href="/"
            className=""
          >
            Nos avantages
          </Link>
        
            <Link
              href="/"
              className=""
            >
             Nos stations 
            </Link>
         
          <Link
            href="/"
            className=""
          >
           Notre materiel
          </Link>
          <Link
            href="/"
            className=""
          >
            Compte
          </Link>
          <Link
            href="/"
            className=""
          >
            Panier
          </Link>
        </div>
        </nav>
    )
}

export default TopBar; 