import React from 'react'
import {NavLink} from 'react-router-dom'
import AOS from 'aos'

AOS.init();

export default function Navbar({crrUser , clrUser}) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark top-0 w-100">
        <div className="container-fluid">
          <NavLink data-aos="fade-right" className="navbar-brand" to="rp">
            Noxe
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {crrUser ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="nav-item"
                >
                  <NavLink className="nav-link" aria-current="page" to="home">
                    Home
                  </NavLink>
                </li>
                <li
                  data-aos="fade-down"
                  data-aos-duration="1500"
                  className="nav-item"
                >
                  <NavLink className="nav-link" aria-current="page" to="movies">
                    Movies
                  </NavLink>
                </li>
                <li
                  data-aos="fade-down"
                  data-aos-duration="2000"
                  className="nav-item"
                >
                  <NavLink className="nav-link" aria-current="page" to="tv">
                    Tv Show
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-white d-flex justify-content-center align-items-center overflow-hidden">
              <li
                data-aos="fade-down"
                data-aos-duration="1000"
                className="nav-item mx-2"
              >
                <a href="https://www.facebook.com/elmasry966" target="_blank">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li
                data-aos="fade-down"
                data-aos-duration="1500"
                className="nav-item mx-2"
              >
                <a href="https://www.instagram.com/eelmasry960" target="_blank">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li
                data-aos="fade-down"
                data-aos-duration="2000"
                className="nav-item mx-2"
              >
                <a
                  href="https://www.linkedin.com/in/eslam-elmasry-9b91b2185/"
                  target="_blank"
                >
                  <i class="fa-brands fa-linkedin"></i>
                </a>
              </li>
              {crrUser ? (
                <li className="nav-item">
                  <span
                    onClick={clrUser}
                    className="nav-link logout"
                    aria-current="page"
                    to="home"
                  >
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li
                    data-aos="fade-left"
                    data-aos-duration="3000"
                    className="nav-item"
                  >
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li
                    data-aos="fade-left"
                    data-aos-duration="3000"
                    className="nav-item"
                  >
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
