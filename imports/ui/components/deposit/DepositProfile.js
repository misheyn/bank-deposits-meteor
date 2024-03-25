import React, {useState, useEffect} from 'react';
import EditDeposit from './EditDeposit';
import "../../styles/Resource.css"

const DepositProfile = ({deposit, onDelete}) => {

    const [selectedDeposit, setSelectedDeposit] = useState(deposit);

    useEffect(() => {
        setSelectedDeposit(deposit);
    }, [deposit]);

    const handleDepositDelete = () => {
        Meteor.call('deposits.delete', selectedDeposit._id, (error, result) => {
            if (error) {
                console.error('Error deleting deposit:', error);
            } else {
                onDelete();
            }
        });
    };

    return (
        <div className="resource-profile">
            <div className="resource-info">
                <h3>DEPOSIT:</h3>
                <label>Name: {selectedDeposit?.name}</label>
                <br/>
                <label>Storage Period: {selectedDeposit?.storage_period}</label>
                <br/>
                <label>Rate: {selectedDeposit?.rate}</label>
                <button className={"delete-button"} onClick={handleDepositDelete}>DELETE</button>
            </div>
            <EditDeposit onUpdate={(updatedDeposit) => setSelectedDeposit(updatedDeposit)}
                         deposit={selectedDeposit}/>
        </div>
    );
};

export default DepositProfile;
