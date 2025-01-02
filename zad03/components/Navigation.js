// components/Navigation.js

import Link from "next/link";
import styles from "../app/page.module.css";
import Button from "@/components/button";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Button url="/">Home</Button>
        </li>
        {/* <li>
          <Button url="/pokemon">Pokemon</Button>
        </li> */}
        <li>
          <Button url="/favourites">Favourites</Button>
        </li>
      </ul>
    </nav>
  );
}
