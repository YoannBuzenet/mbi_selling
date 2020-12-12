import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const Subscribe = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <h1 className="front-title">Choose the best plan for your business</h1>
      <div className="planContainer">
        <div className="planSubscribing">
          <p className="price">
            <span className="number">49</span>
            <span className="currency">€</span>
          </p>
          <p className="explaination">One Month</p>
          <ul>
            <li>
              <p>Unlimited price updates</p>
            </li>
            <li>
              <p>Customize your own scripts</p>
            </li>
            <li>
              <p>PDF summary of each modification</p>
            </li>
          </ul>
          <Button variant="contained" color="primary" size="large">
            Subscribe
          </Button>
        </div>
        <div className="planSubscribing">
          <p className="price">
            <span className="number">29</span>
            <span className="currency">€</span>
          </p>
          <p className="explaination">Three Month</p>
          <ul>
            <li>
              <p>Unlimited price updates</p>
            </li>
            <li>
              <p>Customize your own scripts</p>
            </li>
            <li>
              <p>PDF summary of each modification</p>
            </li>
          </ul>
          <Button variant="contained" color="primary" size="large">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
