// this is yuk, but fine as a dummy backend

export async function getAllEvents() {
  // get the events data
  const response = await fetch(
    "https://nextjs-events-2d82e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = await response.json();

  // format the data from an obj to an array
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key], // each of the key value pairs from each event obj, seperated
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();
  return filterEvents(allEvents, dateFilter);
}

export function filterEvents(events, dateFilter) {
  const {year, month} = dateFilter;
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}
