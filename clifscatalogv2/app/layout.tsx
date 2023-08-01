import { Navigation } from "./components/Navigation";
import AuthProvider from "./store/SessionProvider";

export const metadata = {
  title: "Next Meal",
  description: "Next Meal Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
