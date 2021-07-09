import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/EmployeeReducer";
import { signOutAction } from "../redux/UserReducer";

export const AppNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    //LOGICAL OPERATION.
    //COOKIES ANS SESSIONS ARE GETTING REMOVED FROM THE BROWSER
    dispatch(signOutAction());

    //REDIRECT THE USER TO LOGIN PAGE
    history.push("/");
  };

  const clearEmployeeUref = () => {
    dispatch(updateRenderAction({}));
    history.push("/employee-upsert");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">SOCIAL APP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/employee-list">
            Employee List
          </Nav.Link>
          <Nav.Link onClick={clearEmployeeUref}>Employee Upsert</Nav.Link>
          <Nav.Link onClick={signOut}>SIGN OUT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
