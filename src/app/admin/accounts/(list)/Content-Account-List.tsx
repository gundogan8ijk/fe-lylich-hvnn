import AccountHeader from "./account-header";
import AccountPagination from "./account-pagination";
import AccountTable from "./account-table";

export default function ContentAccountList() {
    return (
        <div className="space-y-6">
            <AccountHeader />
            <AccountTable />
            <AccountPagination />
        </div>
    );
}
