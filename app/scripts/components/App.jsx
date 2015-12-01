/**
 * Created by skok on 26.11.15.
 */
import Header from './Header/Header';

export default
class App extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                {this.props.children}
                </div>
            </div>
        )
    }
}

