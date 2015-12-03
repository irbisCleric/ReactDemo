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
    }
    open(i, user){
        var data = {i,user}
        usersActions.deleteUserModal(data);
    }

    render() {
        return (
            <div>
                <div>
                    <Table
                        open={this.open}
                        tableData={this.props.tableData}
                        tableOptions={this.props.tableOptions}
                        tableTitles={this.props.tableTitles}>

                        <If test={!this.props.tableData.length}>
                            <h2>No users</h2>
                        </If>

                        <DeleteUserModal deleteFunc={this.props.tableOptions.deleteFunc}/>
                    </Table>
                </div>
            </div>
        )
    }
}
