import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar'

function App() {
  const images = ['beach', 'bubbles', 'desert', 'iceberg', 'lake', 'purple', 'space', 'stars', 'vibrant', 'water'];
  const [imageIndex, setImageIndex] = useState(Math.floor(10*Math.random()));

  return (
    <div className="backgroundImage" style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/${images[imageIndex]}.jpg)`,
      backgroundSize: "cover"}}
    >
      <Sidebar images={images} onBackgroundChange={(index) => setImageIndex(index)} />
    </div>
  );
}

export default App;
