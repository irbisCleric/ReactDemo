import { Button, Modal } from 'react-bootstrap';
import If from '../helpers/If';

import usersActions from '../../actions/usersActions';
import usersStore from '../../stores/usersStore';

//TODO context were made from the ass
var self;

export default class DeleteUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentUserId: null,
            currentUser: {}
        };
        self = this;
    }

    close() {
        this.setState({
            showModal: false,
            currentUserId: null,
            currentUser: {}
        });
    }

    confirm() {
        this.props.deleteFunc(usersStore.getDeleteUserModal());
        this.close();
    }

    componentWillMount(){
        usersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        usersStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
        self.setState({
            showModal:true,
            currentUser: usersStore.getDeleteUserModal()
        })
    }

    render() {
        return (
            <div>
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
