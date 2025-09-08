import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Express Your
              <span className="gradient-text"> Unique Style</span>
            </h1>
            <p className="hero-description">
              Discover the latest anime-inspired fashion trends. From casual streetwear to premium collections, find your perfect look.
            </p>
            <div className="hero-buttons">
              <a href="#shop" className="btn btn-primary">
                Shop Collection
              </a>
              <a href="#categories" className="btn btn-outline">
                Explore Categories
              </a>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="floating-card">
              <img 
                src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg" 
                alt="Fashion Model" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero