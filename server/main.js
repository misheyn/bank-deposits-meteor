import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';
import {ClientCollection} from '/imports/api/clients';
import {DepositCollection} from '/imports/api/deposits';
import {ClientAccountCollection} from '/imports/api/client_account';

const collections = [
    ClientCollection,
    DepositCollection,
    ClientAccountCollection,
];

Meteor.startup(() => {
    if (Meteor.users.find().count() === 0) {
        const userId = Accounts.createUser({
            username: 'admin',
            password: 'admin',
        });
        Roles.addUsersToRoles(userId, 'admin');
    }
});

Meteor.methods({
    'user.login'({username, password}) {
        const user = Meteor.users.findOne({username});

        return !!(user && Accounts._checkPassword(user, password));
    },
});

const addDBMethods = (collection) => {
    const collectionName = collection._name;

    Meteor.methods({
        [`${collectionName}.insert`](document) {
            return collection.insert(document);
        },

        [`${collectionName}.update`](documentId, updatedDocument) {
            return collection.update({_id: documentId}, updatedDocument, {replace: true});
        },

        [`${collectionName}.delete`](documentId) {
            return collection.remove(documentId);
        },
    });

    Meteor.publish(collectionName, function () {
        return collection.find();
    });
};

collections.forEach((collection) => addDBMethods(collection));
