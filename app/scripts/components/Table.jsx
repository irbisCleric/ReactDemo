import $ from 'jquery';
import { Link } from 'react-router';
import If from './helpers/If';
import { Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';
import { EditRow } from './Table/EditRow';
import { RemoveSelectedRow } from './Table/RemoveSelectedRow';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.TO = this.props.tableOptions;
        this.state = {
            filterText: '',
            sort: {},
            data: this.props.tableData
        }
    }

    sort(i) {
        let prop = this.TO.tableFields[i];
        this.TO.sort(prop);
        this.setState({
            sort: {
                prop: prop
            }
        })
    }

    handleSelect(item, e) {
        let copy = Object.assign({}, item);
        copy.selected = e.target.checked;
        usersStore.update(copy.id, copy);
    }

    handleSelectAll(e) {
        let newData = this.props.tableData.map((item, i) => {
            item.selected = e.target.checked;
            return item;
        });
        usersStore.setAll(newData);
    }

    generateTableControls(){
        return(
            <div className="row">
                <div className="col-lg-9">
                    <RemoveSelectedRow />
                </div>
                <div className="col-lg-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={this.props.filterText}
                        onChange={this.TO.filter}
                        className="form-control"
                    />
                </div>
            </div>
        )
    }

    generateTableHead() {
        return (
            <thead>
                <tr>
                    { this.TO.selectable ?
                        <th>
                            <input type="checkbox" onChange={this.handleSelectAll.bind(this)}/>
                        </th>
                        : null}
                    {
                        this.TO.tableTitles.map((title, i) => {
                            return (
                                <th key={i}
                                    className={ (this.TO.tableFields[i] === this.state.sort.prop) ? 'sort' : '' }
                                    onClick={this.sort.bind(this, i)}>{title}</th>);
                        })
                    }
                    <If test={this.TO.actions}>
                        <th>Actions</th>
                    </If>
                </tr>
            </thead>
        )
    }

    generateTableRows() {
        return this.props.tableData.map((item, i) => {
            return (
                <tr key={i}>
                    {
                        this.TO.selectable ?
                            <td>
                                <input type="checkbox" checked={item.selected} onChange={this.handleSelect.bind(this,item)} />
                            </td>
                            : null
                        }
                    {this.generateTableRowData(item)}
                    {this.generateTableRowActions(item)}
                </tr>
            );
        })
    }

    generateTableRowData(item) {
        return this.TO.tableFields.map((fieldName, i) => {
            return (
                <td key={i}>
                    <If test={item.showEdit}>
                        <EditRow fieldName={fieldName} item={item} save={this.TO.actions.edit.saveFunc}/>
                    </If>
                    <If test={!item.showEdit}>
                        <Link to={"users/" + item.name}>{item[fieldName]}</Link>
                    </If>
                </td>)
        })
    }

    generateTableRowActions(item) {
        return  (
            <If test={this.TO.actions}>
                <td>
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        rootClose
                        overlay={
                            <Popover id="some-id-{i}">
                                <If test={this.TO.actions.edit}>
                                    <Button className="btn btn-primary" onClick={this.TO.actions.edit.editFunc.bind(this,item)}>
                                        <i className="glyphicon glyphicon-pencil"></i>
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
        )
    }

    render() {
        return (
            <div>
                {this.generateTableControls()}

                <If test={this.props.tableData.length}>
                    <table className="table table-bordered table-hover">
                        {this.generateTableHead()}
                        <tbody>
                            {this.generateTableRows()}
                        </tbody>
                    </table>
                </If>

                {this.props.children}
            </div>
        )
    }
}

Table.propTypes = {
    tableOptions: React.PropTypes.object.isRequired,
    tableData: React.PropTypes.array.isRequired
};

