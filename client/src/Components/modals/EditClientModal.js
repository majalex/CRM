import axios from "axios";
import { useState } from "react";


const EditClientModal = (props) => {

    const [name, setName] = useState(props.client.name);
    const [street, setStreet] = useState(props.client.street);
    const [zipCode, setZipCode] = useState(props.client.zipCode);
    const [city, setCity] = useState(props.client.city);
    const [nip, setNip] = useState(props.client.nip);

    const goBack = () => {
        props.setIsEditModalVisible(false)
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !street || !zipCode || !city | !nip) {
            return;
        }

        axios
        .put(`http://localhost:8080/api/client/update/${props.clientId}`, {name, street, zipCode, city, nip})
            .then((res) => {
                setName('');
                setStreet('');
                setZipCode('');
                setCity('');
                setNip('');
                props.setIsEditModalVisible(false)
                props.getClient();
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div className="modal">
            <div>
                <h1>Edytuj Klienta</h1>
                <span onClick={goBack}>X</span><br />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Nazwa:</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        id="fname"
                        name="fname">
                    </input>
                    <label>ulica:</label>
                    <input
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                        type="text"
                        id="street"
                        name="street">
                    </input>
                    <label>kod-pocztowy:</label>
                    <input
                        onChange={(e) => setZipCode(e.target.value)}
                        value={zipCode}
                        name="zipCode"
                        id="zipCode">
                    </input>
                    <label>Miasto:</label>
                    <input
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        name="city"
                        id="city"
                        form="city">
                    </input>

                    <label>Nip:</label>
                    <input
                        onChange={(e) => setNip(e.target.value)}
                        value={nip}
                        name="nip"
                        id="nip">
                    </input>
                    <input className="btn" type="submit" value="Zapisz" />
                </form>
            </div>
        </div>
    );
};

export default EditClientModal;