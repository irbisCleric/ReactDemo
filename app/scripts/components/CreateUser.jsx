import $ from 'jquery';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';
export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    handleChange(e) {
        this.state.user[e.target.name] = e.target.value;
        this.setState({user: this.state.user});
    }

    handleSubmit(e) {
        e.preventDefault();
        usersActions.addUser(this.state.user);
        this.setState({user: {}});
        this.props.history.pushState(null, 'users');
    }

    render() {
        let value = this.state.value;
        return (
            <div className="row">
                <form role="form"
                      className="col-lg-4"
                      onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text"
                               name="name"
                               placeholder="name"
                               className="form-control"
                               value={this.state.user.name}
                               onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="text"
                               name="phone"
                               placeholder="phone"
                               value={this.state.user.phone}
                               className="form-control"
                               onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-default" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}
;
