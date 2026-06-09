import ContentAccountList from "./(list)/Content-Account-List";
import SetupDataAccountList from "./(list)/setup-data-account-list";

export default function AccountPage() {
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SetupDataAccountList />
            <ContentAccountList />
        </div>
    );
}
