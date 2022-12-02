import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../Styles/SingleClient.scss';
import Navigation from './Navigation';
import AddEventModal from "./AddEventModal";
import dayjs from 'dayjs';

const SingleClient = () => {
    const { id } = useParams()
    const [client, setClient] = useState({
        name: "",
        street: "",
        zipCode: "",
        city: "",
        nip: "",
        events: [],
    });

    const [isAddActionModalVisible, setIsAddActionModalVisible] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/client/${id}`).then((res) => {
            setClient(res.data);
        });
    }, [id, isAddActionModalVisible]);

    const deleteClientEvent = (clientEventId) => {
        axios
            .delete(`http://localhost:8080/api/clientEvent/delete/${id}`, {
                data: { clientEventId: clientEventId },
            })
            .then((res) => {
                axios.get(`http://localhost:8080/api/client/${id}`).then((res) => {
                    setClient(res.data);
                });
            });
    };

    return (
        <>
            <Navigation></Navigation>
            <div className="customer">
                <div>
                    <h2>{client.name}</h2>
                    <strong>Adres</strong>
                    <address>
                        {client.street} <br />
                        {client.zipCode} <br />
                        {client.city} <br />
                        NIP: {client.nip}
                    </address>
                </div>
                <hr></hr>
                <div className="action">
                    <h2>Akcje</h2>
                    <button onClick={() => setIsAddActionModalVisible(true)}>
                        Dodaj nową
                    </button>
                </div>
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
                                    <td>
                                        {`${dayjs(event.date).format('DD/MM/YYYY (dddd)')}`}
                                    </td>
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
                {isAddActionModalVisible &&
                    <AddEventModal
                        isAddActionModalVisible={isAddActionModalVisible}
                        setIsAddActionModalVisible={setIsAddActionModalVisible}
                        clientId={client._id} />
                }
            </div>
        </>
    );
}

export default SingleClient;