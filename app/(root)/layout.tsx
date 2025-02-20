export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-0h-screen flex items-center justify-center">
      <div>{children}</div>
    </main>
  );
}
