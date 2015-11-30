import $ from 'jquery';
import { EventEmitter } from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import appConstants from '../constants/appConstants';
import assign from 'object-assign';
let Store = {
    users: []
}

let appStore = assign(Store, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(appConstants.CHANGED)
    },
    addChangeListener: function(callback) {
        this.on(appConstants.CHANGED, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(appConstants.CHANGED, callback);
    },
    getAll: function() {
        return Store.users;
    },
    getHttpAll: function() {
        if (Store.users.length){
            return;
        }
        let url = "http://www.filltext.com/?rows=10&id={index}&name={firstName}";
        $.get(url, (result) => {
            Store.users = result;
            appStore.emitChange();
        });
    },
    addUser: function(user) {
        Store.users.push(user);
        appStore.emitChange();
    },
    deleteUser: function(index) {
        let newData = Store.users.slice(); //copy array
        newData.splice(index, 1); //remove element
        Store.users = newData;
        appStore.emitChange();
    }
})

appDispatcher.register((payload) => {
    switch (payload.actionType) {
        case appConstants.USER_DELETE:
            appStore.deleteUser();
            break;
        case appConstants.USERS_ADD:
            appStore.addUser(payload.user);
            break;
        case appConstants.USERS_GET:
            appStore.getHttpAll();
            break;
    }
    return true;
})

export default appStore;
