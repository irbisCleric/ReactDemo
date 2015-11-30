/**
 * Created by skok on 26.11.15.
 */
import $ from 'jquery';
import { Link } from 'react-router';
import Table from './Table';
import usersActions from '../actions/usersActions';
import usersStores from '../stores/usersStores';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tableTitles: ['Id', 'name'],
            tableData: [], //Users
            tableOptions: {
                delete: true,
                deleteFunc: (index) => {                    
                    usersActions.deleteUser(index);
                }
            }
        };        
    }  

    componentDidMount(){
        usersStores.getHttpAll()
        this.setState({tableData:usersStores.getAll()});
        usersStores.addChangeListener(this._onChange.bind(this));
    } 

    componentWillUnmount(){
        usersStores.removeChangeListener(this._onChange.bind(this));
    } 

    _onChange(){
        this.setState({tableData:usersStores.getAll()});
    }

    render() {     
        return (
            <div className={this.props.className}>
                <Table {...this.state}/>
            </div>
        )
    }   
};
