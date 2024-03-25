import React, {useState, useEffect} from 'react'
import EditClient from './EditClient';
import "../../styles/Resource.css"

const ClientProfile = ({client, onDelete}) => {

    const [selectedClient, setSelectedClient] = useState(client);

    useEffect(() => {
        setSelectedClient(client);
    }, [client]);

    const handleDelete = () => {
        Meteor.call('clients.delete', selectedClient._id, (error, result) => {
            if (error) {
                console.error('Error deleting client:', error);
            } else {
                onDelete();
            }
        });
    }

    return (
        <div className='resource-profile'>
            <div className='resource-info'>
                <h3>CLIENT:</h3>
                <label>Name: {selectedClient.fullname.last} {selectedClient.fullname.first} {selectedClient.fullname.patronymic}</label>
                <br/>
                <label>Passport data: {selectedClient.passport.series} {selectedClient.passport.number} </label>
                <br/>
                <label>Phone: {selectedClient.phone} </label>
                <br/>
                <label>Address: {selectedClient.address.city}, {selectedClient.address.street}, {selectedClient.address.house_number}</label>
                <button className={"delete-button"} onClick={handleDelete}>DELETE</button>
            </div>
                <EditClient client={selectedClient} onUpdate={(updatedClient) => {
                    setSelectedClient(updatedClient)
                }}/>
        </div>
    )
}

export default ClientProfile;
