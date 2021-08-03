import Head from 'next/head'
import React from "react";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Header from "../components/layout/main-header";

const HomePage = (props) => {
  // get all featured events
  const featuredEvents = props.events;

  return (
    <div>
      <Head>
        <title>Next js events</title>
        <meta name="description" content="Events for making good websites"/>
      </Head>
      <EventList items={featuredEvents}></EventList>
    </div>
  );
};

// get static props with isr
export async function getStaticProps() {
  const events = await getFeaturedEvents();

  if (!events) {
    return null;
  }
  return {
    props: {
      events,
      revalidate: 3600
    },
  };
}

export default HomePage;
