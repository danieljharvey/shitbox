import React from 'react';
import {render} from 'react-dom';

var RowSettings = React.createClass({
	getInitialProps:function() {
		return {
			size:1
		}
	},

	increaseRow:function() {
		this.props.increaseRow();
	},

	decreaseRow:function() {
		this.props.decreaseRow();
	},

	render: function() {
		return (
			<div className='rowSettings'>
				<span onClick={this.decreaseRow}>-</span>
				<span> {this.props.size} </span>
				<span onClick={this.increaseRow}>+</span>
			</div>
		);
	}
});

export default RowSettings;
