import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react'; // Vous n'avez pas besoin d'importer useEffect
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Monsters from '../Monsters/Monsters';

function Filter() {
  const [nom, setNom] = React.useState('');

  const handleChange = (event) => {
    setNom(event.target.value); // Met à jour la valeur de 'nom' avec la nouvelle sélection
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Number</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={nom}
            onChange={handleChange}
            autoWidth
            label="Name"
          >
            <MenuItem value={10}>Name</MenuItem>
            <MenuItem value={21}>Number</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default Filter;