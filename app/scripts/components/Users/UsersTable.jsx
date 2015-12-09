import $ from 'jquery';
import { Link } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import DeleteUserModal from './DeleteUserModal';

import If from './../helpers/If';
import Table from './../Table';

import usersActions from './../../actions/usersActions';
import usersStore from './../../stores/usersStore';

export default class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //Users
            tableOptions: {
                tableTitles: ['Name', 'Email'],
                tableFields: ['name', 'email'],
                selectable: true,
                filter: (e) => {
                    usersActions.filterUsers(e);
                },
                sort: (prop) => {
                    usersActions.sortUsers(prop);
                }
            },
            tableActions: {
                editUser: {
                    editFunc: (user) => {
                        usersActions.toggleEditMode(user);
                    },
                    saveFunc: (user) => {
                        usersStore.saveUser(user);
                    }
                },
                removeUser: {
                    btnAction: (user) => {
                        usersActions.deleteUserModal(user);
                    },
                    modalAction: (user) => {
                        usersActions.deleteUser(user);
                    }
                },
                handleSelect(item, e) {
                    let copy = Object.assign({}, item);
                    copy.selected = e.target.checked;

                    usersStore.update(copy.id, copy);
                },
                handleSelectAll(e) {
                    let newData = this.props.tableData.map((item) => {
                        item.selected = e.target.checked;
                        return item;
                    });
                    usersStore.setAll(newData);
                }
            }
        };
    }

    render() {
        return (
            <Table
                tableData={this.props.tableData}
                tableOptions={this.state.tableOptions}
                tableActions={this.state.tableActions}>

                <If test={!this.props.tableData.length}>
                    <h2>No users</h2>
                </If>

                <DeleteUserModal deleteFunc={this.state.tableActions.removeUser.modalAction}/>
            </Table>
        )
    }
}

UsersTable.propTypes = {
    tableData: React.PropTypes.array.isRequired
};