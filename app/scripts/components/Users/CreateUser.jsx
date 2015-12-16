import $ from 'jquery';
import Formsy from 'formsy-react';
import usersActions from '../../actions/usersActions';
import usersStore from '../../stores/usersStore';
import MyInput from '../MyInput';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            user: {}
        };
    }

    handleChange(e) {
        this.state.user[e.target.name] = e.target.value;
        this.setState({user: this.state.user});
    }

    handleSubmit(e) {
        //e.preventDefault();
        usersActions.addUser(this.state.user);

        let url = 'http://localhost:1715/api/user/create';

        $.post(url, this.state.user)
            .done(function (data) {
                console.log('POST end = ', data);
            });

        this.setState({user: {}}); // redirect to user page
        this.props.history.pushState(null, 'users');
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    render() {
        return (
            <div className="row">
                <Formsy.Form
                    className="col-lg-4"
                    onValidSubmit={this.handleSubmit.bind(this)} onValid={this.enableButton.bind(this)}
                    onInvalid={this.disableButton.bind(this)}>
                    <MyInput name="name" validationError="This field is required" change={this.handleChange.bind(this)}
                             required/>
                    <MyInput name="email" validations="isEmail" validationError="Please, enter valid email"
                             change={this.handleChange.bind(this)} required/>
                    <button className="btn btn-submit" type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Formsy.Form>
            </div>
        )
    }
}
