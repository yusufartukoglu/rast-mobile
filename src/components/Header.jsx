import Logo from "../assets/Logo.svg";
import Youtube from "../assets/youtubelogo.svg";
import Instagram from "../assets/instalogo.svg";
import Behance from "../assets/behancelogo.svg";
import Linkedin from "../assets/linkedinlogo.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <img className="logo" src={Logo} alt="Rast Mobile Logo" />
      <Nav />
      <div className="social-logos">
        <img className="social-logo" src={Youtube} alt="Youtube Logo" />
        <img className="social-logo" src={Instagram} alt="Instagram Logo" />
        <img className="social-logo" src={Behance} alt="Behance Logo" />
        <img className="social-logo" src={Linkedin} alt="Linkedin Logo" />
      </div>
    </header>
  );
};

export default Header;
