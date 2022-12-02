import axios from "axios";
import { useState } from "react";
import '../Styles/AddEventModal.scss';

const AddEventModal = (props) => {
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    date: "",
  });

  const handleInputData = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData((data) => {
      return { ...data, [name]: target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/api/clientEvent/add/${props.clientId}`, formData)
      .then((res) => {
        if (!res.data.error) {
          props.setIsAddActionModalVisible(false);
          setFormData({
            description: "",
            type: "",
            date: "",
          });
        }
      });
      window.location.reload(false)
  };

  return (
    <div className="modal">
      <div>
        <h1>Dodaj Akcję</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
            <label>Opis</label>
            <input
              name="description"
              as="textarea"
              placeholder="Opis"
              value={formData.description}
              onChange={handleInputData}
            />

            <label>Rodzaj akcji</label>
            <select onChange={handleInputData} name="type">
              <option>Wybierz rodzaj</option>
              <option value="call">Telefon</option>
              <option value="meeting">Spotkanie</option>
              <option value="email">Mail</option>
            </select>

            <label>Data</label>
            <input
              name="date"
              type="date"
              placeholder="Data"
              value={formData.date}
              onChange={handleInputData}
            />

          <button type="submit">Dodaj</button>
          <button
            onClick={() => props.setIsAddActionModalVisible(false)}>
            Zamknij
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;