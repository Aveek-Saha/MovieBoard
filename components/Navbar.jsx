import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Link from "next/link";

import Logout from "../components/auth/Logout";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary header navbar-dark mb-4 mt-2">
            <div className="container-fluid">
                <Link className="navbar-brand header__title fs-2" href="/">
                    MovieBoard
                </Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" href="/search">
                            Search
                        </Link>
                    </li>
                </ul>

                {session?.user.role === "moderator" && (
                    <span className="badge rounded-pill me-3 bg-danger">
                        Moderator
                    </span>
                )}

                {!session?.user && (
                    <Link className="navbar-text header__item" href="/login">
                        Login
                    </Link>
                )}
                {session?.user && (
                    <span className="navbar-text">
                        <Logout />
                    </span>
                )}
            </div>
        </nav>
    );
}
