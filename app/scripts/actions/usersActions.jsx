import appDispatcher from '../dispatcher/appDispatcher';
import appConstants from '../constants/appConstants';

export default {
    deleteUser: function (user) {
        appDispatcher.dispatch({
            actionType: appConstants.USER_DELETE,
            user: user
        })
    },
    getUsers: function (index) {
        appDispatcher.dispatch({
            actionType: appConstants.USERS_GET
        })
    },
    addUser: function (user) {
        appDispatcher.dispatch({
            actionType: appConstants.USERS_ADD,
            user: user
        })
    },
    deleteUserModal: function(data){
        appDispatcher.dispatch({
            actionType: appConstants.OPEN_DELETE_USER_MODAL,
            data: data
        })
    },
    sortUsers: function(prop, desc){
        appDispatcher.dispatch({
            actionType: appConstants.SORT_USERS,
            prop: prop,
            desc: desc
        })
    },
    filterUsers:function(val){
        appDispatcher.dispatch({
            actionType: appConstants.FILTER_USERS,
            text: val
        })
    },
    toggleEditMode:function(user){
        appDispatcher.dispatch({
            actionType: appConstants.TOGGLE_EDIT_MODE,
            user: user
        })
    }

}
