import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <img
  src="/footerLogo.png"
  alt="CollegeSera Logo"
  className="w-[90px] h-[110]" // exact size
/>
    </Link>
  );
};

export default HeaderLogo;
