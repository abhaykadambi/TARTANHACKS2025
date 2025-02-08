import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;