/**
 * Created by skok on 27.11.15.
 */
import { Router, Route, Link } from 'react-router';
import './Header.scss';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React</h1>

                <div className="button-group">
                    <Link to="/" className="button">Home</Link>
                    <Link to="/users" className="button" activeClassName='active'>Users</Link>
                    <Link to="/create-user" className="button" activeClassName='active'>Create User</Link>
                </div>
            </div>
        )
    }
}


