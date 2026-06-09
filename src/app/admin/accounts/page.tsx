import ContentAccountList from "./(list)/Content-Account-List";
import SetupDataAccountList from "./(list)/setup-data-account-list";

export default function AccountPage() {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SetupDataAccountList />
            <ContentAccountList />
        </div>
    );
}
