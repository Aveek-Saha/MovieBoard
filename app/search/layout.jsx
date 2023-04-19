"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [text, setText] = useState("");

    const searchMovies = (event) => {
        if (event.key === "Enter") {
            setText("");
            router.push(`/search/${event.target.value}`);
        }
    };
    return (
        <>
            <div className="row sticky-top">
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control search"
                        placeholder="Search movies"
                        value={text}
                        onKeyDown={searchMovies}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </div>

            {children}
        </>
    );
}
