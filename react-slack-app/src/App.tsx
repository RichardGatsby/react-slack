import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { selectUser } from "./store/User/selectors";

const LazyLogin = React.lazy(
  () => import("./components/Login" /* webpackChunkName: "login" */)
);
const LazySlack = React.lazy(
  () => import("./components/Slack/Slack" /* webpackChunkName: "slack" */)
);

function App() {
  //Basically the user is always null here
  //TODO: For the sake of this application
  // could persist the user to local/sessionStorage,
  const user = useSelector(selectUser);
  return (
    <>
      <Router>
        <Header userName={user?.userName}></Header>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Route path={"/login"} component={() => <LazyLogin />} />
          <Route path={"/slack"} component={() => <LazySlack />} />
          <Route
            exact
            path="/"
            render={() => {
              return user != null ? (
                <Redirect to="/slack" />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
        </React.Suspense>
      </Router>
    </>
  );
}
export default App;
