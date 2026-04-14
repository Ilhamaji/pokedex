import React, { useState } from "react";
import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import FilterBar from "../components/FilterBar";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterGen, setFilterGen] = useState("All");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterMetaOnly, setFilterMetaOnly] = useState(false);
  const { dark } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue.trim());
    // reset filters when searching
    if (inputValue.trim()) {
      setFilterType("All");
      setFilterGen("All");
      setFilterRegion("All");
      setFilterMetaOnly(false);
    }
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
        <Body 
          searchTerm={searchTerm} 
          filterType={filterType} 
          setFilterType={setFilterType}
          filterGen={filterGen} 
          setFilterGen={setFilterGen}
          filterRegion={filterRegion}
          setFilterRegion={setFilterRegion}
          filterMetaOnly={filterMetaOnly} 
          setFilterMetaOnly={setFilterMetaOnly}
        />
      </div>
      <Footer />
    </div>
  );
}
