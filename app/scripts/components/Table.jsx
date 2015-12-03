import $ from 'jquery';
import { Link } from 'react-router';
import If from './helpers/If';
import { Button, Modal } from 'react-bootstrap';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';
export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    generateTableHead (){
        return  <thead>
                    <tr>
                        <If test={this.props.tableOptions.delete}>
                            <th>Delete</th>
                        </If>
                        {this.props.tableOptions.tableTitles.map((title, i) => {
                            return (
                                <th key={i}>{title}</th>);
                        })}
                    </tr>
                </thead>
    }

    generateTableRow(){
        return this.props.tableData.map((item, i) => {
            return (
                <tr key={i}>
                    <If test={this.props.tableOptions.delete}>
                        <td>
                            <Button onClick={this.props.open.bind(this, i, item)}>Delete</Button>
                        </td>
                    </If>
                   {this.generateTableRowData(item)}
                </tr>
            );
        })
    }

    generateTableRowData (item){
        return this.props.tableOptions.tableFields.map((fieldName, i) => {
            return (<td key={i}>
                <Link to={"users/" + item.name}>{item[fieldName]}</Link>
            </td>)
        })
    }

    render() {
        return (
            <div>
                <If test={this.props.tableData.length}>
                    <table className="table table-bordered col-lg-12">
                        {this.generateTableHead()}
                        <tbody>
                            {this.generateTableRow()}
                        </tbody>
                    </table>
                </If>

                {this.props.children}
            </div>
        )
    }
}
