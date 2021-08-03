import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getFilteredEvents, filterEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import ResultsTitle from "../../components/events/results-title";

const EventsPage = () => {
  const [loadedEvents, setEvents] = useState();
  const router = useRouter();

  // client rendering
  const { data, error } = useSWR(
    "https://nextjs-events-2d82e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );

  useEffect(() => {
    if (data) {
      // update the events if the data changes
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key], // each of the key value pairs from each event obj, seperated
        });
      }
      setEvents(events);
    }
  }, [data]);

  // change the route based on the dates selected
  const findEventsHandler = (year, month) => {
    // navigate to a slug route
    router.push(`/events/${year}/${month}`);
  };

  // load different head data for this
  // reusable head info
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="a list of events" />
    </Head>
  );

  // filtered data doesn't show on first render, so handle it
  if (!router.query.slug) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  // get the date from the query params
  const [year, month] = router.query.slug;
  const numYear = +year;
  const numMonth = +month;

  // reusable head info
  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <EventsSearch onSearch={findEventsHandler}></EventsSearch>
        <ResultsTitle>Error finding events</ResultsTitle>
      </Fragment>
    );
  }

  let filteredEvents = [];
  if (loadedEvents) {
    filteredEvents = filterEvents(loadedEvents, {
      year: numYear,
      month: numMonth,
    });
  }

  // if (props.hasError) {
  //   return (
  //     <Fragment>
  //       <EventsSearch onSearch={findEventsHandler}></EventsSearch>
  //       <ResultsTitle>Error finding events</ResultsTitle>
  //     </Fragment>
  //   );
  // }
  // const events = props.events;

  //handle if the filtered events are not returned correctly
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <EventsSearch onSearch={findEventsHandler}></EventsSearch>
        <ResultsTitle>No Events found</ResultsTitle>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <EventsSearch onSearch={findEventsHandler}></EventsSearch>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
};

// nothing (client rendering), or serverside rendering
// export async function getServerSideProps(context) {
//   // get the year and the month, as a date filter
//   const { params } = context;
//   const [year, month] = params.slug;
//   const numYear = +year;
//   const numMonth = +month;
//   // handle if the slug values are invalid
//   if (
//     isNaN(numMonth) ||
//     isNaN(numYear) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }
//   const dateFilter = {
//     year: numYear,
//     month: numMonth,
//   };

//   // get the filtered events
//   const events = await getFilteredEvents(dateFilter);

//   return {
//     props: {
//       events,
//       numYear,
//       numMonth,
//     },
//   };
// }

export default EventsPage;
