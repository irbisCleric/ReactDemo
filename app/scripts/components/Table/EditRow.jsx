import usersStore from './../../stores/usersStore';

export class EditRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem : Object.assign({}, usersStore.getCurrent())
        }
    }
    handleEdit(item, fieldName, e) {
        this.state.currentItem[fieldName] = e.target.value;
        this.setState({currentItem : this.state.currentItem});
    }

    save(toSave){
        let UserToSave = toSave ? this.state.currentItem : usersStore.getCurrent();
        this.props.save(UserToSave);
    }

    render() {
        return (
            <div className="input-group">
                <input type="text"
                       className="form-control"
                       onChange={this.handleEdit.bind(this, this.state.currentItem, this.props.fieldName)}
                       placeholder={'Input ' + this.props.fieldName}
                       value={this.state.currentItem[this.props.fieldName]}
                />
                <span className="input-group-btn">
                    <button className="btn btn-danger" type="button" onClick={this.save.bind(this, false)}>
                        <i className="glyphicon glyphicon-remove"></i>
                    </button>
                    <button className="btn btn-success" type="button" onClick={this.save.bind(this,true)}>
                        <i className="glyphicon glyphicon-ok"></i>
                    </button>
                </span>
            </div>
        )
    }
}
