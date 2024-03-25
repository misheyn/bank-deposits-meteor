import React, { useState } from 'react'
import ClientsList from './ClientList'
import AddClient from './AddClient'
import ClientProfile from './ClientProfile'
import '../../styles/Resource.css'

const ClientsPage = () => {

    const [selectedClient, setSelectedClient] = useState(null);

    return (
        <div className='page'>
            <AddClient onUpdate={() => setSelectedClient(null)}/>
            <div className='main-container'>
                <ClientsList onSelect={(client) => setSelectedClient(client)} />
                {selectedClient ? (
                    <ClientProfile client={selectedClient} onDelete={() => setSelectedClient(null)} />
                ) : null}
            </div>
        </div>
    )
}

export default ClientsPage;
