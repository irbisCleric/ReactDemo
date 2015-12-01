import Header from './Header/Header';

import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                            <Popover title="Popover bottom" id="some-id">
                                <strong>Holy guacamole!</strong>
                                    Check this info.
                                </Popover>
                                }>
                        <Button bsStyle="default">Holy guacamole!</Button>
                    </OverlayTrigger>
                    <Header/>
                </div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

