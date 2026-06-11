export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section style={{ background: "#FEF9F2", minHeight: "calc(100vh - 72px)" }}>
      <div
        style={{
          maxWidth: "440px",
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        {children}
      </div>
    </section>
  );
}
