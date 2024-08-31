import { useEffect, useState } from "react";
import './scrollToTopButton.css'
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // console.log(window.scrollY)
    if (window.scrollY > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

  return (
    isVisible && (
      <button className="scroll-to-top-button" onClick={scrollToTop}>
        <span>&#8593;</span>
      </button>
    )
  );
};

export default ScrollToTopButton;
