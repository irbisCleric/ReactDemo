import $ from 'jquery';
import { EventEmitter } from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import BaseStore from './baseStore';
import appConstants from '../constants/appConstants';

var modalData = {};

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
        this.removeById(id);
    }

    openDeleteUserModal(...data) {
        modalData = data[0];
        this.emitChange();
    }

    getDeleteUserModal() {
        return modalData;
    }
}

let store = new userStore();

appDispatcher.register((payload) => {
    switch (payload.actionType) {
        case appConstants.USER_DELETE:
            store.deleteUser(payload.index.id);
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
    }
    return true;
})

export default store;
