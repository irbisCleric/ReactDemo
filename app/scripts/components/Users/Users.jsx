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
        this.state = {
            tableTitles: ['email', 'name'],
            tableData: [], //Users
            tableOptions: {
                delete: true,
                deleteFunc: (index) => {
                    usersActions.deleteUser(index);
                    this._onChange();
                }
            }
        };
    }
    componentDidMount() {
        this.setState({tableData: usersStore.getAll()});
    }

    _onChange() {
        this.setState({tableData: usersStore.getAll()});
    }

    render() {
        return (
            <div className={this.props.className}>
                <UsersTable {...this.state}/>
            </div>
        )
    }
}

