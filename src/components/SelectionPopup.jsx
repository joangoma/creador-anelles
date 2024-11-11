import React, { useEffect, useState } from 'react';

const SelectionPopup = ({ availableNames, onSelect, onClose, position }) => {
  const [popupPosition, setPopupPosition] = useState({ x: position.x, y: position.y });
  const popupWidth = 150; // Approximate width of the popup
  const popupHeight = 250; // Approximate height of the popup, adjust as needed

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Initial positioning based on the provided position
    let newX = position.x;
    let newY = position.y;

    // Check for right overflow and adjust to left if necessary
    if (position.x + popupWidth > viewportWidth) {
      newX = position.x - popupWidth - 20; // Adjust 20px for padding
    }

    // Check for bottom overflow and adjust upwards if necessary
    if (position.y + popupHeight > viewportHeight) {
      newY = position.y - popupHeight - 20; // Adjust 20px for padding
    }

    setPopupPosition({ x: newX, y: newY });
  }, [position.x, position.y]);


  return (
    <div
      className="fixed bg-white shadow-lg rounded-lg p-4 z-50"
      style={{
        top: popupPosition.y,
        left: popupPosition.x,
        width: `${popupWidth}px`, // Set width here to match calculation
      }}
    >
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
        {availableNames.length > 0 ? (
          availableNames.map((name) => (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className="px-4 py-2 text-left hover:bg-blue-100 rounded-md"
            >
              {name}
            </button>
          ))
        ) : (
          <p className="text-gray-500 p-2">All members assigned</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="mt-2 px-4 py-2 bg-gray-200 rounded-md w-full hover:bg-gray-300"
      >
        Close
      </button>
    </div>
  );
};

export default SelectionPopup;
