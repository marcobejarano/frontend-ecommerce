import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import CartProvider from "./providers/cart-provider";

export default function App() {
  return (
    <Router
      root={props => (
        <CartProvider>
          <MetaProvider>
            <Title>SolidStart - Basic</Title>
            <NavBar />
            <Suspense>{props.children}</Suspense>
            <Footer />
          </MetaProvider>
        </CartProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
