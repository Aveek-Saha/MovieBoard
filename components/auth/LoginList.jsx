"use client";

import { signIn } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faDiscord,
    faGithub,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function LoginList() {
    return (
        <div className="row">
            <button
                type="button"
                className="btn btn-lg btn-outline-dark mb-2 mt-2"
                style={{ color: "#ea4335" }}
                onClick={() => signIn("google")}
            >
                <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark mb-2 mt-2"
                style={{ color: "#5865f2" }}
                onClick={() => signIn("discord")}
            >
                <FontAwesomeIcon icon={faDiscord} /> Discord
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark mb-2 mt-2"
                style={{ color: "white" }}
                onClick={() => signIn("github")}
            >
                <FontAwesomeIcon icon={faGithub} /> Github
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark mb-2 mt-2"
                style={{ color: "#1da1f2" }}
                onClick={() => signIn("twitter")}
            >
                <FontAwesomeIcon icon={faTwitter} /> Twitter
            </button>
        </div>
    );
}
