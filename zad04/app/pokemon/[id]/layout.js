// app/pokemon/layout.js
export default function PokemonLayout({ children }) {
  return (
    <section style={{ border: "2px solid green", padding: "10px" }}>
      <h2>Layout dla podstron Pokemon</h2>
      {children}
    </section>
  );
}
