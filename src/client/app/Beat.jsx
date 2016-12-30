import React from 'react';
import {render} from 'react-dom';

var Beat = React.createClass({
	getInitialProps: function () {
		return {
			volume: 0,
			beatID:0,
			rowID:0,
			current:false,

		};
	},

	getColour: function() {
		var volume=this.props.volume;
		if (volume == 0) {
			return 'white';
		} else if (volume < 26) {
			return 'red';
		} else if (volume < 51) {
			return 'orange';
		} else if (volume < 76) {
			return 'yellow';
		} else {
			return 'black';
		}
	},

	getCurrent: function() {
		if (this.props.current) {
			return 'current';
		} else {
			return '';
		}
	},

	changeBeat: function() {
		this.props.setBeatVolume(this.props.beatID);
	},

	render: function() {
		return (
			<div key={this.props.beatID} className='beat' onClick={this.changeBeat}>
				<div className={this.getCurrent()}>
					<div className={this.getColour()}>
						<span>{this.props.volume}</span>
					</div>
				</div>
			</div>
		);
	}


});

export default Beat;
