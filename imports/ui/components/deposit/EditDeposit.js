import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from 'react-hook-form';

const EditDeposit = ({ deposit, onUpdate }) => {

    const { register, handleSubmit, setValue, formState } = useForm();
    const { errors } = formState;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue('name', deposit.name);
        setValue('storagePeriod', deposit.storage_period);
        setValue('rate', deposit.rate);
    }, [deposit, setValue]);

    const onSubmit = (data) => {
        const updatedDeposit = {
            deposit_code: parseInt(data.depositCode, 10),
            name: data.name,
            storage_period: parseInt(data.storagePeriod, 10),
            rate: parseFloat(data.rate),
        };

        setLoading(true);

        Meteor.call('deposits.update', deposit._id, updatedDeposit, (error, result) => {
            setLoading(false);
            if (error) {
                console.error('Error updating deposit:', error);
            } else {
                updatedDeposit._id = deposit._id;
                onUpdate(updatedDeposit);
            }
        });
    };

    return (
        <form className={"form-edit"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>EDIT DEPOSIT:</h3>
                <div>
                    <label>Name:</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: 'Enter name',
                        })}
                    />
                    <label>{errors.name?.message}</label>
                </div>

                <div>
                    <label>Storage Period:</label>
                    <input
                        id="storagePeriod"
                        type="number"
                        {...register('storagePeriod', {
                            required: 'Enter storage period',
                        })}
                    />
                    <label>{errors.storagePeriod?.message}</label>
                </div>

                <div>
                    <label>Rate:</label>
                    <input
                        id="rate"
                        type="number"
                        step="0.01"
                        {...register('rate', {
                            required: 'Enter rate',
                        })}
                    />
                    <label>{errors.rate?.message}</label>
                </div>

                <button className={"edit-button"} disabled={loading}>
                    {loading ? 'EDITING...' : 'EDIT'}
                </button>
            </div>
        </form>
    );
};

export default EditDeposit;
