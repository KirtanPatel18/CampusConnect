import { Header } from "./header";
import { Footer } from "./footer";

export const AppLayout = ({ children }) => {
    
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};
