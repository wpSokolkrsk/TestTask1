import React, { useEffect, useState } from "react";

const App = () => {
  const [events, setEvents] = useState([]); // Состояние для данных
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [isEditing, setIsEditing] = useState(false); // Состояние для модального окна редактирования
  const [currentEvent, setCurrentEvent] = useState(null); // Состояние для текущего редактируемого события

  // URL локального API
  const API_URL = "http://localhost:3001/seminars"; // Убедитесь, что json-server работает

  // Функция для получения данных с сервера
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Функция для удаления события
  const deleteEvent = async (id) => {
    const userConfirmed = window.confirm("Вы уверены, что хотите удалить это событие?");
    if (!userConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Ошибка при удалении: ${response.status}`);
      }
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      alert("Событие успешно удалено");
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  // Функция для открытия модального окна редактирования
  const openEditModal = (event) => {
    setCurrentEvent(event); // Устанавливаем текущее редактируемое событие
    setIsEditing(true); // Открываем модальное окно
  };

  // Функция для закрытия модального окна
  const closeEditModal = () => {
    setCurrentEvent(null); // Сбрасываем текущее событие
    setIsEditing(false); // Закрываем модальное окно
  };

  // Функция для сохранения изменений
  const saveEditedEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/${currentEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentEvent),
      });
      if (!response.ok) {
        throw new Error(`Ошибка при обновлении: ${response.status}`);
      }
      const updatedEvent = await response.json();

      // Обновляем состояние с измененным событием
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      alert("Событие успешно обновлено");
      closeEditModal(); // Закрываем модальное окно
    } catch (err) {
      alert(`Ошибка: ${err.message}`);
    }
  };

  // Обновление полей в модальном окне
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Запрос данных при монтировании компонента
  useEffect(() => {
    fetchData();
  }, []);

  // Рендеринг страницы
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>События Kosmoteros</h1>

      {loading && <p style={{ textAlign: "center" }}>Загрузка...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>Ошибка: {error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {!loading &&
          !error &&
          events.map((event) => (
            <div
              key={event.id}
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
                  onClick={() => deleteEvent(event.id)}
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
                  onClick={() => openEditModal(event)}
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
          ))}
      </div>

      {/* Модальное окно для редактирования */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "400px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Редактировать событие</h2>
          <label>
            Название:
            <input
              type="text"
              name="title"
              value={currentEvent.title}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
          </label>
          <label>
            Описание:
            <textarea
              name="description"
              value={currentEvent.description}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
          </label>
          <label>
            Дата:
            <input
              type="date"
              name="date"
              value={currentEvent.date}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
          </label>
          <label>
            Время:
            <input
              type="time"
              name="time"
              value={currentEvent.time}
              onChange={handleInputChange}
              style={{ width: "100%", margin: "10px 0", padding: "8px" }}
            />
          </label>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={saveEditedEvent}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Сохранить
            </button>
            <button
              onClick={closeEditModal}
              style={{
                backgroundColor: "#ccc",
                color: "#000",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App