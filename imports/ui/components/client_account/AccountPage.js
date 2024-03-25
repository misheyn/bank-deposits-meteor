import React, { useState } from 'react';
import AccountList from './AccountList';
import AddAccount from './AddAccount';
import AccountProfile from './AccountProfile';
import '../../styles/Resource.css';

const AccountPage = () => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    return (
        <div className="page">
            <AddAccount onUpdate={() => setSelectedAccount(null)} />
            <div className="main-container">
                <AccountList onSelect={(account) => setSelectedAccount(account)} />
                {selectedAccount ? (
                    <AccountProfile account={selectedAccount} onDelete={() => setSelectedAccount(null)} />
                ) : null}
            </div>
        </div>
    );
};

export default AccountPage;
