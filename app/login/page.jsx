import LoginList from "@/components/auth/LoginList";

export default function Login() {
    return (
        <div className="row justify-content-center">
            <h2 className="text-center">Login / Sign up</h2>
            <div className="col-8 col-lg-3 col-md-4 col-sm-6 col-xs-8 d-flex justify-content-center">
                <LoginList />
            </div>
        </div>
    );
}
