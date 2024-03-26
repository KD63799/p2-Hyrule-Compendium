import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function CreaturesItem() {
    const { id } = useParams();
    const [creature, setCreature] = useState([]);

    useEffect(() => {
        if (fetchData() === true) {
            fetchData();
        }

        if (fetchDataMonster() === true) {
            fetchDataMonster();
        }
    }, [id]);

    async function fetchData() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/creatures`);
            const data = response.data;
            const selectedCreature = data.data.food.find(creature => parseInt(creature.id) === parseInt(id));
            setCreature(selectedCreature);
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchDataMonster() {
        try {
            const response = await axios.get(`https://botw-compendium.herokuapp.com/api/v2/category/monsters`);
            const data = response.data;
            const selectedCreature = data.data.find(creature => parseInt(creature.id) === parseInt(id));
            setCreature(selectedCreature);
            console.log(id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {creature && (
                <div>
                    <div className='dp-flex al-i j-content p-05 bg-image b-t'>
                        <h2>{creature.name}</h2>
                        <NavLink to="/Creatures">
                            <FontAwesomeIcon className='link' icon={faXmark} />
                        </NavLink>
                    </div>

                    <NavLink className={'link'}>
                        <div className='dp-flex j-fl-end p-05'>
                            <FontAwesomeIcon className='link' icon={faHeart} />
                        </div>
                    </NavLink>

                    <div className='dp-flex f-direction al-i txt-align'>
                        <img id='col-img' src={creature.image} alt={creature.name} />
                        <p>{creature.description}</p>
                    </div>

                    <div className='txt-align bg-image b-b p-b-5'>
                        <h2>Common Locations</h2>
                        <p>{creature.common_locations}</p>
                        <h2>Cooking Effect</h2>
                    </div>
                    {/* Affichez les autres détails de la créature ici */}
                </div>
            )}
        </div>
    );
}

export default CreaturesItem;
