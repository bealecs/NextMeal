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
          <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
