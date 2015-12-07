import usersStore from './../../stores/usersStore';

export class EditRow extends React.Component {
    handleEdit(i, fieldName, e) {
        i[fieldName] = e.target.value;
        usersStore.update(i.id, i);
    }

    render() {
        return (
            <div className="input-group">
                <input type="text"
                       className="form-control"
                       onChange={this.handleEdit.bind(this, this.props.item, this.props.fieldName)}
                       placeholder={'Input ' + this.props.fieldName}
                       value={this.props.item[this.props.fieldName]}
                />
                <span className="input-group-btn">
                    <button className="btn btn-danger" type="button">
                        <i className="glyphicon glyphicon-remove"></i>
                    </button>
                    <button className="btn btn-success" type="button">
                        <i className="glyphicon glyphicon-ok"></i>
                    </button>
                </span>
            </div>
        )
    }
}
