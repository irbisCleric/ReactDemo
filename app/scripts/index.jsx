require('./../styles/foundation/foundation.min.css');

import React from 'react';
import ReactDOM from 'react-dom';  
import Hello from './components/Hello';
import TableUsers from './components/TableUsers';

var MainModule = React.createClass({
    render: function() {
        return (
            <div className="row">
                <Hello className="medium-6 column" />
                <TableUsers className="medium-6 column" />
            </div>
        );
    }
});

ReactDOM.render(<MainModule />, document.getElementById('content'));
