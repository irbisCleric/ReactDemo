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
            tableData: [], //Users
            tableOptions: {
                sort : (prop) => { usersActions.sortUsers(prop) },
                tableTitles: ['Name', 'Email'],
                tableFields: ['name', 'email'],
                actions: {
                    remove : {
                        func:(user) => {
                            usersActions.deleteUserModal(user);
                        },
                        secondaryFunc: (user) => {
                            usersActions.deleteUser(user);
                            this._onChange();
                        }
                    },
                    edit: {
                        func: ()=>{console.log('edit')}
                    }
                }
            }
        };
    }

    componentWillMount(){
        usersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        usersStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {
        if( usersStore.getAll().length < 1){
            usersStore.getHttpAll((results)=>{
                this._onChange(results);
            })
        } else {
            this._onChange();
        }
    }

    _onChange(data=usersStore.getAll()) {
        this.setState({tableData: data});
    }

    render() {
        return (
            <div className={this.props.className}>
                <UsersTable {...this.state}/>
            </div>
        )
    }
}

