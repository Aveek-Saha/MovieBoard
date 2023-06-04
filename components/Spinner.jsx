export default function Spinner() {
    return (
        <div className="row">
            <div className="col text-center">
                <div
                    className="spinner-border m-5"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}
