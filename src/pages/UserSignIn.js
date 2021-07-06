import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authenticateUserAction } from "../redux/store";

export const UserSignIn = () => {
  const formEl = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const signInUser = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      //dispatch the call to redux :: for API Call
      //TODO
      //ON SUCCESS, WILL REDIRECT TO NEXT PAGE
      dispatch(authenticateUserAction({ userName, password }));
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  //REACT ROUTE DOM
  if (state.authSuccess == true) {
    //Redirecting the user / employee-list page;
    history.push("/employee-list");
  }
  return (
    <div
      className="bg-dark  d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <div className="w-50">
        <h1 className="text-dark text-center alert alert-info">
          Application Sign In
        </h1>

        {state.authFailure && (
          <h6 className="text-center alert alert-danger">
            Invalid Credentials
          </h6>
        )}

        <form ref={formEl} className="needs-validation" noValidate>
          <div>
            <input
              type="text"
              placeholder="Enter Username"
              value={userName}
              onChange={updateUserName}
              className="form-control form-control-lg mb-2"
              minLength="3"
              maxLength="30"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={updatePassword}
              className="form-control form-control-lg mb-2"
              minLength="6"
              maxLength="10"
              required
            />
          </div>
          <div>
            <input
              type="button"
              value="SIGN IN"
              onClick={signInUser}
              className="btn btn-info btn-lg w-100"
            />
          </div>

          <div>
            <Link to="/user-signup">
              <input
                type="button"
                value="SignUp Here"
                className="btn btn-link w-100 btn-lg"
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
