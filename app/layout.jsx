import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata = {
    title: "MovieBoard",
    description: "A place for all your movie reviews and ratings",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="container">
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
