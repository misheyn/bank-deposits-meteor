import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ClientsPage from './components/client/ClientPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import DepositPage from "./components/deposit/DepositPage";
import AccountPage from "./components/client_account/AccountPage";

export const App = () => (
    <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<LoginPage/>} exact/>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={['user', 'admin']}
                        />
                    }
                >
                    <Route path="/deposits" element={<DepositPage/>} exact/>
                </Route>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={['user', 'admin']}
                        />
                    }
                >
                    <Route path="/client_account" element={<AccountPage/>} exact/>
                </Route>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={['user', 'admin']}
                        />
                    }
                >
                    <Route path="/clients" element={<ClientsPage/>} exact/>
                </Route>
                <Route
                    element={
                        <RequireAuth
                            allowedRoles={['user', 'admin']}
                        />
                    }
                >
                </Route>
            </Routes>
        </BrowserRouter>
    </>
);

export default App;
