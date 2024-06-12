"use client";

const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-1 overflow-y-auto items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome To Med Track
          </h3>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
