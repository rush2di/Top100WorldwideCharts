import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Cards from "./cards";
import Artist from "./artist";
import ChartsList from "./chartsList";
import mainStyles from "./main.module.scss";
import UserFavs from "./userFav";
import posed, { PoseGroup } from "react-pose";

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true
  },
  exit: { opacity: 0 }
});

class Main extends Component {
  render() {
    const { secured } = this.props;
    return (
      <div className={mainStyles.container}>
        <div className={mainStyles.wrapper}>
          <div style={{ position: "relative" }}>
            <Route
              render={props => (
                <PoseGroup>
                  <RoutesContainer key={props.location.pathname}>
                    <Switch location={props.location}>
                      <Route exact path="/" component={Cards} />
                      <Route path="/playlist/:id" component={ChartsList} />
                      <Route path="/artist/:id" component={Artist} />
                      <Route
                        path="/user/saved-tracks"
                        render={() => <UserFavs secured={secured} />}
                      />
                    </Switch>
                  </RoutesContainer>
                </PoseGroup>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
