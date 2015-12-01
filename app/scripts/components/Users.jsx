/**
 * Created by skok on 26.11.15.
 */
import $ from 'jquery';
import { Link } from 'react-router';
import Table from './Table';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';

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

    componentWillUnmount() {
        usersStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState({tableData: usersStore.getAll()});
    }

    render() {
        return (
            <div className={this.props.className}>
                <Table {...this.state}/>
            </div>
        )
    }
}

