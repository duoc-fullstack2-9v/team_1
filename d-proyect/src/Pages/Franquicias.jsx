import React from "react";
import Hero from "../Components/Franquicias/Hero.jsx";
import StepsGrid from "../Components/Franquicias/StepsGrid.jsx";
import Investments from "../Components/Franquicias/Investments.jsx";
import "../Styles/Franquicias.css";


export default function Franquicias() {
  return (
    <div className="franquicia-container">
      <Hero />
      <StepsGrid />
      <Investments />
    </div>
  );
}



