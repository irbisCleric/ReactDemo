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
                sort: (prop) => {
                    usersActions.sortUsers(prop)
                },
                tableTitles: ['Name', 'Email'],
                tableFields: ['name', 'email'],
                selectable: true,
                filter: (e)=>{
                    usersActions.filterUsers(e);
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
                        func: ()=> {
                            console.log('edit')
                        }
                    }
                }
            }
        };
    }

    render() {
        return (
            <div>
                <div className="table-responsive">
                    <Table
                        tableData={this.props.tableData}
                        tableOptions={this.state.tableOptions}>

                        <If test={!this.props.tableData.length}>
                            <h2>No users</h2>
                        </If>

                        <DeleteUserModal deleteFunc={this.state.tableOptions.actions.remove.secondaryFunc}/>
                    </Table>
                </div>
            </div>
        )
    }
}

UsersTable.propTypes = {
    tableData: React.PropTypes.array.isRequired
};