import React, { Component } from "react";
import NavBar from "./components/nav/navBar";
import Main from "./components/main/main";
import layout from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Player from "./components/player/player";
import Login from "./components/modals/Login";
import Signup from "./components/modals/Signup";
import { auth, dp } from "./configs/firebase/config";
import { connect } from "react-redux";
import posed, { PoseGroup } from "react-pose";

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true
  },
  exit: { opacity: 0 }
});

class App extends Component {
  state = {
    secured: true
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        dp.collection("users")
          .doc(user.uid)
          .get()
          .then(profile => {
            const { id, username, likedTracks } = profile.data();
            this.setState({ secured: false });
            this.props.userIsActive(id, username, likedTracks);
          });
      } else {
        this.setState({ secured: true });
        return this.props.userIsNotActive();
      }
    });
  }

  render() {
    const { secured } = this.state;
    return (
      <div
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
          position: "relative"
        }}
      >
        <Router>
          <div className={layout.container}>
            <div className={layout.section}>
              <NavBar />
              <Main secured={secured} />
            </div>
          </div>
          <Player />
          <Route
            render={({ location }) => (
              <PoseGroup>
                <RoutesContainer key={location.pathname}>
                  <Route
                    to="/login"
                    render={props => <Login {...props} secured={secured} />}
                  />
                  <Route
                    to="/signup"
                    render={props => <Signup {...props} secured={secured} />}
                  />
                </RoutesContainer>
              </PoseGroup>
            )}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { statut: state.statut };
};

const mapDispatchToProps = dispatch => {
  return {
    userIsActive: (id, username, likedTracks) =>
      dispatch({
        type: "USER_IS_ACTIVE",
        id,
        username,
        likedTracks
      }),
    userIsNotActive: () => dispatch({ type: "USER_IS_NOT_ACTIVE" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
