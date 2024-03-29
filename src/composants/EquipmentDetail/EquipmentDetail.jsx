import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './EquipmentDetail.css'

function EquipmentDetail({favorites, setFavorites}) {
    const { id } = useParams();
    const [Equipment, setEquipment] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/equipment`);
            const data = response.data;
            const selectedEquipment = data.data.find(Equipment => parseInt(Equipment.id) === parseInt(id));
            setEquipment(selectedEquipment);
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddFavorite = (id) => {
        setEquipment(prevCreature => ({ ...prevCreature, favorite: true }));
        const favoriteelement = { ...Equipment, favorite: true };
        setFavorites([...favorites, favoriteelement]);
    };

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(element => element.id !== id);
        setFavorites(updatedFavorites);
        setEquipment(prevCreature => ({ ...prevCreature, favorite: false }));
    };

    return (
        <div>
            {Equipment && (
                <div>
                    <div className='dp-flex al-i j-content p-05 bg-image b-t m-t'>
                    <h2>{Equipment.name}</h2>
                    <NavLink to="/Equipment">
                    <FontAwesomeIcon className='link' icon={faXmark} />
                    </NavLink>
                    </div>

                    <NavLink className={'link'}>
                    <div className='dp-flex j-fl-end p-05'>
                    <li className='color-stats'>{Element.id}</li>
                    <button onClick={() => Equipment.favorite ? handleRemoveFavorite(Equipment.id) : handleAddFavorite(Equipment.id)}>
                                {Equipment.favorite ? (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" />
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-bl" />
                                )}
                            </button>
                    </div>
                    </NavLink>

                    <div className='dp-flex f-direction al-i txt-align'>
                    <img id='col-img' src={Equipment.image} alt={Equipment.name} />
                    <p>{Equipment.description}</p>
                    </div>
                    
                    <div className='txt-align bg-image b-b p-b-5'>
                    <h2>Common Locations</h2>
                    <p>{Equipment.common_locations}</p>
                    <h2>Attack Power</h2>
                    <p>{Equipment.attack}</p>
                    </div>
                    {/* Affichez les autres détails de la créature ici */}
                </div>
            )}
        </div>
    );
}

export default EquipmentDetail;