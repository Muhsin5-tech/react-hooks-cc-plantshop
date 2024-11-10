import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleSoldOut, onUpdatePrice }) {
  return (
    <ul className="cards">
    {plants.map((plant) => (
      <PlantCard key={plant.id} 
      plant={plant} 
      onToggleSoldOut={onToggleSoldOut}
      onUpdatePrice={onUpdatePrice}
      />
    ))}
    </ul>
  );
}

export default PlantList;
