import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signOutAction } from "../redux/store";

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

  return (
    <div className="bg-dark text-light p-3 d-flex justify-content-end align-items-center">
      <Link to="/employee-list">
        <h6 className="mr-3">EMP-List</h6>
      </Link>

      <Link to="/employee-upsert">
        <h6>EMP-Upsert</h6>
      </Link>

      <h6 className="ml-2 text-danger" onClick={signOut} role="button">
        Sign Out
      </h6>
      {/* <input
        type="button"
        value="Sign Out"
        onClick={signOut}
        className="btn btn-info ml-2"
      /> */}
    </div>
  );
};
