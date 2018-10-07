import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

const form = props => (
    <div className="FormCard">
        <div className="avatar center"></div>
        <div className="form">
            <div className="header">
                {props.header}
            </div>
            <form onSubmit={props.submitted}>
                <table>
                    <tbody>
                        {props.children}
                    </tbody>
                </table>
            </form>
        </div>
    </div>
)

form.propTypes = {
	header: PropTypes.string,
	submitted: PropTypes.func,
	children: PropTypes.node
}

export default form;