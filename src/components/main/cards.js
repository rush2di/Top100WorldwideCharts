import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cardStyles from "./cards.module.scss";
import posed, { PoseGroup } from "react-pose";

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

const Header = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

const Card = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

const Cards = props => {
  const { data } = props.cards;
  const countryCards = data.map(card => {
    return (
      <Card key={card.id} style={{ height: "100%", width: "100%" }}>
        <Link
          to={{
            pathname: `/playlist/${card.id}`
          }}
        >
          <div
            className={cardStyles.card}
            style={{ backgroundImage: `url(${card.bg})` }}
          >
            <span>{card.title}</span>
          </div>
        </Link>
      </Card>
    );
  });
  return (
    <div className={cardStyles.wrapper}>
      <Container>
        <Header>
          <h1 className={cardStyles.title}>Explore top 100 charts Worldwide</h1>
        </Header>
        <Header>
          <p>
            Echo helps you explore the top 100 Worldwide charts and save
            whatever song you like to know which title and artist you should
            look for in case you want the full song.
          </p>
        </Header>
        <div className={cardStyles.gridContainer}>
          <div className={cardStyles.theGrid}>
            <PoseGroup>{countryCards}</PoseGroup>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return { cards: state.chart.data };
};

export default connect(mapStateToProps)(Cards);
