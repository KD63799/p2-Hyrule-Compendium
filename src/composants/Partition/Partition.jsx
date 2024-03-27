import React, { useState, useEffect } from 'react';

const Partition = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonActivation = (button) => {
    if (selectedButtons.includes(button)) {
      setSelectedButtons((prevSelectedButtons) =>
        prevSelectedButtons.filter((selectedButton) => selectedButton !== button)
      );
    } else {
      setSelectedButtons((prevSelectedButtons) => [...prevSelectedButtons, button]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const pressedButton = event.key.toLowerCase();
      if (['a', 'b', 'c', 'd', 'e'].includes(pressedButton)) {
        handleButtonActivation(pressedButton);
      }
    };

    // Add event listener on component mount
    document.addEventListener('keypress', handleKeyPress);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []); // Empty dependency array for the effect to run only once on mount

  return (
    <div>
      <h1>Partition</h1>
      {/* Display sheet music here */}
      {selectedButtons.includes('a') && <button>A</button>}
      {selectedButtons.includes('b') && <button>B</button>}
      {selectedButtons.includes('c') && <button>C</button>}
      {selectedButtons.includes('d') && <button>D</button>}
      {selectedButtons.includes('e') && <button>E</button>}
    </div>
  );
};

export default Partition;