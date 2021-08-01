import React from 'react';
import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/event-list';
import Header from '../components/layout/main-header'

const HomePage = () => {
  // get all featured events
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <EventList items={featuredEvents}></EventList>
    </div>
  );
}

// get static props with isr

export default HomePage;
