import Sidebar from "@/components/sidebar";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col pl-72">
      <Sidebar />
      {props.children}
    </main>
  );
}
