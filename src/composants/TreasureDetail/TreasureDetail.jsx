import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './TreasureDetail.css'

function TreasureDetail({favorites, setFavorites}) {
    const { id } = useParams();
    const [Treasure, setTreasure] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/treasure`);
            const data = response.data;
            const selectedTreasure = data.data.find(Treasure => parseInt(Treasure.id) === parseInt(id));
            setTreasure(selectedTreasure);
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddFavorite = (id) => {
        setTreasure(prevCreature => ({ ...prevCreature, favorite: true }));
        const favoriteelement = { ...Treasure, favorite: true };
        setFavorites([...favorites, favoriteelement]);
    };

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(element => element.id !== id);
        setFavorites(updatedFavorites);
        setTreasure(prevCreature => ({ ...prevCreature, favorite: false }));
    };

    return (
        <div>
            {Treasure && (
                <div>
                    <div className='dp-flex al-i j-content p-05 bg-image b-t m-t'>
                    <h2>{Treasure.name}</h2>
                    <NavLink to="/Treasure">
                    <FontAwesomeIcon className='link' icon={faXmark} />
                    </NavLink>
                    </div>

                    <NavLink className={'link'}>
                    <div className='dp-flex j-fl-end p-05'>
                    <li className='color-stats'>{Element.id}</li>
                    <button onClick={() => Treasure.favorite ? handleRemoveFavorite(Treasure.id) : handleAddFavorite(Treasure.id)}>
                                {Treasure.favorite ? (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" />
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-bl" />
                                )}
                            </button>
                    </div>
                    </NavLink>

                    <div className='dp-flex f-direction al-i txt-align'>
                    <img id='col-img' src={Treasure.image} alt={Treasure.name} />
                    <p>{Treasure.description}</p>
                    </div>
                    
                    <div className='txt-align bg-image b-b p-b-5'>
                    <h2>Common Locations</h2>
                    <p>{Treasure.common_locations}</p>
                    <h2>Droppable Items</h2>
                    <p>{Treasure.drops}</p>
                    </div>
                    {/* Affichez les autres détails de la créature ici */}
                </div>
            )}
        </div>
    );
}

export default TreasureDetail;