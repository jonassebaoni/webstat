/**
 * Created by alexis_moreau on 05/01/2017.
 */
import React from 'react';

export default class AppLayout extends React.Component {
    render() {
        return (
            <div id="content">
                {this.props.content}
            </div>
        );
    }
}
