import $ from 'jquery';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id:  'Not filled',
                name: 'Not filled',
                email: 'Not filled',
                age: 'Not filled',
                phone: 'Not filled',
                desc: 'Not filled'
            }
        };
        //let url = "http://www.filltext.com/?rows=1&description={lorem|20}&name={firstName}&age={number|80}&phone={phone}";
        let url = "http://localhost:1715/api/list/" + props.params.id;
        //$.get(url, (result) => this.setState({user: result}));
        $.get(url, (result) => {
            Object.assign(this.state.user, result);
            this.setState({user: this.state.user});
        });
    }

    render() {
        return (
            <div>
                { this.state.user &&
                <div>
                    <div>
                        <strong>Name:</strong> {this.state.user.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {this.state.user.email}
                    </div>
                    <div>
                        <strong>Age:</strong> {this.state.user.age}
                    </div>
                    <div>
                        <strong>Phone:</strong> {this.state.user.phone}
                    </div>
                    <div>
                        <strong>About me:</strong> {this.state.user.desc}
                    </div>
                </div>
                    }
            </div>
        )
    }
}

