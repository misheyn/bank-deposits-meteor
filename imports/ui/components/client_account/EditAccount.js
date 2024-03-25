import React, {useState, useEffect} from 'react';
import {Meteor} from 'meteor/meteor';
import {useForm} from 'react-hook-form';
import {useFind, useSubscribe} from "meteor/react-meteor-data";
import {ClientCollection} from "../../../api/clients";
import {DepositCollection} from "../../../api/deposits";

const EditAccount = ({account, onUpdate}) => {
    const {register, handleSubmit, setValue, formState} = useForm();
    const {errors} = formState;
    const [loading, setLoading] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(account);

    const clientsLoading = useSubscribe('clients');
    const depositsLoading = useSubscribe('deposits');
    const clients = useFind(() => ClientCollection.find());
    const deposits = useFind(() => DepositCollection.find());

    useEffect(() => {
        setSelectedAccount(account);
        setValue('accountNumber', account.account_number);
        setValue('clientId', account.clientId);
        setValue('depositId', account.depositId);
        setValue('accountOpeningDate', account.account_opening_date.toISOString().split('T')[0]);
        setValue('accountClosingDate', account.account_closing_date ? account.account_closing_date.toISOString().split('T')[0] : null);
        setValue('investedAmount', account.invested_amount);
    }, [account, setValue]);

    const onSubmit = (data) => {
        const updatedAccount = {
            clientId: data.clientId,
            depositId: data.depositId,
            account_opening_date: new Date(data.accountOpeningDate),
            account_closing_date: data.accountClosingDate
                ? new Date(data.accountClosingDate)
                : null,
            invested_amount: parseFloat(data.investedAmount),
        };

        setLoading(true);

        Meteor.call('client_account.update', account._id, updatedAccount, (error, result) => {
            setLoading(false);
            if (error) {
                console.error('Error updating client account:', error);
            } else {
                updatedAccount._id = account._id
                updatedAccount.client = clients.find((client) => client._id === updatedAccount.clientId)
                updatedAccount.deposit = deposits.find((deposit) => deposit._id === updatedAccount.depositId)
                onUpdate(updatedAccount);
            }
        });
    };

    if (depositsLoading() || clientsLoading()) {
        return <div>Loading...</div>;
    }

    return (
        <form className={"form-edit"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>EDIT CLIENT ACCOUNT:</h3>

                <div>
                    <label>Client:</label>
                    <select
                        id="clientId"
                        defaultValue={selectedAccount.clientId}
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
                        defaultValue={selectedAccount.depositId}
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
                        {...register('investedAmount', {
                            required: 'Enter invested amount',
                        })}
                    />
                    <label>{errors.investedAmount?.message}</label>
                </div>

                <button className={"edit-button"} disabled={loading}>
                    {loading ? "EDITING..." : "EDIT"}
                </button>
            </div>
        </form>
    );
};

export default EditAccount;
