import { useState } from "react";
// import NewReworkFullLogo from "../../assets/icons/NewReworkFullLogo";
import Button from "@mui/material/Button";
// import DownArrowIcon from "../../assets/icons/DownArrowIcon";
// import MenuIcon from "@mui/icons-material/Menu";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./Header.scss";

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDropdown = (event, dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveDropdown(null);
  };

  return (
    <section className="lading_header">
      <div className="version">
        <p>
          The wait is over! Experience the website’s remarkable upgrade,
          <span>&nbsp; Version 2.0</span>
        </p>
      </div>
      <div className="container">
        <div className="inner_lading_header">
          <div className="logo">{/* <NewReworkFullLogo /> */}</div>
          <div className="lading_header_right">
            <button
              className="menu_icon"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              {/* <MenuIcon /> */}
            </button>
            <div
              className={`lading_header_right_inner ${
                menuVisible ? "menu_active" : ""
              }`}
            >
              <nav className="navigation">
                <ul>
                  <li>
                    <a href="# " onClick={(event) => handleDropdown(event, "solutions")}>
                      Solutions
                      {/* <DownArrowIcon /> */}
                    </a>
                    {activeDropdown === "solutions" && (
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "MenuItem",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <a href="/">Startup Page</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/">Product Enterprises</a>
                        </MenuItem><MenuItem onClick={handleClose}>
                          <a href="/">IT Services</a>
                        </MenuItem><MenuItem onClick={handleClose}>
                          <a href="/">IT Staffing</a>
                        </MenuItem>
                      </Menu>

                    )}
                  </li>
                  <li>
                    <a href="# " onClick={(event) => handleDropdown(event, "products")}>
                      Products
                      {/* <DownArrowIcon /> */}
                    </a>
   
                    {activeDropdown === "products" && (
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "MenuItem",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <a href="/">AI Interview</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/">JD Wizard</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/">Candidate Screening suite</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/">Data Insights Dashboard</a>
                        </MenuItem>
                      </Menu>
                    )}
                  </li>
                  <li>
                    <a href="# " onClick={(event) => handleDropdown(event, "resources")}>
                      Resources
                      {/* <DownArrowIcon /> */}
                    </a>
                    {activeDropdown === "resources" && (
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "MenuItem",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <a href="/resources">Blogs</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/resources-webinar">Webinar</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/resources-customer-stories">Customer Stories</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/resources-customer-aiethics">AI Ethics</a>
                        </MenuItem>
                      </Menu>
                    )}
                  </li>
                  <li>
                    <a href="# " onClick={(event) => handleDropdown(event, "integration")}>
                      Integration
                      {/* <DownArrowIcon /> */}
                    </a>
                    {activeDropdown === "integration" && (
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "MenuItem",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <a href="/integration-api">API Documentation</a>
                        </MenuItem>
                      </Menu>
                    )}
                  </li>
                  <li>
                    <a href="# " onClick={(event) => handleDropdown(event, "company")}>
                      Company
                      {/* <DownArrowIcon /> */}
                    </a>
                    {activeDropdown === "company" && (
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "MenuItem",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <a href="/company-about-us">About Us</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/company-contact-us">Contact Us</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <a href="/company-invest-in-us">Invest in us</a>
                        </MenuItem>
                      </Menu>
                    )}
                  </li>
                </ul>
              </nav>
              <div className="header_btn">
                <a href="https://app.rework.club/login">
                  <Button
                    variant="outlined"
                    sx={{
                      border: "solid 1px #5C27C0",
                      color: "#fff",
                      borderRadius: "2px",
                      width: "72px",
                      height: "34px",
                      background: "#5C27C0",
                      fontSize: "12px !important",
                      textTransform: "none !important",
                      fontWeight: "400 !important",

                      "&:hover": {
                        background: "#fff",
                        color: "#5C27C0",
                        border: "solid 1px #5C27C0",
                      },
                    }}
                  >
                    Login
                  </Button>
                </a>
                <Button
                  variant="outlined"
                  sx={{
                    border: "solid 1px #5C27C0",
                    color: "#fff",
                    borderRadius: "2px",
                    width: "150px",
                    height: "34px",
                    background: "#5C27C0",
                    fontSize: "12px !important",
                    textTransform: "none !important",
                    fontWeight: "400 !important",

                    "&:hover": {
                      background: "#fff",
                      color: "#5C27C0",
                      border: "solid 1px #5C27C0",
                    },
                  }}
                >
                  Book Free Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
