/**
 * Created by skok on 26.11.15.
 */
import $ from 'jquery';
import { Link } from 'react-router';
import UsersTable from './UsersTable';
import usersActions from '../../actions/usersActions';
import usersStore from '../../stores/usersStore';

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);
        this.state = {
            tableData: [] //Users
        };
    }

    componentWillMount() {
        usersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        usersStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {
        if (usersStore.getAll().length < 1) {
            usersStore.getHttpAll((results)=> {
                usersStore.setAll(results);
            })
        } else {
            this._onChange();
        }
    }

    getStateFromStores(){
        return  {
            tableData: usersStore.getAll().splice(
                usersStore.getActivePage() * usersStore.getLimit(),
                usersStore.getLimit()),
            activePage: usersStore.getActivePage(),
            limit: usersStore.getLimit(),
            total: usersStore.getTotal()
        }
    }

    _onChange() {
        let state = this.getStateFromStores();
        this.setState(state);
    }

    render() {
        return (
            <div className={this.props.className}>
                <UsersTable {...this.state}/>
            </div>
        )
    }
}

