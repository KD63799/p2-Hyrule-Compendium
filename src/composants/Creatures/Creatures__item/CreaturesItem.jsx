import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CreaturesItem() {
    const { id } = useParams();
    const [creature, setCreature] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/creatures`);
            const data = response.data;
            const selectedCreature = data.data.food.find(creature => creature.id === id
                );
            setCreature(selectedCreature);
            console.log(selectedCreature);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {creature && (
                <div>
                    <img src={creature.image} alt={creature.name} />
                    <p>{creature.name}</p>
                    {/* Affichez les autres détails de la créature ici */}
                </div>
            )}
        </div>
    );
}

export default CreaturesItem;