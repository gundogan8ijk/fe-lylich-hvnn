"use client";

import SetupDataActivities from "./(home)/(activities)/setup-data-activities";
import ContentActivities from "./(home)/(activities)/Content-Activities";
import SetupDataAwards from "./(home)/(awards)/setup-data-awards";
import ContentAwards from "./(home)/(awards)/Content-Awards";

export default function HomePage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <SetupDataActivities />
            <SetupDataAwards />
            <div className="w-full py-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-4 flex flex-col">
                        <ContentActivities />
                    </div>
                    <div className="lg:col-span-1 flex flex-col">
                        <ContentAwards />
                    </div>
                </div>
            </div>
        </main>
    );
}