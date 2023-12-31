import { useState } from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => setOpen(!open);

  return (
    <div>
      <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          ✍️ Tabloid
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar>
                {loggedInUser.roles.includes("Admin") && (
                  <>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/userprofiles">
                        User Profiles
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/categories">
                        Category Management
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/reactions">
                        Reaction Management
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/tags">
                        Tag Management
                      </NavLink>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <NavLink tag={RRNavLink} to="/posts">
                    All Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/my-posts">
                    My Posts
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
