import $ from 'jquery';
import { Link } from 'react-router';
import If from './helpers/If';
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.TO = this.props.tableOptions;
    }

    generateTableHead() {
        return (
            <thead>
            <tr>
                {
                    this.TO.tableTitles.map((title, i) => {
                        return (
                        <th key={i}>{title}</th>);
                        })
                    }
                <If test={this.TO.actions}>
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
                    <If test={this.TO.actions}>
                        <td>
                            <OverlayTrigger
                                trigger="click"
                                placement="top"
                                overlay={
                                    <Popover id="some-id-{i}">
                                        <If test={this.TO.actions.edit}>
                                            <Button className="btn btn-primary">
                                                <i className="glyphicon glyphicon-pencil" onClick={this.TO.actions.edit.func}></i>
                                            </Button>
                                        </If>
                                        <If test={this.TO.actions.remove}>
                                            <Button
                                                className="btn btn-danger"
                                                onClick={this.TO.actions.remove.func.bind(this, item)}>
                                                <i className="glyphicon glyphicon-trash"></i>
                                            </Button>
                                            </If>
                                    </Popover>
                                    }>
                                <Button bsStyle="default">
                                    <i className="glyphicon glyphicon-cog"></i>
                                </Button>
                            </OverlayTrigger>
                        </td>
                    </If>
                </tr>
            );
        })
    }

    generateTableRowData(item) {
        return this.TO.tableFields.map((fieldName, i) => {
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
