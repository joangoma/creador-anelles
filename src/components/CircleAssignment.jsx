import React, { useState, useEffect, useRef } from 'react';
import CirclePosition from './CirclePosition';
import SelectionPopup from './SelectionPopup';
import { useParams, useNavigate } from 'react-router-dom';
import { TEAMS } from '../data/constants';

const CircleAssignment = () => {
  const { teamId, configId } = useParams();
  const navigate = useNavigate();

  const team = TEAMS[teamId];
  const config = team?.configurations[configId];

  const containerRef = useRef(null);
  const [parentSize, setParentSize] = useState(0);

  // At the top of CircleAssignment component, with other useState declarations
  const [currentSize, setCurrentSize] = useState(config.size);

  // Update `parentSize` based on the container's current size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setParentSize(containerRef.current.offsetWidth); // Get width dynamically
      }
    };

    // Initial size setup
    updateSize();

    // Update size on window resize
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  if (!team || !config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl text-red-500">Configuration not found</h1>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Load assignments from localStorage if available
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem(`assignments-${teamId}-${configId}`);
    return saved ? JSON.parse(saved) : Array(config.size).fill(null);
  });

  const [selectedCircle, setSelectedCircle] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`assignments-${teamId}-${configId}`, JSON.stringify(assignments));
  }, [assignments, teamId, configId]);

  const getAvailableNames = () => {
    return config.members.filter(name => !assignments.includes(name));
  };

  const handleCircleClick = (index, event) => {
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({
      x: rect.left,
      y: rect.top + window.scrollY,
    });
    setSelectedCircle(index);
  };

  const handleNameSelect = (name) => {
    if (selectedCircle !== null) {
      const newAssignments = [...assignments];
      newAssignments[selectedCircle] = name;
      setAssignments(newAssignments);
    }
    setSelectedCircle(null);
  };

  const applyPreset = (presetNames) => {
    const newAssignments = Array(currentSize).fill(null);
    presetNames.forEach((name, index) => {
      if (index < currentSize) {
        newAssignments[index] = name;
      }
    });
    setAssignments(newAssignments);
  };

  const resetAssignments = () => {
    setAssignments(Array(currentSize).fill(null));
  };



  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Torna enrere
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold">{teamId}</h1>
            <h2 className="text-xl text-gray-600">{configId}</h2>
          </div>
        </div>


        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(config.presets).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {name}
            </button>
          ))}
          <button
            onClick={resetAssignments}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reset
          </button>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Mida de l'anella: </label>
            <input
              type="number"
              min="1"
              max="12"  // or any reasonable maximum
              value={currentSize}
              onChange={(e) => {
                const newSize = parseInt(e.target.value) || team.size;
                setCurrentSize(newSize > 12 ? 12 : newSize);
                // Resize the assignments array, preserving existing assignments
                const newAssignments = Array(newSize).fill(null).map((_, i) =>
                  assignments[i] || null
                );
                setAssignments(newAssignments);
              }}
              className="w-20 px-2 py-1 border rounded-md"
            />
          </div>

        </div>

        <div className="text-sm text-gray-600 text-center">
          Available Members: {getAvailableNames().length} / {config.members.length}
        </div>
      </div>

      <div ref={containerRef} className="relative w-[90vw] h-[90vw] max-w-[400px] max-h-[400px] bg-white rounded-full shadow-lg my-4">
        {Array(currentSize).fill(null).map((_, index) => (
          <CirclePosition
            key={index}
            index={index}
            total={currentSize}
            name={assignments[index]}
            onClick={(e) => handleCircleClick(index, e)}
            color={assignments[index] ? (index % 2 == 0 ? '#106dc9' : '#189ec7') : '#9CA3AF'}
            parentSize={parentSize} // Pass in the max size for reference
          />
        ))}
      </div>


      {selectedCircle !== null && (
        <SelectionPopup
          availableNames={getAvailableNames()}
          onSelect={handleNameSelect}
          onClose={() => setSelectedCircle(null)}
          position={popupPosition}
        />
      )}
    </div>
  );
};

export default CircleAssignment;