import './Header.scss';

import { Router, Route, Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React</h1>
                <div className="btn-group">
                    <Link to="/" className="btn btn-primary">Home</Link>
                    <Link to="/users" className="btn btn-primary" activeClassName='active'>Users</Link>
                    <Link to="/create-user" className="btn btn-primary" activeClassName='active'>Create User</Link>
                </div>
            </div>
        )
    }
}


