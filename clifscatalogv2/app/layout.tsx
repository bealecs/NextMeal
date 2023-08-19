import AuthProvider from "./store/SessionProvider";
import ThemeContextProvider from "./store/ThemeProvider";

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
        {/* <ThemeContextProvider> */}
          <AuthProvider>{children}</AuthProvider>
        {/* </ThemeContextProvider> */}
      </body>
    </html>
  );
}
