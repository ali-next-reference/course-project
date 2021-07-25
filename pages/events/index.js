import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const EventsPage = () => {
  const allEvents = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    // navigate to a slug route 
    router.push(`/events/${year}/${month}`)
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}></EventsSearch>
      <EventList items={allEvents}></EventList>
    </Fragment>
  );
};

export default EventsPage;
