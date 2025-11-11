import Navbar from "@/components/NavBar";

export const metadata = {
  title: "BookStore",
  description: "Next.js Bookstore App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
