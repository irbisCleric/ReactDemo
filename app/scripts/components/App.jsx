import Header from './Header/Header';

import { Button, Modal } from 'react-bootstrap';

let Example = React.createClass({
    getInitialState() {
        return {
            showModal: false
        };
    },

    close() {
        this.setState({
            showModal: false
        });
    },

    open() {
        this.setState({
            showModal: true
        });
    },

    render() {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Example />
                    <Header/>
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

