import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const EventsPage = (props) => {
  const {events} = props
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    // navigate to a slug route 
    router.push(`/events/${year}/${month}`)
  };

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}></EventsSearch>
      <EventList items={events}></EventList>
    </Fragment>
  );
};

// getStaticprops with isr
export async function getStaticProps(){
  // get all events and give it as props into the component
  const events = await getAllEvents()

  return {
    props: {
      events
    },
    revalidate:600
  }
}

export default EventsPage;
