import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import ResultsTitle from '../../components/events/results-title'

const EventsPage = () => {
  const findEventsHandler = (year, month) => {
    // navigate to a slug route 
    router.push(`/events/${year}/${month}`)
  };
  
  const router = useRouter();
  
  // filtered data doesn't show on first render
  if(!router.query.slug){
    return <p className='center'>Loading...</p>
  }
  
  const [year, month] = router.query.slug
  const numYear = +year
  const numMonth = +month

  // handle if the slug values are invalid
  if(isNaN(numMonth)||isNaN(numYear)||numYear>2030||numYear<2021||numMonth<1||numMonth>12){
    return (
      <Fragment>
        <EventsSearch onSearch={findEventsHandler}></EventsSearch>
        <ResultsTitle>Invalid filter, try another search term</ResultsTitle>
      </Fragment>
    )
  }

  // format the dates then call the getFilteredEvents function
  const dateFilter = {
    year: numYear,
    month: numMonth
  }
  const filteredEvents = getFilteredEvents(dateFilter);

  //handle if the filtered events are not returned correctly
  if(!filteredEvents||filteredEvents.length===0){
    return (
      <Fragment>
        <EventsSearch onSearch={findEventsHandler}></EventsSearch>
        <ResultsTitle>No Events found</ResultsTitle>
      </Fragment>
    )
  }
  

  const date = new Date(numYear, numMonth-1)

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}></EventsSearch>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
};

export default EventsPage;