import React, { useState, useEffect } from "react";
import axios from "axios";
import EditSeminarModal from "../EditSeminarModal/EditSeminarModal";
import { Seminar } from "../types";
import styles from "./SeminarList.module.scss";

const SeminarList: React.FC = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);

  // Загрузка данных с сервера
  useEffect(() => {
    axios
      .get<Seminar[]>("http://localhost:3001/seminars")
      .then((response) => {
        setSeminars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Сохранение изменений
  const handleSave = (updatedSeminar: Seminar) => {
    setSeminars(
      seminars.map((seminar) =>
        seminar.id === updatedSeminar.id ? updatedSeminar : seminar
      )
    );
    setEditingSeminar(null);
  };

  // Удаление элемента
  const handleDelete = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот семинар?")) {
      axios
        .delete(`http://localhost:3001/seminars/${id}`)
        .then(() => {
          setSeminars(seminars.filter((seminar) => seminar.id !== id));
        })
        .catch((error) => {
          console.error("Ошибка при удалении семинара:", error);
        });
    }
  };
  return (
    <div className={styles.wrapper}>
      {seminars.map((seminar) => (
        <div className={styles.seminarList} key={seminar.id}>
          <span>{seminar.title}</span>
          <span>{seminar.description}</span>
          <span style={{ fontWeight: 700 }}>{seminar.time}</span>
          <span style={{ fontWeight: 700 }}>{seminar.date}</span>
          <img
            className={styles.photo}
            src={seminar.photo}
            alt="У Вас выключен VPN ;)"
          />
          <div className={styles.buttonBlock}>
            <button
              onClick={() => {
                setEditingSeminar(seminar);
              }}
              className={styles.edit}
            >
              Редактировать
            </button>
            <button
              onClick={() => handleDelete(seminar.id)}
              className={styles.delete}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      {/* Модальное окно редактирования */}
      {editingSeminar && (
        <EditSeminarModal
          seminar={editingSeminar}
          onClose={() => setEditingSeminar(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SeminarList;
