/**
 * Created by skok on 26.11.15.
 */

export default React.createClass({
    displayName: 'HelloReact',
    render: function () {
        return (
            <h1 className={this.props.className}>Hello React</h1>
        )
    }
});