/**
 * Created by skok on 26.11.15.
 */
import Header from './Header';

export default React.createClass({
    displayName: 'HelloReact',
    render: function () {
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
});

