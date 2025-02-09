import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, onDelete, onEdit }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default EventList;