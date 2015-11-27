/**
 * Created by skok on 27.11.15.
 */
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div>
          <h1>Hello React</h1>
      
          <div className="button-group">
              <Link to="/" className="button">Home</Link>
              <Link to="/users" className="button">Users</Link>              
          </div>
      </div>
    )
  }
}


