import usersStore from './../../stores/usersStore';

export class RemoveSelectedRow extends React.Component {
    constructor(props) {
        super(props);
    }

    static handleRemoveSelected() {
        for (let user of usersStore.data) {
            (user.selected) && usersStore.removeById(user.id);
        }
    }

    render() {
        return (
            <button className="btn btn-danger"
                    disabled={ this.props.enableBtn }
                    type="button"
                    onClick={ RemoveSelectedRow.handleRemoveSelected.bind(this) }>
                <i className="glyphicon glyphicon-fire"></i> Remove selected
            </button>
        )
    }
}

/**
 * Main navbar component
 */
export class TableNavBar extends React.Component {
    render() {
        return (
            <div className="btn-group" style={{marginBottom: 10 + 'px'}}>
                { this.props.children }
            </div>
        )
    }
}