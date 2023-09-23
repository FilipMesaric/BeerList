import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./BeerList.css";

Modal.setAppElement("#root");

const BeerList = () => {
  const [beers, setBeers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBeer, setSelectedBeer] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.punkapi.com/v2/beers");
        const newBeers = response.data;
        setBeers(newBeers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchBeers();
  }, []);

  const sortedBeers = beers
    .filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const openModal = (beer) => {
    setSelectedBeer(beer);
  };

  const closeModal = () => {
    setSelectedBeer(null);
  };

  return (
    <div>
      <h1>Lista Piva</h1>
      <input
        class="btinput"
        type="text"
        placeholder="Pretraži piva po imenu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Učitavanje...</p>
      ) : (
        <ul>
          {sortedBeers.map((beer) => (
            <li class="libeerlist" key={beer.id}>
              <img
                src={beer.image_url}
                alt={beer.name}
                onClick={() => openModal(beer)}
              />
              <h2>{beer.name}</h2>
              <p>{beer.tagline}</p>
            </li>
          ))}
        </ul>
      )}
      <Modal isOpen={selectedBeer !== null} onRequestClose={closeModal}>
        {selectedBeer && (
          <div className="modal">
            <img src={selectedBeer.image_url} alt={selectedBeer.name} />
            <h2>{selectedBeer.name}</h2>
            <p>{selectedBeer.tagline}</p>
            <p>{selectedBeer.description}</p>
            <h3>Fermentacion</h3>
            <p>
              Temperature: {selectedBeer.method?.fermentation?.temp?.value}°C
            </p>{" "}
            <p>
              <p>Time: {selectedBeer.method?.fermentation?.temp?.duration} </p>{" "}
            </p>
            <h3>Ingredients</h3>
            <ul>
              {selectedBeer.ingredients.malt.map((malt, index) => (
                <li key={index}>
                  {malt.name}: {malt.amount.value} {malt.amount.unit}
                </li>
              ))}
              {selectedBeer.ingredients.hops.map((hops, index) => (
                <li key={index}>
                  {hops.name}: {hops.amount.value} {hops.amount.unit}
                </li>
              ))}
            </ul>
            <h3>Amount</h3>
            <p>Value: {selectedBeer.amount?.value}</p>
            <p>Unit: {selectedBeer.amount?.unit}</p> <h3>Food Pairing</h3>
            <ul>
              {selectedBeer.food_pairing.map((pairing, index) => (
                <li key={index}>{pairing}</li>
              ))}
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BeerList;
