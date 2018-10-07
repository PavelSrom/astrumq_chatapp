import React from 'react';
import PropTypes from 'prop-types';

const checkbox = props => (
    <tr>
        <td>
            <label htmlFor="">
                <input type="checkbox" />
                {props.description}
            </label>
        </td>
    </tr>
);

checkbox.propTypes = {
	description: PropTypes.string
}

export default checkbox;