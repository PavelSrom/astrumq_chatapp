import React from 'react';
import PropTypes from 'prop-types';

const button = props => (
    <tr>
        <td>
            <button className="button" {...props}>{props.children}</button>
        </td>
    </tr>
);

button.propTypes = {
	children: PropTypes.node,
}

export default button;