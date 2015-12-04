import $ from 'jquery';
import { EventEmitter } from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import BaseStore from './baseStore';
import appConstants from '../constants/appConstants';

let modalData = {};

class userStore extends BaseStore {
    constructor(...args) {
        super(...args);
    }

    getHttpAll(callback) {
        let url = "http://www.filltext.com/?rows=10&email={email}&name={firstName}&id={index}";
        $.get(url, (result) => {
            this.data = new Set(result);
            callback(result);
        });
    }

    addUser(user) {
        this.set(user);
    }

    deleteUser(id) {
        modalData = {};
        if(id){
            this.removeById(id);
        }
    }

    openDeleteUserModal(user) {
        modalData = user;
        this.emitChange();
    }

    getDeleteUserModal() {
        return modalData;
    }

    sortUsers(prop){
        function compare(a,b) {
            if (a[prop] < b[prop])
                return -1;
            if (a[prop] > b[prop])
                return 1;
            return 0;
        }
        let users = this.getAll();

        this.setAll(users.sort(compare));
    }
}

let store = new userStore();

appDispatcher.register((payload) => {
    switch (payload.actionType) {
        case appConstants.USER_DELETE:
            /*
            * Null if we close modal without removal
            */
            let id = payload.user ? payload.user.id : null;
            store.deleteUser(id);
            break;
        case appConstants.USERS_ADD:
            store.addUser(payload.user);
            break;
        case appConstants.USERS_GET:
            store.getHttpAll();
            break;
        case appConstants.OPEN_DELETE_USER_MODAL:
            store.openDeleteUserModal(payload.data);
            break;
        case appConstants.SORT_USERS:
            store.sortUsers(payload.prop);
            break;
    }
    return true;
})

export default store;
