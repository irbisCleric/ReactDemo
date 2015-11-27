/**
 * Created by skok on 26.11.15.
 */

import TableUsers from './TableUsers';

export default React.createClass({
    displayName: 'HelloReact',
    render: function () {
        return (
            <div>
                <h1>Hello React</h1>
                <TableUsers />
            </div>
        )
    }
});