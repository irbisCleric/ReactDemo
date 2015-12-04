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
                this._onChange(results);
            })
        } else {
            this._onChange();
        }
    }

    _onChange(data = usersStore.getAll()) {
        this.setState({tableData: data});
    }

    render() {
        return (
            <div className={this.props.className}>
                <UsersTable tableData={this.state.tableData}/>
            </div>
        )
    }
}

