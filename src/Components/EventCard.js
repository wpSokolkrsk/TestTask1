import React from "react";

const EventCard = ({ event, onDelete, onEdit }) => {
  return (
    <div
      style={{
        width: "300px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <img
        src={event.photo}
        alt={event.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "15px" }}>
        <h2 style={{ fontSize: "18px", margin: "10px 0" }}>{event.title}</h2>
        <p style={{ fontSize: "14px", color: "#555" }}>{event.description}</p>
        <p style={{ fontSize: "14px", margin: "10px 0", color: "#888" }}>
          <strong>Дата:</strong> {event.date} <br />
          <strong>Время:</strong> {event.time}
        </p>
        <button
          onClick={() => onDelete(event.id)}
          style={{
            backgroundColor: "#ff4d4f",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Удалить
        </button>
        <button
          onClick={() => onEdit(event)}
          style={{
            backgroundColor: "#1890ff",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Редактировать
        </button>
      </div>
    </div>
  );
};

export default EventCard;