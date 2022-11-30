import '../Styles/AddNew.scss';
import axios from 'axios';
import { useState } from 'react';
import Navigation from './Navigation';

const Form = (props) => {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [nip, setNip] = useState("");

    const addData = (e) => {
        e.preventDefault();

        if (!name || !street || !zipCode || !city || !nip) {
            return;
        }

        axios
            .post("http://localhost:8080/api/add", {
                name: name,
                street: street,
                zipCode: zipCode,
                city: city,
                nip: nip
            })
            .then((res) => {
                setName('');
                setStreet('');
                setZipCode('');
                setCity('');
                setNip('');
                props.getData();
            })
            .catch((error) => {
                console.log(error);
            });
    
            
    };

    return (
        <>
        <Navigation></Navigation>
        <div className="Form" onSubmit={addData}>
            <form>
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
                <input className="btn" type="submit" value="Dodaj klienta" />
            </form>
        </div>
        </>
    );
}

export default Form;