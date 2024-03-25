import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {useForm} from 'react-hook-form';
import {useFind, useSubscribe} from "meteor/react-meteor-data";
import {ClientCollection} from "../../../api/clients";
import {DepositCollection} from "../../../api/deposits";
import '../../styles/Add.css';

const AddAccount = () => {
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;
    const [loading, setLoading] = useState(false);

    const clientsLoading = useSubscribe('clients');
    const depositsLoading = useSubscribe('deposits');
    const clients = useFind(() => ClientCollection.find());
    const deposits = useFind(() => DepositCollection.find());

    const onSubmit = (data) => {
        const account = {
            clientId: data.clientId,
            depositId: data.depositId,
            account_opening_date: new Date(data.accountOpeningDate),
            account_closing_date: data.accountClosingDate
                ? new Date(data.accountClosingDate)
                : null,
            invested_amount: parseFloat(data.investedAmount),
        };

        setLoading(true);

        Meteor.call('client_account.insert', account, (error, result) => {
            setLoading(false);
            if (error) {
                console.error('Error adding client account:', error);
            }
        });
    };
    if (depositsLoading() || clientsLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <form className={"form-add"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p>ADD CLIENT ACCOUNT:</p>
                <div>
                    <label>Client:</label>
                    <select
                        id="clientId"
                        {...register('clientId', {
                            required: 'Choose client',
                        })}
                    > {
                        clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.fullname.last} {client.fullname.first}
                            </option>
                        ))
                    }
                    </select>
                    <label>{errors.clientCode?.message}</label>
                </div>

                <div>
                    <label>Deposit:</label>
                    <select
                        id="depositId"
                        {...register('depositId', {
                            required: 'Choose deposit',
                        })}
                    > {
                        deposits.map((deposit) => (
                            <option key={deposit._id} value={deposit._id}>
                                {deposit.name}
                            </option>
                        ))
                    }
                    </select>
                    <label>{errors.depositCode?.message}</label>
                </div>

                <div>
                    <label>Account Opening Date:</label>
                    <input
                        id="accountOpeningDate"
                        type="date"
                        placeholder="Opening date..."
                        {...register('accountOpeningDate', {
                            required: 'Enter account opening date',
                        })}
                    />
                    <label>{errors.accountOpeningDate?.message}</label>
                </div>

                <div>
                    <label>Account Closing Date:</label>
                    <input
                        id="accountClosingDate"
                        type="date"
                        placeholder="Closing date..."
                        {...register('accountClosingDate')}
                    />
                    <label>{errors.accountClosingDate?.message}</label>
                </div>

                <div>
                    <label>Invested Amount:</label>
                    <input
                        id="investedAmount"
                        type="number"
                        step="0.01"
                        placeholder="Invested amount..."
                        {...register('investedAmount', {
                            required: 'Enter invested amount',
                        })}
                    />
                    <label>{errors.investedAmount?.message}</label>
                </div>

                <button disabled={loading}> {loading ? 'Adding...' : 'ADD'}</button>
            </div>
        </form>
    );
};

export default AddAccount;
