import React, { useState, useEffect } from "react";
import axios from "axios";
import './Arme.css';

function AllArmeApi() {
  const [armeData, setArmeData] = useState({ status: "loading", data: [], error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://botw-compendium.herokuapp.com/api/v2/category/equipment");
        setArmeData({ status: "success", data: response.data.data, error: null });
      } catch (error) {
        setArmeData({ status: "error", data: [], error: error });
        console.error("Une erreur est survenue :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {armeData.data.map((arme, index) => (
        <div key={index}>
          <h3>{arme.name}</h3>
          <img src={arme.image} alt={arme.name} className="Image" />
        </div>
      ))}
    </>
  );
}

export default AllArmeApi;
