import React from 'react';
import {render} from 'react-dom';

import Beat from './Beat.jsx';
import RowSettings from './RowSettings.jsx';

var Row = React.createClass({
	getInitialProps:function() {
		return {
			beats:[],
			rowID:0,
			current:0,
			trackName:' - '
		}
	},

	isCurrent:function(i) {
		if (i==this.props.current) {
			return true;
		} else {
			return false;
		}
	},

	setBeatVolume:function(beatID) {
		this.props.setBeatVolume(this.props.rowID,beatID);
	},

	increaseRow:function() {
		this.props.increaseRow(this.props.rowID);
	},

	decreaseRow:function() {
		this.props.decreaseRow(this.props.rowID);
	},

	render: function() {
		var beats = [];
		for (var i in this.props.beats) {
		  beats.push(
				<Beat
					volume={this.props.beats[i]}
					beatID={i}
					rowID={this.props.rowID}
					current={this.isCurrent(i)}
					setBeatVolume={this.setBeatVolume}
				/>
			);
		}
		return (
			<div className='row'>
				<div>
					{this.props.trackName}
					<RowSettings
						size={this.props.beats.length}
						increaseRow={this.increaseRow}
						decreaseRow={this.decreaseRow}
					/>
				</div>
				<div key={this.props.rowID}>{beats}</div>
			</div>
		);
	}
});

export default Row;
