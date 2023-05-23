import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import LoginList from "@/components/auth/LoginList";

export default async function Login() {
    const session = await getServerSession(authOptions);

    return (
        <div className="row justify-content-center">
            {session && <h2 className="text-center">Already logged in</h2>}
            {!session && (
                <>
                    <h2 className="text-center">Login / Sign up</h2>
                    <div className="col-8 col-lg-3 col-md-4 col-sm-6 col-xs-8 d-flex justify-content-center">
                        <LoginList />
                    </div>
                </>
            )}
        </div>
    );
}
