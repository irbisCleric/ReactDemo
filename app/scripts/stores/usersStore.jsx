import $ from 'jquery';
import { EventEmitter } from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import BaseStore from './baseStore';
import appConstants from '../constants/appConstants';


let modalData = {},
     originalUsers = null,
     _currentUser = null,

     _activePage = 0,
     _limit = 5;

class userStore extends BaseStore {
    constructor(...args) {
        super(...args);
    }
    getActivePage(){
        return _activePage;
    }
    setActivePage(n){
        _activePage = n;
        this.emitChange();
    }
    getLimit(){
        return _limit;
    }
    setLimit(l){
        _limit = l;
        this.emitChange();
    }

    getTotal(){
        return this.getSize() / this.getLimit();
    }

    getHttpAll(callback) {
        //let url = "http://www.filltext.com/?rows=10&email={email}&name={firstName}&id={index}&desc={lorem|20}";
        let url = "http://localhost:1715/api/list";
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
        if (id) {
            let item = this.getById(id);
            originalUsers && originalUsers.delete(item);
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

    sortUsers(prop, desc) {
        function compare(a, b) {
            if (a[prop] < b[prop])
                return -1;
            if (a[prop] > b[prop])
                return 1;
            return 0;
        }

        let users = this.getAll();
        let sortedUsers = users.sort(compare);
        if(desc){
            sortedUsers = sortedUsers.reverse();
        }
        this.setAll(sortedUsers);
    }

    filterUsers(value) {
        let result;

        // we just start filtering and make copy of users   
        if (!originalUsers) {
            originalUsers = this.data;
            result = Array.from(this.data);
        } else {
        // we still filtering and manipulate with copy of original list of users            
            result = Array.from(originalUsers);
        }

        if (value !== "all"){
            result = result.filter((item) => (item.id === value));
        }

        this.setAll(result);
    }

    toggleEditUser(user){
        user.showEdit = !user.showEdit;
        _currentUser = user;
        this.update(user.id, _currentUser);
    }

    getCurrent () {
        return _currentUser;
    }

    saveUser (user){
        user.showEdit = false;
        this.update(user.id, user);
        _currentUser = null;
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
            store.sortUsers(payload.prop, payload.desc);
            break;
        case appConstants.FILTER_USERS:
            store.filterUsers(payload.text);
            break;
        case appConstants.TOGGLE_EDIT_MODE:
            store.toggleEditUser(payload.user);
            break;
        case appConstants.SAVE_USER:
            store.saveUser(payload.user);
            break;
    }

    return true;
});

export default store;
