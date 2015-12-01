import $ from 'jquery';
import usersActions from '../actions/usersActions';
import usersStore from '../stores/usersStore';
export default
class CreateUser extends React.Component {
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
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="name" placeholder="name" value={this.state.user.name} onChange={this.handleChange.bind(this)} />
                    <input type="text" name="phone" placeholder="phone" value={this.state.user.phone} onChange={this.handleChange.bind(this)} />
                    <input type="submit" className="button" value="Submit" />
                </form>
            </div>
        )
    }
}
;
