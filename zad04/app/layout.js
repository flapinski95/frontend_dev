// app/layout.js

import Navigation from "../components/Navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Pokémon App</title>
      </head>
      <body>
        <main style={{ paddingBottom: "60px" }}>{children}</main>
        <Navigation />
      </body>
    </html>
  );
}
