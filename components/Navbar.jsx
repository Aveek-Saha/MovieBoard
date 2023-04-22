import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

// import Login from "../components/auth/Login";
// import Logout from "../components/auth/Logout";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary header navbar-dark mb-4 mt-2">
            <div className="container-fluid">
                <a className="navbar-brand header__title fs-2" href="/">
                    MovieBoard
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            aria-current="page"
                            href="/"
                        >
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/search">
                            Search
                        </a>
                    </li>
                </ul>
                <a className="navbar-text header__item" href="/user/login">
                    Login
                </a>
            </div>
        </nav>
    );
}
