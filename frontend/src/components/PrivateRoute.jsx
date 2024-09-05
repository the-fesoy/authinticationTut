import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const PrivateRoute = ({ element }) => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!auth) {
      navigate("/signin", { state: { from: location } });
      toast.error('SIGN IN NIGGA');
    }
  }, [auth, navigate, location]);

  return auth ? element : null;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
