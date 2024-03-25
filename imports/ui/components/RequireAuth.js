import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet, Navigate } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

const RequireAuth = ({ allowedRoles }) => {
    const user = useTracker(() => Meteor.user());
    const userRoles = useTracker(() => {
        return user ? Roles.getRolesForUser(user._id) : [];
    });


    return user ? (
        (
            <Outlet/>
        )
    ) : (
        <Navigate to="/login" />
    );
};

export default RequireAuth;