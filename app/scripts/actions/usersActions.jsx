import appDispatcher from '../dispatcher/appDispatcher';
import appConstants from '../constants/appConstants';

export default {
    deleteUser: function (index) {
        appDispatcher.dispatch({
            actionType: appConstants.USER_DELETE,
            index: index
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
    }

}
