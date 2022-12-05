import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../Styles/SingleClient.scss';
import Navigation from './Navigation';
import AddEventModal from "./AddEventModal";
import EditClientModal from "./modals/EditClientModal";
import EditEvent from "./modals/EditEvent";
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

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

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);


    const [isEventModalVisible, setIsEventModalVisible] = useState(false);

    const getClient = () => {
        axios.get(`http://localhost:8080/api/client/${id}`).then((res) => {
            setClient(res.data);
        });
    }

    useEffect(() => {
        getClient()
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

    const [formData, setFormData] = useState({
        description: "",
        type: "",
        date: "",
      });

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
                <button onClick={() => setIsEditModalVisible(true)}>
                    Edycja
                </button>
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
                                        {`${dayjs(event.date).locale('pl').format('dd, DD MMMM YYYY')}`}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteClientEvent(event._id)}>
                                            Usuń
                                        </button>{" "}
                                        <button onClick={() => setIsEventModalVisible(true)}>Edytuj</button>
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
                        clientId={client._id} 
                        formData={formData}
                        setFormData={setFormData}
                        />
                }
                {isEditModalVisible &&
                    <EditClientModal
                        isEditModalVisible={isEditModalVisible}
                        setIsEditModalVisible={setIsEditModalVisible}
                        clientId={client._id}
                        client={client}
                        setClient={setClient}
                        getClient={getClient}
                    />
                }
                {isEventModalVisible &&
                    <EditEvent
                        isEventModalVisible={isEventModalVisible}
                        setIsEventModalVisible={setIsEventModalVisible}
                        clientId={client._id}
                        client={client}
                        setClient={setClient}
                        getClient={getClient}
                    />
                }
            </div>
        </>
    );
}

export default SingleClient;