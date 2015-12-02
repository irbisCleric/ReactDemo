import $ from 'jquery';
import { Link } from 'react-router';
import If from './helpers/If';
import { Button, Modal } from 'react-bootstrap';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';
export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <If test={this.props.tableData.length}>
                    <table className="table table-bordered col-lg-12">
                        <thead>
                            <tr>
                                <If test={this.props.tableOptions.delete}>
                                    <th>Delete</th>
                                </If>
                                {this.props.tableTitles.map((title, i) => {
                                    return (
                                        <th key={i}>{title}</th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tableData.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <If test={this.props.tableOptions.delete}>
                                            <td>
                                                <Button onClick={this.props.open.bind(this, i, user)}>Delete</Button>
                                            </td>
                                        </If>
                                        <td key={i}>
                                            <Link to={"users/" + user.id}>{user.email}</Link>
                                        </td>
                                        <td key={i + 'test'}>
                                            <Link to={"users/" + user.id} params={{name: 'test'}}>{user.name}</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </If>

                {this.props.children}
            </div>
        )
    }
}
