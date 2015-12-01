import $ from 'jquery';
import { EventEmitter } from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import BaseStore from './baseStore';
import appConstants from '../constants/appConstants';

class userStore extends BaseStore {
    constructor(...args) {
        super(...args);
    }

    getHttpAll() {
        // TODO refactor this http first request
        return;

        if (Store.users.length) {
            return;
        }
        let url = "http://www.filltext.com/?rows=10&id={index}&name={firstName}";
        $.get(url, (result) => {
            Store.users = result;
            this.emitChange();
        });
    }

    addUser(user) {
        this.set(user);
    }

    deleteUser(index) {
        this.removeById(index);
    }
}

let store = new userStore();

appDispatcher.register((payload) => {
    switch (payload.actionType) {
        case appConstants.USER_DELETE:
            store.deleteUser();
            break;
        case appConstants.USERS_ADD:
            store.addUser(payload.user);
            break;
        case appConstants.USERS_GET:
            store.getHttpAll();
            break;
    }
    return true;
})

export default store;
