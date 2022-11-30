import '../Styles/Costumers.scss';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

function Costumers(props) {

    const displayData = props.data.map(client => {
        return (

            <div className='user-box' key={client._id}>
                <h2>{client.name}</h2>
                <h3>Adres:</h3>
                <p>{client.street}</p>
                <p>{client.zipCode}</p>
                <p>{client.city}</p>
                <p>NIP: {client.nip}</p>
                <button>
                <Link to={`/${client._id}`}>Szczegóły</Link>
                </button>
            </div>
        );
    });

    return (
        <>
            <Navigation></Navigation>
            <div className='container'>
                <h1>Klienci:</h1>
                <div>
                    {displayData}
                </div>
            </div>
        </>

    )
}


export default Costumers;