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

function handleUpdatePrice(id, newPrice) {
  fetch(`http://localhost:6001/plants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price: newPrice })
  })
  .then((response) => response.json())
  .then((updatedPlant) => {
      setPlants((prevPlants) =>
        prevPlants.map((plant) => 
      plant.id === id ? { ...plant, price: updatedPlant.price } : plant
      )
    )
  })
  .catch((error) => console.error("Error updating price:", error))
}


function handleDeletePlant(id) {
  fetch(`http://localhost:6001/plants/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      }
    })
    .catch((error) => console.error("Error deleting plant:", error));
}


  const filteredPlants = plants.filter((plant) => 
    plant.name.toLowerCase().includes(SearchTerm.toLowerCase())
  )

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search SearchTerm={SearchTerm} onSearchChange={setSearchTerm}/>
      <PlantList 
      plants={filteredPlants} 
      onToggleSoldOut={handleToggleSoldOut} 
      onUpdatePrice={handleUpdatePrice}
      onDelete={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
