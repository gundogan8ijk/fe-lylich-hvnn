"use client";

import SetupDataActivities from "./(home)/(activities)/setup-data-activities";
import ContentActivities from "./(home)/(activities)/Content-Activities";
import SetupDataAwards from "./(home)/(awards)/setup-data-awards";
import ContentAwards from "./(home)/(awards)/Content-Awards";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8">
            <SetupDataActivities />
            <SetupDataAwards />
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                    <div className="lg:col-span-4 h-[60vh] lg:h-full">
                        <ContentActivities />
                    </div>
                    <div className="lg:col-span-1 h-[40vh] lg:h-full">
                        <ContentAwards />
                    </div>
                </div>
            </div>
        </div>
    );
}