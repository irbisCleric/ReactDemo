export class RemoveSelectedRow extends React.Component {

    render() {
        return (
            <button className="btn btn-danger" type="button">
                Remove selected
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