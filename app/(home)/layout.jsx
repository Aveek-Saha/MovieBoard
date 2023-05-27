import HomeTabs from "@/components/home/HomeTabs";

export default function HomeLayout({ children }) {
    return (
        <div>
            <HomeTabs />
            <div className="row">{children}</div>
        </div>
    );
}
