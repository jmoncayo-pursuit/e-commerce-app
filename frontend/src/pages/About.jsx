import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero" style={{
        backgroundImage: 'url(/images/collectiversebackdrop.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        width: '100%',
        position: 'relative',
        marginBottom: '2rem'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '3rem',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>About Collectiverse</h1>
        </div>
      </div>
      <div className="about-content">
        <h1 className="about-title">About Collectiverse</h1>
        <p className="about-description">
          Welcome to Collectiverse, your premier destination for unique and rare collectibles. 
          We are passionate about connecting collectors with exceptional items that tell stories 
          and hold special meaning.
        </p>

        <div className="about-sections">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Collectiverse, we strive to create a vibrant community where collectors can 
              discover, share, and celebrate their passion for unique items. We believe that 
              every collectible has a story to tell, and we're here to help you find the 
              perfect addition to your collection.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <ul>
              <li>Curated selection of high-quality collectibles</li>
              <li>Secure and reliable shopping experience</li>
              <li>Expert authentication and verification</li>
              <li>Dedicated customer support</li>
              <li>Community events and exhibitions</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Authenticity</h3>
                <p>We ensure every item is genuine and verified.</p>
              </div>
              <div className="value-item">
                <h3>Quality</h3>
                <p>We maintain the highest standards in our offerings.</p>
              </div>
              <div className="value-item">
                <h3>Community</h3>
                <p>We foster a supportive environment for collectors.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We continuously evolve to better serve our community.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 