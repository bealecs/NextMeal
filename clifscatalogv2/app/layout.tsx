export const metadata = {
  title: "Clif's Catalog",
  description: "Version 2.0 of Clif's Catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
