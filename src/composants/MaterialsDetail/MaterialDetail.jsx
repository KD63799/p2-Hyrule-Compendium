import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './MaterialDetail.css'

function MaterialDetail({favorites, setFavorites}) {
    const { id } = useParams();
    const [Material, setMaterial] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/materials`);
            const data = response.data;
            const selectedMaterial = data.data.find(Material => parseInt(Material.id) === parseInt(id));
            setMaterial(selectedMaterial);
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddFavorite = (id) => {
        setMaterial(prevCreature => ({ ...prevCreature, favorite: true }));
        const favoriteelement = { ...Material, favorite: true };
        setFavorites([...favorites, favoriteelement]);
    };

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(element => element.id !== id);
        setFavorites(updatedFavorites);
        setMaterial(prevCreature => ({ ...prevCreature, favorite: false }));
    };

    return (
        <div>
            {Material && (
                <div>
                    <div className='dp-flex al-i j-content p-05 bg-image b-t m-t'>
                    <h2>{Material.name}</h2>
                    <NavLink to="/Materials">
                    <FontAwesomeIcon className='link' icon={faXmark} />
                    </NavLink>
                    </div>

                    <NavLink className={'link'}>
                    <div className='dp-flex j-fl-end p-05'>
                    <li className='color-stats'>{Element.id}</li>
                    <button onClick={() => Material.favorite ? handleRemoveFavorite(Material.id) : handleAddFavorite(Material.id)}>
                                {Material.favorite ? (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-red" />
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} className="heart-favorite-bl" />
                                )}
                            </button>
                    </div>
                    </NavLink>

                    <div className='dp-flex f-direction al-i txt-align'>
                    <img id='col-img' src={Material.image} alt={Material.name} />
                    <p>{Material.description}</p>
                    </div>
                    
                    <div className='txt-align bg-image b-b p-b-5'>
                    <h2>Common Locations</h2>
                    <p>{Material.common_locations}</p>
                    <h2>Cooking Effect</h2>
                    <p>{Material.cooking_effect}</p>
                    </div>
                    {/* Affichez les autres détails de la créature ici */}
                </div>
            )}
        </div>
    );
}

export default MaterialDetail;