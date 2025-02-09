import React from "react";

const EditModal = ({ event, onClose, onSave }) => {
  // Локальное состояние для редактируемого события
  const [editedEvent, setEditedEvent] = React.useState(event);

  // Обработчик изменения полей ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Сохранение изменений (передаем родительскому компоненту)
  const handleSave = () => {
    onSave(editedEvent);
  };

  return (
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
      {/* Поле для редактирования названия */}
      <label>
        Название:
        <input
          type="text"
          name="title"
          value={editedEvent.title}
          onChange={handleInputChange}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </label>
      {/* Поле для редактирования описания */}
      <label>
        Описание:
        <textarea
          name="description"
          value={editedEvent.description}
          onChange={handleInputChange}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </label>
      {/* Поле для редактирования даты */}
      <label>
        Дата:
        <input
          type="date"
          name="date"
          value={editedEvent.date}
          onChange={handleInputChange}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </label>
      {/* Поле для редактирования времени */}
      <label>
        Время:
        <input
          type="time"
          name="time"
          value={editedEvent.time}
          onChange={handleInputChange}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </label>
      {/* Поле для редактирования фото */}
      <label>
        Фото (URL):
        <input
          type="text"
          name="photo"
          value={editedEvent.photo}
          onChange={handleInputChange}
          style={{
            width: "100%",
            margin: "10px 0",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </label>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {/* Кнопка для сохранения изменений */}
        <button
          onClick={handleSave}
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
        {/* Кнопка для отмены редактирования */}
        <button
          onClick={onClose}
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
  );
};

export default EditModal;