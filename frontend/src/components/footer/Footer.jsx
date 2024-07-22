import { assets } from "../../assets/assets";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="left">
          <div><img src={assets.logo} alt="" /></div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
            labore illum vero id modi velit voluptatem, unde odio accusamus
            eveniet quod amet nesciunt iure, optio et vitae nemo, sapiente
            laborum!
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="center">
            <h2>company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+91-9876543210</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright &copy; 2024 Tomato.com All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
