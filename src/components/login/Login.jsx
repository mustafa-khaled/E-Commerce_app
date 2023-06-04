import styles from "./login.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  register,
  signOut,
  signInWithGoogle,
} from "../../redux/slices/authSlice";
import GoogleButton from "react-google-button";

const Login = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(email, password));
  };

  const handleGoogleAuth = () => {
    dispatch(signInWithGoogle());
  };

  const formattedEmail = user ? user.email.match(/^[^0-9]+/)[0] : "";

  return (
    <div className={`${styles.login} main_margin`}>
      {user ? (
        <div className={styles.user_info}>
          <i className="fa-regular fa-circle-user"></i>
          <h2>Hello, {formattedEmail}...</h2>
          <button className="btn" onClick={() => dispatch(signOut())}>
            Sign Out
          </button>
        </div>
      ) : (
        <form action="">
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            className={`${styles.sign_btn} btn`}
            type="submit"
            onClick={handleSignIn}
            disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <hr className={styles.hr} />
          <button
            className={`${styles.create_account_btn} btn`}
            onClick={handleRegister}
            disabled={loading}>
            {loading ? "Creating Account..." : "Create New Account"}
          </button>
          <GoogleButton onClick={handleGoogleAuth} />
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
