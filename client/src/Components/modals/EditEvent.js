import axios from "axios";
import { useState } from "react";


const EditClientModal = (props) => {

    const [description, setDescription] = useState(props.formData.description);
    const [type, setType] = useState(props.formData.type);
    const [date, setDate] = useState(props.formData.date);

    const goBack = () => {
        props.setEditingEventId('')
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !type || !date) {
            return;
        }

        axios
            .put(`http://localhost:8080/api/clientEvent/update/${props.editingEventId}`, {description, type, date, clientId: props.clientId})
            .then((res) => {
                setDescription('');
                setType('');
                setDate('');
                props.getClient();
                props.setEditingEventId('')
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div className="modal">
            <div>
                <h1>Edytuj Akcję</h1>
                <span onClick={goBack}>X</span><br />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Opis</label>
                    <input
                        name="description"
                        as="textarea"
                        placeholder="Opis"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>Rodzaj akcji</label>
                    <select
                        onChange={(e) => setType(e.target.value)} name="type">
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button type="submit">Dodaj</button>
                    <button
                        onClick={() => props.setEditingEventId('')}>
                        Zamknij
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditClientModal;