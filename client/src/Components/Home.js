import '../Styles/Home.scss';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home(props) {

    const deleteClient = (id) => {
        axios
          .delete(`http://localhost:8080/api/client/delete/${id}`)
          .then((res) => {
            props.setData((data) => {
              return data.filter((client) => client._id !== id);
    
            });
          })
          .catch((error) => {
            console.error(error);
          });
      };
    

    const displayData = props.data.map(client => {
        return (

            <div className='single-client' key={client._id}>
                <h2>{client.name}</h2>
                <p>Adres:</p>
                <p>{client.street}</p>
                <p>{client.zipCode}</p>
                <p>{client.city}</p>
                <p>NIP: {client.nip}</p>
                <button>
                <Link to={`/${client._id}`}>akcje</Link>
                </button>
                <button onClick={() => deleteClient(client._id)}>
                    usuń
                </button>
            </div>
        );
    });

    return (
        <>
            <Navigation></Navigation>
            <div className='container'>
                <h1>Twoi klienci</h1>
                <div className='single-client-container'>
                    {displayData}
                </div>
            </div>
        </>

    )
}


export default Home;