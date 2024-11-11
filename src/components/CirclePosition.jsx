import React from 'react';

const CirclePosition = ({ index, total, name, onClick, color, parentSize }) => {
  console.log(parentSize);
  const radius = parentSize * 0.40; // Use 35% of the parent size as the radius
  const circleSize = parentSize * 0.17; // Size of each circle, 15% of parent size

  // Calculate position based on radius and total circles
  const startAngle = Math.PI / 2;
  const angle = startAngle + (index * ((2 * Math.PI) / total));
  const left = radius * Math.cos(angle);
  const top = radius * Math.sin(angle);

  return (
    <div
      onClick={onClick}
      className="absolute rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
      style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        backgroundColor: color,
        transform: `translate(-50%, -50%) translate(${left}px, ${top}px)`,
        left: '50%',
        top: '50%',
      }}
    >
      <span className="text-white text-sm font-bold break-words text-center">
        {name || '?'}
      </span>
    </div>
  );
};

export default CirclePosition;