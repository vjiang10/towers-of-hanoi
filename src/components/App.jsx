import React, { useState } from "react";
import "../styles/App.css";
import Sidebar from "./Sidebar"

function App() {
  const images = ['beach', 'bubbles', 'desert', 'ice', 'lake', 'mountains', 'purple', 'space', 'stars', 'vibrant'];
  const [image, setImage] = useState(Math.floor(10*Math.random()));

  return (
    <div className="background" style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/${images[image]}.jpg)`,
      backgroundSize: "cover"}}>
      <div className="sidebar"> 
        <Sidebar images={images} onBackgroundChange={(index) => setImage(index)} />
      </div>
    </div>
  );
}

export default App;