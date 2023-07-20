import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn,children }) => {
  
  const token = sessionStorage.getItem('token')
  console.log(token);
  if (token===null) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;