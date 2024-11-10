import React, { useState } from "react";

function PlantCard({ plant, onToggleSoldOut, onUpdatePrice }) {
  const [price, setPrice] = useState(plant.price)
  const [isEditing, setIsEditing] = useState(false)

  function handlePriceChange(e) {
    setPrice(e.target.value)
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    console.log("submitting price")
    onUpdatePrice(plant.id, parseFloat(price))
    setIsEditing(false)
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>

      {isEditing ? (
        <form onSubmit={handlePriceSubmit}>
            <input type="number" step="0.01" value={price} onChange={handlePriceChange}/>
            <button type="submit">Save</button>
        </form>
      ) : (
        <p>
          Price: ${price}{""}
          <button onClick={() => setIsEditing(true)}>Edit Price</button>
        </p>
      )}
      <button className={plant.soldOut ? "" : "primary"}
        onClick={() => onToggleSoldOut(plant.id, !plant.soldOut)}
      >
        {plant.soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
