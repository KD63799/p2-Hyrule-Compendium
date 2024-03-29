import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './MonstersDetail.css'

function MonstersDetail({favorites, setFavorites}) {
    const { id } = useParams();
    const [Monster, setMonster] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/monsters`);
            const data = response.data;
            const selectedMonster = data.data.find(Monster => parseInt(Monster.id) === parseInt(id));
            setMonster(selectedMonster);
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddFavorite = (id) => {
        setMonster(prevCreature => ({ ...prevCreature, favorite: true }));
        const favoriteelement = { ...Monster, favorite: true };
        setFavorites([...favorites, favoriteelement]);
    };

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(element => element.id !== id);
        setFavorites(updatedFavorites);
        setMonster(prevCreature => ({ ...prevCreature, favorite: false }));
    };

    return (
        <div>
            {Monster && (
                <div>
                    <div className='dp-flex al-i j-content p-05 bg-image b-t m-t'>
                    <h2>{Monster.name}</h2>
                    <NavLink to="/Monsters">
                    <FontAwesomeIcon className='link' icon={faXmark} />
                    </NavLink>
                    </div>

                    <NavLink className={'link'}>
                    <div className='dp-flex j-fl-end p-05'>
                    <li className='color-stats'>{Element.id}</li>
                    <button onClick={() => Monster.favorite ? handleRemoveFavorite(Monster.id) : handleAddFavorite(Monster.id)}>
                                {Monster.favorite ? (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" />
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-bl" />
                                )}
                            </button>
                    </div>
                    </NavLink>

                    <div className='dp-flex f-direction al-i txt-align'>
                    <img id='col-img' src={Monster.image} alt={Monster.name} />
                    <p>{Monster.description}</p>
                    </div>
                    
                    <div className='txt-align bg-image b-b p-b-5'>
                    <h2>Common Locations</h2>
                    <p>{Monster.common_locations}</p>
                    <h2>Droppable Items</h2>
                    <p>{Monster.drops}</p>
                    </div>
                    {/* Affichez les autres détails de la créature ici */}
                </div>
            )}
        </div>
    );
}

export default MonstersDetail;