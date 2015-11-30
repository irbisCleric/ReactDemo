/**
 * Created by skok on 26.11.15.
 */
import $ from 'jquery';
import { Link } from 'react-router';
import Table from './Table';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableTitles: ['Id', 'name'],
            tableData: [], //Users
            tableOptions: {
                delete: true,
                deleteFunc: (index) => {
                    let newData = this.state.tableData.slice(); //copy array
                    newData.splice(index, 1); //remove element
                    this.setState({tableData: newData});
                }
            }
        };
        let url = "http://www.filltext.com/?rows=10&id={index}&name={firstName}";
        $.get(url, (result) => this.setState({tableData:result}));
    }    

    render() {     
        return (
            <div className={this.props.className}>
                <Table {...this.state}/>
            </div>
        )
    }   
};
