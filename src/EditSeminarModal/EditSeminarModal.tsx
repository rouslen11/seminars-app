import React, { useState } from "react";
import { Seminar } from "../types";
import axios from "axios";
import styles from "../EditSeminarModal/EditSeminarModal.module.scss";
interface EditSeminarModalProps {
  seminar: Seminar;
  onClose: () => void;
  onSave: (updatedSeminar: Seminar) => void;
}

const EditSeminarModal: React.FC<EditSeminarModalProps> = ({
  seminar,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [time, setTime] = useState(seminar.time);
  const [date, setDate] = useState(seminar.date);
  const [photo, setPhoto] = useState(seminar.photo);

  // Сохранение изменений
  const handleSave = () => {
    const updatedSeminar: Seminar = {
      ...seminar,
      title,
      description,
      time,
      date,
      photo,
    };
    onSave(updatedSeminar);

    // Редактирование семинара на сервере
    axios
      .put(`http://localhost:3001/seminars/${seminar.id}`, updatedSeminar)
      .then((response) => {
        onSave(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении семинара:", error);
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Редактирование семинара</h3>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Описание:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Время:</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div>
          <label>Дата:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Ссылка на картинку</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.save} onClick={handleSave}>
            Сохранить
          </button>
          <button className={styles.close} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSeminarModal;
