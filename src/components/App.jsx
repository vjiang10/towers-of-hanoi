import React, { useState } from 'react';
import '../styles/App.css';
import Sidebar from './Sidebar'

function App() {
  const images = ['beach', 'bubbles', 'desert', 'ice', 'lake', 'mountains', 'purple', 'space', 'stars', 'vibrant'];
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
