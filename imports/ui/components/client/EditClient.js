import React, {useEffect, useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {useForm} from "react-hook-form";

const EditClient = ({client, onUpdate}) => {

    const {register, handleSubmit, setValue, formState} = useForm();
    const {errors} = formState;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue('firstName', client.fullname.first);
        setValue('lastName', client.fullname.last);
        setValue('patronymic', client.fullname.patronymic);
        setValue('passportSeries', client.passport.series);
        setValue('passportNumber', client.passport.number);
        setValue('phone', client.phone);
        setValue('city', client.address.city);
        setValue('street', client.address.street);
        setValue('houseNumber', client.address.house_number);
    }, [client, setValue]);

    const onSubmit = (data) => {
        const updatedClient = {
            fullname: {
                first: data.firstName,
                last: data.lastName,
                patronymic: data.patronymic,
            },
            passport: {
                series: data.passportSeries,
                number: data.passportNumber,
            },
            phone: data.phone,
            address: {
                city: data.city,
                street: data.street,
                house_number: data.houseNumber,
            }
        };

        setLoading(true);

        Meteor.call('clients.update', client._id, updatedClient, (error, result) => {
            setLoading(false);
            if (error) {
                console.error('Error updating client:', error);
            } else {
                updatedClient._id = client._id;
                onUpdate(updatedClient);
            }
        });
    };

    return (
        <form className={"form-edit"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>EDIT CLIENT:</h3>
                <div>
                    <label>
                        First Name:
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="First name..."
                        autoComplete="off"
                        {...register("firstName", {
                            required: "Enter first name",
                        })}
                    />
                    <label>
                        {errors.firstName?.message}
                    </label>
                </div>

                <div>
                    <label>
                        Last Name:
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Last name..."
                        autoComplete="off"
                        {...register("lastName", {
                            required: "Enter last name",
                        })}
                    />
                    <label>
                        {errors.lastName?.message}
                    </label>
                </div>

                <div>
                    <label>
                        Patronymic:
                    </label>
                    <input
                        id="patronymic"
                        type="text"
                        placeholder="Patronymic..."
                        autoComplete="off"
                        {...register("patronymic", {
                            required: "Enter patronymic",
                        })}
                    />
                    <label>
                        {errors.patronymic?.message}
                    </label>
                </div>

                <div>
                    <label>
                        Passport Series:
                    </label>
                    <input
                        id="passportSeries"
                        type="number"
                        placeholder="Passport series..."
                        autoComplete="off"
                        {...register("passportSeries", {
                            required: "Enter passport series",
                        })}
                    />
                    <label>
                        {errors.passportSeries?.message}
                    </label>
                </div>

                <div>
                    <label>
                        Passport Number:
                    </label>
                    <input
                        id="passportNumber"
                        type="number"
                        placeholder="Passport number..."
                        autoComplete="off"
                        {...register("passportNumber", {
                            required: "Enter passport number",
                        })}
                    />
                    <label>
                        {errors.passportNumber?.message}
                    </label>
                </div>

                <div>
                    <label>
                        Phone Number:
                    </label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="Phone number..."
                        autoComplete="off"
                        {...register("phone", {
                            required: "Enter phone number",
                        })}
                    />
                    <label>
                        {errors.phone?.message}
                    </label>
                </div>

                <div>
                    <label>
                        Address
                    </label>
                    <br/>
                    <label>
                        City:
                    </label>
                    <input
                        id="city"
                        type="text"
                        placeholder="City..."
                        autoComplete="off"
                        {...register("city", {
                            required: "Enter city",
                        })}
                    />
                    <label>
                        {errors.city?.message}
                    </label>
                    <br/>
                    <label>
                        Street:
                    </label>
                    <input
                        id="street"
                        type="text"
                        placeholder="Street..."
                        autoComplete="off"
                        {...register("street", {
                            required: "Enter street",
                        })}
                    />
                    <label>
                        {errors.street?.message}
                    </label>
                    <br/>
                    <label>
                        House Number:
                    </label>
                    <input
                        id="houseNumber"
                        type="text"
                        placeholder="House number..."
                        autoComplete="off"
                        {...register("houseNumber", {
                            required: "Enter house number",
                        })}
                    />
                    <label>
                        {errors.houseNumber?.message}
                    </label>
                </div>

                <button className={"edit-button"} disabled={loading}>
                    {loading ? "EDITING..." : "EDIT"}
                </button>
            </div>
        </form>
    )
}

export default EditClient;
