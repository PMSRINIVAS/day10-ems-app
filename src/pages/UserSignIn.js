import { useRef } from "react";
import { Link } from "react-router-dom";

export const UserSignIn = () => {
  const formEl = useRef();

  const signInUser = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    console.log(isFormValid);

    if (isFormValid) {
      //dispatch the call to redux :: for API Call
      //TODO
      //ON SUCCESS, WILL REDIRECT TO NEXT PAGE
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };
  return (
    <div
      className="bg-dark  d-flex justify-content-center align-items-center "
      style={{ height: "100vh" }}
    >
      <div className="w-50">
        <h1 className="text-dark text-center alert alert-info">
          Application Sign In
        </h1>

        <form ref={formEl} className="needs-validation" noValidate>
          <div>
            <input
              type="text"
              placeholder="Enter Username"
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
