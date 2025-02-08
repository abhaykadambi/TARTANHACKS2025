// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.title}>Login</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleLogin} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <button type="submit" style={styles.submitButton}>Login</button>
//         </form>
//         <p style={styles.signupText}>
//           Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f4f7fc",
//   },
//   formContainer: {
//     backgroundColor: "white",
//     padding: "30px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: "600",
//     marginBottom: "20px",
//     color: "#333",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     padding: "12px 15px",
//     fontSize: "16px",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//     outline: "none",
//     transition: "border-color 0.3s",
//   },
//   inputFocus: {
//     borderColor: "#4f8fff",
//   },
//   submitButton: {
//     padding: "12px",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   submitButtonHover: {
//     backgroundColor: "#0056b3",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//     marginBottom: "10px",
//   },
//   signupText: {
//     fontSize: "14px",
//     marginTop: "15px",
//     color: "#555",
//   },
//   link: {
//     color: "#007bff",
//     textDecoration: "none",
//   },
// };

// export default Login;








// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { motion } from "framer-motion";
// import logo from "../pages/Logo.png"; // Replace with your logo path

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         {/* Animated Logo */}
//         <motion.img
//           src={logo}
//           alt="Logo"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           style={styles.logo}
//         />

//         <h2 style={styles.title}>Login</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleLogin} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <button
//             type="submit"
//             style={styles.submitButton}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
//           >
//             Login
//           </button>
//         </form>
//         <p style={styles.signupText}>
//           Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f4f7fc",
//   },
//   formContainer: {
//     backgroundColor: "white",
//     padding: "30px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   logo: {
//     width: "160px",
//     height: "160px",
//     marginBottom: "15px",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: "600",
//     marginBottom: "20px",
//     color: "#333",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     padding: "12px 15px",
//     fontSize: "16px",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//     outline: "none",
//     transition: "border-color 0.3s",
//   },
//   submitButton: {
//     padding: "12px",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   error: {
//     color: "red",
//     fontSize: "14px",
//     marginBottom: "10px",
//   },
//   signupText: {
//     fontSize: "14px",
//     marginTop: "15px",
//     color: "#555",
//   },
//   link: {
//     color: "#007bff",
//     textDecoration: "none",
//   },
// };

// export default Login;













import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import logo from "../pages/Logo.png"; // Ensure the path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Floating Animated Blobs */}
      <Blob color="#FFD700" top="10%" left="10%" />
      <Blob color="#007bff" top="70%" left="80%" />
      <Blob color="#FF5733" top="50%" left="30%" />

      <div style={styles.formContainer}>
        {/* Animated Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={styles.logo}
        />

        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
        </form>
        <p style={styles.signupText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

/* Animated Blob Component */
const Blob = ({ color, top, left }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: 0.5,
        rotate: [0, 360],
        x: [0, 20, -20, 0], // Moves left and right
        y: [0, 10, -10, 0], // Moves up and down
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top,
        left,
        width: "200px",
        height: "200px",
        backgroundColor: color,
        borderRadius: "50%",
        filter: .6,
        zIndex: -1,
      }}
    />
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "rgba(244, 247, 252, 0.8)",
    position: "relative",
    overflow: "hidden",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  logo: {
    width: "240px",
    height: "240px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border-color 0.3s",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  signupText: {
    fontSize: "14px",
    marginTop: "15px",
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Login;
