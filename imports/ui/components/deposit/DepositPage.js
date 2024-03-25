import React, {useState} from 'react';
import DepositList from './DepositList';
import AddDeposit from './AddDeposit';
import DepositProfile from './DepositProfile';
import '../../styles/Resource.css';

const DepositPage = () => {
    const [selectedDeposit, setSelectedDeposit] = useState(null);

    return (
        <div className="page">
            <AddDeposit onUpdate={() => setSelectedDeposit(null)}/>
            <div className="main-container">
                <DepositList onSelect={(deposit) => setSelectedDeposit(deposit)}/>
                {selectedDeposit ? (
                    <DepositProfile deposit={selectedDeposit} onDelete={() => setSelectedDeposit(null)}/>
                ) : null}
            </div>
        </div>
    );
};

export default DepositPage;
