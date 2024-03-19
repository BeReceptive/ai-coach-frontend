import React from "react";

import { withRouter } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = ({ history }) => {
  history.listen((location) => {
    console.log("location: ", location);
    ReactGA.pageview(location.pathname + location.search);
  });

  return <div />;
};

export default withRouter(RouteChangeTracker);
