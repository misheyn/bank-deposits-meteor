import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClientAccountCollection } from '../../../api/client_account';
import '../../styles/Resource.css';
import {ClientCollection} from "../../../api/clients";
import {DepositCollection} from "../../../api/deposits";

const AccountsList = ({ onSelect }) => {
    const accountsLoading = useSubscribe('client_account');
    const accounts = useFind(() => ClientAccountCollection.find());

    const clientsLoading = useSubscribe('clients');
    const depositsLoading = useSubscribe('deposits');
    const clients = useFind(() => ClientCollection.find());
    const deposits = useFind(() => DepositCollection.find());

    accounts.forEach((account) => {
        account.client = clients.find((client) => client._id === account.clientId)
        account.deposit = deposits.find((deposit) => deposit._id === account.depositId)
    });
    if (accountsLoading() || clientsLoading() || depositsLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Accounts:</h2>
            <div className="resource-list">
                {accounts.map((account) => (
                    <div key={account._id} onClick={() => onSelect(account)}>
                        <label>
                           Client: {account.client?.fullname.last} - Deposit: {account.deposit?.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountsList;
