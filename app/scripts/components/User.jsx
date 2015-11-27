import $ from 'jQuery';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}};
        let url = "http://www.filltext.com/?rows=1&description={lorem|20}&name={firstName}&age={number|80}&phone={phone}";

        $.get(url, (result) => this.setState({user:result[0]}));
    }    
    
    render() {     
        return (
            <div>
                 { this.state.user &&
                    <div>
                        <div><b>Name:</b> {this.state.user.name}</div>                        
                        <div><b>Age:</b> {this.state.user.age}</div>
                        <div><b>Phone:</b> {this.state.user.phone}</div>
                        <div><b>About me:</b> {this.state.user.description}</div>
                    </div>
                  }              
            </div>
        )
    }   
};