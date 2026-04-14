import React, { useState } from "react";
import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { dark } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue.trim());
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? "bg-gray-950" : "bg-slate-50"}`}>
      <Nav
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      />
      <HeroSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
      />
      <div className="flex-1">
        <Body searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
}
