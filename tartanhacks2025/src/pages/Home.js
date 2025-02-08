import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <nav>
        <Link to="/scheduling">Go to Scheduling</Link>
      </nav>
    </div>
  );
};

export default Home;
