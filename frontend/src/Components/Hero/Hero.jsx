import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow_icon.svg';
import hero_image from '../Assets/hero_image1.png';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2> New Season, New You</h2>
        <div className="hero-hand-icon">
          <p>new</p>
          <img src={hand_icon} alt="hand-icon" />
        </div>
        <p>Style Starts Here </p>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow-icon" />
        </div>
      </div>
      <div className="hero-right">
    <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
