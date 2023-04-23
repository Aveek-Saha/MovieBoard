import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;
import Navbar from "@/components/Navbar";
import AuthContext from "@/components/auth/AuthContext";

export const metadata = {
    title: "MovieBoard",
    description: "A place for all your movie reviews and ratings",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="container">
                    <AuthContext>
                        <Navbar />
                        {children}
                    </AuthContext>
                </div>
            </body>
        </html>
    );
}
