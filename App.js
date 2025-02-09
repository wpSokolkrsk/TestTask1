import React, { useEffect, useState } from "react";
import EventList from "./Components/EventList";
import EditModal from "./Components/EditModal";

const App = () => {
  const [events, setEvents] = useState([]); // Состояние для всех событий
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибок
  const [isEditing, setIsEditing] = useState(false); // Состояние для модального окна редактирования
  const [currentEvent, setCurrentEvent] = useState(null); // Текущее редактируемое событие

  const API_URL = "http://localhost:3001/seminars"; // URL локального API

  // Получение данных с сервера
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data); // Сохраняем данные
    } catch (err) {
      setError(err.message); // Сохраняем ошибку
    } finally {
      setLoading(false); // Отключаем загрузку
    }
  };

  // Удаление события
  const deleteEvent = async (id) => {
    const userConfirmed = window.confirm("Вы уверены, что хотите удалить это событие?");
    if (!userConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Ошибка при удалении: ${response.status}`);
      }
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id)); // Удаляем из состояния
      alert("Событие успешно удалено");
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  // Открытие модального окна
  const openEditModal = (event) => {
    setCurrentEvent(event); // Устанавливаем текущее редактируемое событие
    setIsEditing(true); // Открываем окно
  };

  // Закрытие модального окна
  const closeEditModal = () => {
    setCurrentEvent(null); // Сбрасываем текущее событие
    setIsEditing(false); // Закрываем окно
  };

  // Сохранение изменений
  const saveEditedEvent = async (editedEvent) => {
    try {
      const response = await fetch(`${API_URL}/${editedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });
      if (!response.ok) {
        throw new Error(`Ошибка при обновлении: ${response.status}`);
      }
      const updatedEvent = await response.json();
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
      ); // Обновляем состояние
      alert("Событие успешно обновлено");
      closeEditModal();
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  // Загружаем данные при первом рендере
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>События Kosmoteros</h1>
      {loading && <p style={{ textAlign: "center" }}>Загрузка...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>Ошибка: {error}</p>}
      <EventList
        events={events}
        onDelete={deleteEvent}
        onEdit={openEditModal}
      />
      {isEditing && (
        <EditModal
          event={currentEvent}
          onClose={closeEditModal}
          onSave={saveEditedEvent}
        />
      )}
    </div>
  );
};

export default App;