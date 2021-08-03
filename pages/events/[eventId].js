import Head from 'next/head'
import React from "react";
import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import EventItem from "../../components/events/event-item";

const EventDetailPage = (props) => {
  const event = props.event

  if (!event) {
    return null
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

// get static props to render the pages for each id from get static paths
export async function getStaticProps(context){
  // get the id from the path props (thanks getStaticPaths)
  const {params} = context
  const eventId = params.eventId

  const event = await getEventById(eventId)

  if(!event){
    return {
      notFound: true
    }
  }

  return {
    props: {
      event
    },
    revalidate: 600
  }
}

// get static paths to find each id to pre render 
export async function getStaticPaths(){
  // make the array of params objects that have the eventId for all events
  const events = await getFeaturedEvents()
  const paths = events.map(({id}) => ({params: {eventId:id}}))

  return {
    paths,
    // true means next js will check if data is available, even if there is no pre rendered page. 
    fallback: 'blocking' 
  }
}

export default EventDetailPage;
