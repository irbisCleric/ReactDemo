import $ from 'jquery';
import { Link } from 'react-router';
import If from './helpers/If';
import { Button, Modal } from 'react-bootstrap';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentUserIndex: null,
            currentUser: {}
        };
    }

    close() {
        this.setState({
            showModal: false,
            currentUserIndex: null,
            currentUser: {}
        });
    }

    confirm() {
        this.props.tableOptions.deleteFunc(this.state.currentUserIndex);
        this.close();
    }

    open(i, user) {
        this.setState({
            showModal: true,
            currentUserIndex: i,
            currentUser: user
        });
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
                                                <Button onClick={this.open.bind(this, i, user)}>Delete</Button>
                                            </td>
                                        </If>
                                        <td key={i}>
                                            <Link to={"users/" + user.id}>{user.id}</Link>
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

                <If test={!this.props.tableData.length}>
                    <h2>No users</h2>
                </If>

                <If test={this.state.showModal}>
                    <div className="static-modal">
                        <Modal.Dialog show={this.state.showModal}>
                            <Modal.Header>
                                <Modal.Title>Delete user</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Are you sure, you want to delete {this.state.currentUser.name} ?
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.close.bind(this)}>No</Button>
                                <Button onClick={this.confirm.bind(this)} bsStyle="primary">Yes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </If>
            </div>
        )
    }
}
