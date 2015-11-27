/**
 * Created by skok on 26.11.15.
 */
import $ from 'jQuery';
import { Link } from 'react-router';

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
        let url = "http://www.filltext.com/?rows=10&id={index}&name={firstName}";

        $.get(url, (result) => this.setState({users:result}));
    }    

    render() {     
        return (
            <div className={this.props.className}>
                <table className="medium-12 hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                    </tr>
                    </thead>
                    <tbody>     
                        {this.state.users.map((user, i) => {
                          return (   
                           <tr key={i}>                                
                                <td key={i}>
                                    <Link to={"users/"+user.id}>{user.id}</Link>                               
                                </td>
                                <td key={i+'test'}>
                                <Link to={"users/"+user.id} params={{name:'test'}}>{user.name}</Link>                               
                                </td>                                
                            </tr>                                                
                          );
                        })}
                    </tbody> 
                </table>
            </div>
        )
    }   
};
