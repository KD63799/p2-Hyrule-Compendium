import React, { useState } from 'react';
import Favorites from './composants/favorite/Favorites';

function App() {

  const data = [
    { id: 1, name: "Marco" },
    { id: 2, name: "Lincoln" },
    { id: 3, name: "Aya" }
  ];
  
  return (
    <div className="App">
      <Favorites data={data} />
    </div>
  );
}

export default App;