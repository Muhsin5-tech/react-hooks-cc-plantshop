import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then((response) => response.json())
    .then((data) => setPlants(data))
  }, []);


function handleAddPlant(newPlant) {
  setPlants([...plants, newPlant])
}

function handleToggleSoldOut(id, soldOut) {
  fetch(`http://localhost:6001/plants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ soldOut }),
  })
  .then((response) => response.json())
  .then((updatedPlant) => {
    const updatedPlants = plants.map((plant) =>
    plant.id === id ? {...plant, soldOut: updatedPlant.soldOut } : plant
    )
    setPlants(updatedPlants)
  })
}

  const filteredPlants = plants.filter((plant) => 
    plant.name.toLowerCase().includes(SearchTerm.toLowerCase())
  )

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search SearchTerm={SearchTerm} onSearchChange={setSearchTerm}/>
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
