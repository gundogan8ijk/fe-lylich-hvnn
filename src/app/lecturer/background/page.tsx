import ContentBackground from "./Content-Background";
import SetupDataBackground from "./setup-data-background";

export default function BackgroundPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <SetupDataBackground />
            <ContentBackground />
        </div>
    );
}
