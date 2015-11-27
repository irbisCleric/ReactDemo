/**
 * Created by skok on 26.11.15.
 */

import React from 'react';

export default React.createClass({
    displayName: 'TableUsers',
    render: function () {
        return (
            <div>
                <table className="hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>Bob</td>
                        </tr>
                        <tr>
                            <td>662</td>
                            <td>John</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});