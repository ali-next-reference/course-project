import React from 'react';
import EventItem from './event-item';
import classes from './event-list.module.css'

const EventList = (props) => {
  const { items } = props

  const renderItemList = () => {
    return  items.map(event => {
      return (
        <EventItem item={event}></EventItem>
      )
    })
  }

  return (
    <ul className={classes.list}>
      {renderItemList()}
    </ul>
  );
}

export default EventList;
