import RequireAuth from "@/components/RequireAuth";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <h1>Welcome to Dashboard ✅</h1>
    </RequireAuth>
  );
}
