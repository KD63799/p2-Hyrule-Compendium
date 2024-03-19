import { useEffect, useState } from "react";
import './carousel.css';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const changeSlide = () => {
      if (!isPaused) {
        document.querySelectorAll('.zoom-container').forEach((container) => {
          container.classList.remove('can-zoom');
        });

        const activeSlide = document.getElementById(`s${currentSlide}`);
        if (activeSlide) {
          activeSlide.checked = true;
        }

        const activeContainer = document.querySelector(`.zoom-container[data-slide="${currentSlide}"]`);
        if (activeContainer) {
          activeContainer.classList.add('can-zoom');
        }

        setCurrentSlide((prevSlide) => (prevSlide % 5) + 1);
      }
    };

    const slideInterval = setInterval(changeSlide, 5000);

    const pauseSlide = () => {
      setIsPaused(true);
    };

    const resumeSlide = () => {
      setIsPaused(false);
    };

    const zoomContainers = document.querySelectorAll('.zoom-container');
    zoomContainers.forEach((container) => {
      container.addEventListener('mouseover', pauseSlide);
      container.addEventListener('mouseout', resumeSlide);
    });

    return () => {
      clearInterval(slideInterval);
      zoomContainers.forEach((container) => {
        container.removeEventListener('mouseover', pauseSlide);
        container.removeEventListener('mouseout', resumeSlide);
      });
    };
  }, [currentSlide, isPaused]);

  return (
    <>
      <section id="slider">
        <input type="radio" name="slider" id="s1" data-slide="1" checked />
        <input type="radio" name="slider" id="s2" data-slide="2" />
        <input type="radio" name="slider" id="s3" data-slide="3" />
        <input type="radio" name="slider" id="s4" data-slide="4" />
        <input type="radio" name="slider" id="s5" data-slide="5" />
        <label htmlFor="s1" id="slide1">
          <div className="zoom-container" data-slide="1">
            <img src="src\assets\images\link.jpg" alt="Image 1" />
          </div>
        </label>
        <label htmlFor="s2" id="slide2">
          <div className="zoom-container" data-slide="2">
            <img src="src\assets\images\linkArrow.jpg" alt="Image 2" />
          </div>
        </label>
        <label htmlFor="s3" id="slide3">
          <div className="zoom-container" data-slide="3">
            <img src="src\assets\images\zeldaLink.png" alt="Image 3" />
          </div>
        </label>
        <label htmlFor="s4" id="slide4">
          <div className="zoom-container" data-slide="4">
            <img src="src\assets\images\zelda.png" alt="Image 4" />
          </div>
        </label>
        <label htmlFor="s5" id="slide5">
          <div className="zoom-container" data-slide="5">
            <img src="src\assets\images\botw.jpg" alt="Image 5" />
          </div>
        </label>
      </section>
    </>
  );
}

export default Carousel;
