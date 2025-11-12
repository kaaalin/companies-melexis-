export const metadata = {
  title: "AI Sales Scout — Preview",
  description: "Interactive preview of the Sales Scout UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">{children}</body>
    </html>
  );
}