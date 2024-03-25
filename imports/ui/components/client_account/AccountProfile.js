import React, {useState, useEffect} from 'react';
import EditAccount from './EditAccount';
import {useFind, useSubscribe} from 'meteor/react-meteor-data';
import {ClientCollection} from '../../../api/clients';
import {DepositCollection} from '../../../api/deposits';
import "../../styles/Resource.css"

const AccountProfile = ({account, onDelete}) => {
    const [selectedAccount, setSelectedAccount] = useState(account);

    const accountsLoading = useSubscribe('client_account');
    const clientsLoading = useSubscribe('clients');
    const depositsLoading = useSubscribe('deposits');
    const clients = useFind(() => ClientCollection.find());
    const deposits = useFind(() => DepositCollection.find());

    useEffect(() => {
        setSelectedAccount(account);
    }, [account, clients, deposits]);

    const handleAccountDelete = () => {
        Meteor.call('client_account.delete', selectedAccount._id, (error, result) => {
            if (error) {
                console.error('Error deleting client account:', error);
            } else {
                onDelete();
            }
        });
    };

    if (accountsLoading() || clientsLoading() || depositsLoading()) return <div>Loading...</div>;

    return (
        <div className="resource-profile">
            <div className="resource-info">
                <h3>CLIENT ACCOUNT:</h3>
                <label>Client: {selectedAccount.client?.fullname.last}</label>
                <br/>
                <label>Deposit: {selectedAccount.deposit?.name}</label>
                <br/>
                <label>Opening Date: {selectedAccount.account_opening_date?.toISOString().split('T')[0]}</label>
                <br/>
                <label>Closing
                    Date: {selectedAccount.account_closing_date ? selectedAccount.account_closing_date.toISOString().split('T')[0] : 'N/A'}</label>
                <br/>
                <label>Invested Amount: {selectedAccount.invested_amount}</label>
                <button className={"delete-button"} onClick={handleAccountDelete}>DELETE</button>
            </div>
            <EditAccount onUpdate={(updatedAccount) => setSelectedAccount(updatedAccount)} account={selectedAccount}/>
        </div>
    );
};

export default AccountProfile;
