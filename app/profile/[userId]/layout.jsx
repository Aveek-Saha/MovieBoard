import Profile from "@/components/profile/Profile";

export default async function ProfileLayout({ params, children }) {
    const userId = params.userId;
    return (
        <Profile userId={userId}>
            {children}
        </Profile>
    );
}
