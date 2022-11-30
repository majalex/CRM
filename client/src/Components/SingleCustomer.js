import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../Styles/SingleCustomer.scss';
import Navigation from './Navigation';
import AddEventModal from "../Components/AddEventModal";

const SingleCustomer = () => {
    const { id } = useParams()
    const [client, setClient] = useState({
        name: "",
        street: "",
        zipCode: "",
        city: "",
        nip: ""
    });

    const [isAddActionModalVisible, setIsAddActionModalVisible] = useState(false);

    useEffect(() => {
        axios.get(`client/${id}`).then((res) => {
            console.log(id);
            setClient(res.data);
        });
    }, [id, isAddActionModalVisible]);

    const deleteClientEvent = (clientEventId) => {
        axios
            .delete(`/clientEvent/delete/${id}`, {
                data: { clientEventId: clientEventId },
            })
            .then((res) => {
                console.log(res.data);
                axios.get(`customer/${id}`).then((res) => {
                    console.log(id);
                    setClient(res.data);
                });
            });
    };

    // const getClient = async () => {
    //     const { data } = await axios.get(`http://localhost:8080/api/` + id);
    //     setClient(data);
    // };





    return (
        <>
            <Navigation></Navigation>
            <div className='customer' key={client._id}>
                <h2>{client.name}</h2>
                <h3>Adres:</h3>
                <p>{client.street}</p>
                <p>{client.zipCode}</p>
                <p>{client.city}</p>
                <p>NIP: {client.nip}</p>
            </div>
            <div className="action">
                <h1>Akcje</h1>
                <table>
                    <thead>
                        <tr>
                            <th>LP.</th>
                            <th>Opis</th>
                            <th>Rodzaj akcji</th>
                            <th>Data</th>
                            <th>Edycja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.events.map((event, index) => {
                            return (
                                <tr key={event._id}>
                                    <td>{index + 1}.</td>
                                    <td>{event.description}</td>
                                    <td>{event.type}</td>
                                    <td>{event.date}</td>
                                    <td>
                                        <button onClick={() => deleteClientEvent(event._id)}>
                                            Usuń
                                        </button>{" "}
                                        <button>Edytuj</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button onClick={() => setIsAddActionModalVisible(true)}>
                Dodaj akcje
            </button>
            <AddEventModal
                isAddActionModalVisible={isAddActionModalVisible}
                setIsAddActionModalVisible={setIsAddActionModalVisible}
                customerId={client._id}
            />
        </>
    )
}

export default SingleCustomer;