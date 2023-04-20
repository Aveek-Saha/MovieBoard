import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faDiscord,
    faFacebook,
    faInstagram,
    faGithub,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function LoginList() {
    return (
        <div className="row">
            <button
                type="button"
                className="btn btn-lg btn-outline-dark m-2"
                style={{ color: "#ea4335" }}
            >
                <FontAwesomeIcon icon={faGoogle} /> Google
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark m-2"
                style={{ color: "#5865f2" }}
            >
                <FontAwesomeIcon icon={faDiscord} /> Discord
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark m-2"
                style={{ color: "#1877f2" }}
            >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark m-2"
                style={{ color: "#e1306c" }}
            >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark m-2"
                style={{ color: "white" }}
            >
                <FontAwesomeIcon icon={faGithub} /> Github
            </button>
            <button
                type="button"
                className="btn btn-lg btn-outline-dark m-2"
                style={{ color: "#1da1f2" }}
            >
                <FontAwesomeIcon icon={faTwitter} /> Twitter
            </button>
        </div>
    );
}
