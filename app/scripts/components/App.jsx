import Header from './Header/Header';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
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

