// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/auth/validate`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (res.data.valid) {
//           setAuthorized(true);
//         }
//       } catch (err) {
//         console.log("User not authorized");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       verifyUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token]);

//   if (loading) return <div>Checking authentication...</div>;

//   if (!authorized) return <Navigate to="/login" replace />;

//   return children;
// };

// export default ProtectedRoute;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/validate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.valid) {
          setAuthorized(true);
        }
      } catch (err) {
        navigate('/login')
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // 🔥 Loader
  if (loading) {
    return (
      <div style={styles.loaderContainer} className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <RotatingLines
          strokeColor="#0c990c"
          strokeWidth="5"
          animationDuration="0.75"
          width="60"
          visible={true}
        />
      </div>
    );
  }

  if (!authorized) return <Navigate to="/login" replace />;

  return children;
};

const styles = {
  loaderContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
};

export default ProtectedRoute;
