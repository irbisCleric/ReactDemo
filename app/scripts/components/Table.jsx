import $ from 'jquery';
import { Link } from 'react-router';
import If from './helpers/If';
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    generateTableHead() {
        return (
            <thead>
            <tr>
                {
                    this.props.tableOptions.tableTitles.map((title, i) => {
                        return (
                        <th key={i}>{title}</th>);
                        })
                    }
                <If test={this.props.tableOptions.delete}>
                    <th>Actions</th>
                </If>
            </tr>
            </thead>
        )
    }

    generateTableRow() {
        return this.props.tableData.map((item, i) => {
            return (
                <tr key={i}>
                    {this.generateTableRowData(item)}
                    <If test={this.props.tableOptions.delete}>
                        <td>
                            <OverlayTrigger
                                trigger="click"
                                placement="top"
                                overlay={
                                    <Popover id="some-id-{i}">
                                        <Button className="btn btn-primary">
                                            <i className="glyphicon glyphicon-pencil"></i>
                                        </Button>
                                        <Button
                                            className="btn btn-danger"
                                            onClick={this.props.open.bind(this, i, item)}>
                                            <i className="glyphicon glyphicon-trash"></i>
                                        </Button>
                                    </Popover>
                                    }>
                                <Button bsStyle="default">
                                    <i className="glyphicon glyphicon-cog"></i>
                                </Button>
                            </OverlayTrigger>
                            <div className="btn-group">


                            </div>
                        </td>
                    </If>
                </tr>
            );
        })
    }

    generateTableRowData(item) {
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
