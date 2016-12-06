import React from 'react';
import {render} from 'react-dom';

import Row from './Row.jsx';

var Grid = React.createClass({
	getInitialProps:function() {
		return {
			pattern:[],
			current:[],
			trackNames:[]
		}
	},

	render: function() {
		var rows = [];
		for (var i in this.props.pattern) {
				rows.push(
					<Row
						rowID={i}
						trackName={this.props.trackNames[i]}
						current={this.props.current[i]}
						beats={this.props.pattern[i]}
						setBeatVolume={this.props.setBeatVolume}
						increaseRow={this.props.increaseRow}
						decreaseRow={this.props.decreaseRow}
					/>
				);
		}
		return (
				<div className='grid'>
					<div>{rows}</div>
				</div>
		);
	}

});

export default Grid;
