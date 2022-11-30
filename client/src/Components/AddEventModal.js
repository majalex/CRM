import axios from "axios";
import { useState } from "react";

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
      .post(`/clientEvent/add/${props.clientId}`, formData)
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
  };

  return (
    <div
      show={props.isAddActionModalVisible}
      onHide={() => props.setIsAddActionModalVisible(false)}
    >
      <div>
        <h1>Dodaj akcję</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" controlId="description">
            <label>Opis</label>
            <input
              name="description"
              as="textarea"
              placeholder="Opis"
              value={formData.description}
              onChange={handleInputData}
            />
          </div>

          <div className="mb-3" controlId="type">
            <label>Rodzaj akcji</label>
            <select onChange={handleInputData} name="type">
              <option>Wybierz rodzaj</option>
              <option value="call">Telefon</option>
              <option value="meeting">Spotkanie</option>
              <option value="email">Mail</option>
            </select>
          </div>

          <div className="mb-3" controlId="date">
            <label>Data</label>
            <input
              name="date"
              type="date"
              placeholder="Data"
              value={formData.date}
              onChange={handleInputData}
            />
          </div>

          <button type="submit">Dodaj</button>{` `}

          <button
            type="button"
            onClick={() => props.setIsAddActionModalVisible(false)}
          >
            Zamknij
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;