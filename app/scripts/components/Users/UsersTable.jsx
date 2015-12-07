import $ from 'jquery';
import { Link } from 'react-router';
import If from '../helpers/If';
import Table from '../Table';
import DeleteUserModal from './DeleteUserModal';
import { Button, Modal } from 'react-bootstrap';

import usersActions from '../../actions/usersActions';
import usersStore from '../../stores/usersStore';

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
                },
                actions: {
                    remove: {
                        func: (user) => {
                            usersActions.deleteUserModal(user);
                        },
                        secondaryFunc: (user) => {
                            usersActions.deleteUser(user);
                        }
                    },
                    edit: {
                        func: (user) => {
                            usersActions.toggleEditMode(user);
                        },
                        secondaryFunc: (user, save) => {
                            //usersActions.toggleEditMode(user, save);
                        }
                    }
                }
            }
        };
    }

    render() {
        return (
            <Table
                tableData={this.props.tableData}
                tableOptions={this.state.tableOptions}>

                <If test={!this.props.tableData.length}>
                    <h2>No users</h2>
                </If>

                <DeleteUserModal deleteFunc={this.state.tableOptions.actions.remove.secondaryFunc}/>
            </Table>
        )
    }
}

UsersTable.propTypes = {
    tableData: React.PropTypes.array.isRequired
};