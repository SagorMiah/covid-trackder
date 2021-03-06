import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const InfoBox = ({ title, cases, isRed, active, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infobox__selected"} ${
        isRed && "infobox__isRed"
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
