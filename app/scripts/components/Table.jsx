import $ from 'jquery';
import { Link } from 'react-router';
import { Button, Modal, OverlayTrigger, Popover, Pagination } from 'react-bootstrap';
import { EditRow } from './Table/EditRow';
import { TableNavBar, RemoveSelectedRow } from './Table/TableNavBar';

import If from './helpers/If';
import usersStore from './../stores/usersStore';
import Select from 'react-select';

class TableHead extends React.Component {
    constructor(props) {
        super(props);
        this.TO = this.props.tableOptions;
        this.TA = this.props.tableActions;
        this.sort = this.props.sort;
    }

    render() {
        let sortClassName = 'pull-right glyphicon glyphicon-sort-by-attributes';
        if (this.props.sortState.desc){
            sortClassName += '-alt';
        }
        return (
            <thead>
            <tr>
                { this.TO.selectable ?
                <th>
                    <input type="checkbox" onChange={ this.TA.handleSelectAll.bind(this) }/>
                </th>
                    : null}
                {
                    this.TO.tableTitles.map((title, i) => {
                        return (
                        <th key={i}
                            onClick={this.sort.bind(this, i)}>
                                {title}
                                <If test={ this.TO.tableFields[i] === this.props.sortState.prop }>
                                    <i className={sortClassName}></i>
                                </If>
                        </th>
                            );
                        })
                    }
                <If test={this.TA}>
                    <th>Actions</th>
                </If>
            </tr>
            </thead>
        )
    }
}


export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.TO = this.props.tableOptions;
        this.TA = this.props.tableActions;

        this.state = {
            filterText: '',
            sort: {prop: null},
            btnDisable: true,
            activePage: 1
        };
        this.sort = this.sort.bind(this);
    }

    sort(i) {
        let prop = this.TO.tableFields[i];
        let desc = false;
        if( this.state ){
            if (this.state.sort.prop === prop && !this.state.sort.desc){
                desc = true;
            }
        }

        this.TO.sort(prop, desc);
        this.setState({
            sort: {
                prop: prop,
                desc: desc
            }
        })
    }

    handlePagination(event, selectedEvent) {
        event.preventDefault();
        this.setState({
            activePage: selectedEvent.eventKey
        });
        //TODO move to user specific file
        usersStore.setActivePage(this.state.activePage);
    }

    generateTableControls() {
        let users = usersStore.getAll();
        let selected = users.filter((item) => item.selected);
        const getOptions = (input) => {
            return fetch('../../../server/data/users.json')
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    let result = json.map(function (user, i) {
                        return {
                            value: user.id,
                            label: user.name,
                            key: i
                        }
                    })

                    result.unshift({value: 'all', label: 'All'})

                    return {
                        options: result
                    };
                });
        }

        return (
            <div className="row">
                <div className="col-lg-9">
                    <TableNavBar>
                        <RemoveSelectedRow enableBtn={ !selected.length }/>
                    </TableNavBar>
                </div>
                <div className="col-lg-3">
                    <Select
                        name="form-field-name"
                        placeholder="Search..."
                        asyncOptions={getOptions}
                        onChange={this.TO.filter}
                    />
                </div>
            </div>
        )
    }

    generateTableRows() {
        return this.props.tableData.map((item, i) => {
            let rowClass = (item.selected === true) ? 'danger' : '';

            return (
                <tr key={i}
                    className={ rowClass }>
                    {
                        this.TO.selectable ?
                        <td
                            style={{verticalAlign: 'middle'}}>
                            <input type="checkbox" checked={item.selected}
                                   onChange={this.TA.handleSelect.bind(this, item)}
                            />
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
                <td key={i}
                    style={{verticalAlign: 'middle'}}>
                    <If test={item.showEdit}>
                        <EditRow fieldName={fieldName} item={item} save={this.TA.editUser.saveFunc}/>
                    </If>
                    <If test={!item.showEdit}>
                        <Link to={"users/" + item.id}>{item[fieldName]}</Link>
                    </If>
                </td>)
        })
    }

    generateTableRowActions(item) {
        return (
            <If test={this.TA}>
                <td>
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        rootClose
                        overlay={
                            <Popover id={'some-id-'+ item.id}>
                                <If test={ this.TA.editUser }>
                                    <Button
                                        className="btn btn-primary"
                                        onClick={ this.TA.editUser.editFunc.bind(this, item) }>
                                            <i className="glyphicon glyphicon-pencil"></i>
                                    </Button>
                                </If>
                                <If test={this.TA.removeUser}>
                                    <Button
                                        className="btn-danger"
                                        onClick={this.TA.removeUser.btnAction.bind(this, item)}>
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
                        <TableHead
                            tableOptions={ this.TO }
                            tableActions={ this.TA }
                            sort={ this.sort }
                            sortState={ this.state.sort }
                        />
                        <tbody>
                        {this.generateTableRows()}
                        </tbody>
                    </table>
                </If>

                <Pagination
                    bsSize="medium"
                    items={this.props.total}
                    activePage={this.state.activePage}
                    onSelect={this.handlePagination.bind(this)}/>

                {this.props.children}
            </div>
        )
    }
}

Table.propTypes = {
    tableOptions: React.PropTypes.object.isRequired,
    tableActions: React.PropTypes.object.isRequired,
    tableData: React.PropTypes.array.isRequired
};

