import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useForm } from 'react-hook-form';
import '../../styles/Add.css';

const AddDeposit = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        const deposit = {
            name: data.name,
            storage_period: parseInt(data.storagePeriod, 10),
            rate: parseFloat(data.rate),
        };

        setLoading(true);

        Meteor.call('deposits.insert', deposit, (error, result) => {
            setLoading(false);
            if (error) {
                console.error('Error adding deposit:', error);
            }
        });
    };

    return (
        <form className={"form-add"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p>ADD DEPOSIT:</p>
                <div>
                    <label>Name:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name..."
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
                        placeholder="Storage period..."
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
                        placeholder="Rate..."
                        step="0.1"
                        {...register('rate', {
                            required: 'Enter rate',
                        })}
                    />
                    <label>{errors.rate?.message}</label>
                </div>

                <button disabled={loading}> {loading ? 'Adding...' : 'ADD'}</button>
            </div>
        </form>
    );
};

export default AddDeposit;
