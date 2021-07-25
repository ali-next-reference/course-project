import React from "react";

import classes from "./event-item.module.css";
import ButtonPrimary from "../ui/button-primary";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = ({ item }) => {
  console.log(item);
  const formattedDate = new Date(item.date).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedLocation = item.location.replace(", ", "\n");

  return (
    // class name has to be imported and used like this
    <li className={classes.item} key={item.id}>
      <img src={item.image} alt={item.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{item.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedLocation}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <ButtonPrimary link={`/events/${item.id}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon/>
            </span>
          </ButtonPrimary>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
