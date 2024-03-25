import React, {useEffect} from "react";
import {Meteor} from 'meteor/meteor';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useTracker} from 'meteor/react-meteor-data';
import "../styles/Login.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;
    const [loading, setLoading] = useState(false);
    const user = useTracker(() => Meteor.user());

    useEffect(() => {
        if (user) {
            navigate("/clients");
            console.log(user);
        }
    }, [user, navigate]);
    const onRegister = async (data) => {
        const username = data.username;
        const password = data.password;
        setLoading(true);

        Accounts.createUser({
            username: username,
            password: password,
        }, (error) => {
            setLoading(false);
            if (error) {
                console.error(error);
            } else {
                navigate("/clients");
            }
        });
    };
    const onLogin = async (data) => {
        const username = data.username;
        const password = data.password;
        setLoading(true);

        Meteor.loginWithPassword(username, password, (error) => {
            setLoading(false);
            if (error) {
                console.error(error);
            } else {
                navigate("/clients");
            }
        });
    };

    return (
        <>
            <form className={"form-login"} onSubmit={handleSubmit(onLogin)} noValidate>
                <div>
                    <label>АВТОРИЗАЦИЯ</label>
                    <div>
                        <label htmlFor="username">
                            Имя пользователя:
                        </label>
                        <input
                            type="text"
                            placeholder="username..."
                            {...register("username", {
                                required: "Необходимо ввести имя пользователя",
                            })}
                        />
                        <label>
                            {errors.username?.message}
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                            Пароль:
                        </label>
                        <input
                            type="password"
                            placeholder="password..."
                            {...register("password", {
                                required: "Необходимо ввести пароль",
                            })}
                        />
                        <label>
                            {errors.password?.message}
                        </label>
                    </div>
                    <button disabled={loading}>
                        {loading ? "Loading" : "ВОЙТИ"}
                    </button>
                </div>
            </form>
            <form className={"form-register"} onSubmit={handleSubmit(onRegister)} noValidate>
                <button disabled={loading}>
                    {loading ? "Loading" : "ЗАРЕГИСТРИРОВАТЬСЯ"}
                </button>
            </form>
        </>
    );
};

export default LoginPage;