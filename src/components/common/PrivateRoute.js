import { withAuthenticationRequired } from '@auth0/auth0-react';


const PrivateRoute = ({ component, ...args }) => {

  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

export default PrivateRoute;
