import React from 'react';
import {useFind, useSubscribe} from 'meteor/react-meteor-data';
import {DepositCollection} from '../../../api/deposits';
import '../../styles/Resource.css';

const DepositList = ({onSelect}) => {
    const depositsLoading = useSubscribe('deposits');
    const deposits = useFind(() => DepositCollection.find());

    if (depositsLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Deposits:</h2>
            <div className="resource-list">
                {deposits.map((deposit) => (
                    <div key={deposit._id} onClick={() => onSelect(deposit)}>
                        <label>
                            Name: {deposit.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepositList;
