// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../pages/api/auth/[...nextauth]";

// import Login from "../components/auth/Login";
// import Logout from "../components/auth/Logout";

export default async function Navbar() {
    // const session = await getServerSession(authOptions);
    return (
        <div className="row">
            <header className="header mt-5 mb-4">
                <h1 className="header__title">MovieBoard</h1>
                {/* <p className="header__item">
                    {!session?.user && <Login />}
                    {session?.user && <Logout />}
                </p> */}
            </header>
        </div>
    );
}
