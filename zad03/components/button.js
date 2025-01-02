"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "../app/page.module.css";

const Button = ({ onClick, url, children }) => {
  const router = useRouter(); // Inicjalizacja routera Next.js

  const handleClick = () => {
    if (onClick) onClick(); // Wywołanie funkcji `onClick`, jeśli została przekazana
    if (url) router.push(url); // Nawigacja do `url` za pomocą routera Next.js
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      {children || "Click me"} {/* Treść przycisku */}
    </button>
  );
};

export default Button;
