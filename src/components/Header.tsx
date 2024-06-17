import React ,{useRef , useEffect} from "react";
import myImage from "../images/mainlogo.png";
import { Link } from "react-router-dom";

function Header() {

  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = navbarRef.current;
      if (!navbar) return; // Add a null check

      const isNavbarOpen = navbar.classList.contains("show");
      const isClickInsideNavbar = navbar.contains(event.target as Node); // Ensure target is a Node
      const isNavbarToggler = (event.target as Element).classList.contains("navbar-toggler");

      if (isNavbarOpen && !isClickInsideNavbar && !isNavbarToggler) {
        const toggler = document.querySelector(".navbar-toggler") as HTMLElement;
        toggler?.click();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary  sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={myImage}
              alt="logo"
              height={"70px"}
              width={"250px"}
              className="d-inline-block align-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown" ref={navbarRef}>
            <ul className="navbar-nav nav-underline">
              <li className="nav-item">
                <Link to={"/"} className="a nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addconsumer"} className="a nav-link">
                  Add Consumer
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/maps"} className="nav-link">
                  View Maps
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to={"/searchconsumer"}
                  className=" a nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Search Consumer
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"/searchserviceno"} className="a dropdown-item">
                      Service No
                    </Link>
                  </li>
                  <li>
                    <Link to={"/searchareacode"} className="a dropdown-item">
                      Area Code
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
