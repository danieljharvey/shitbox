import React from 'react';
import {render} from 'react-dom';

import Grid from './Grid.jsx';
import Clock from './Clock.jsx';

var App = React.createClass({

	getInitialState: function() {
		return {
			trackNames:[
				'Kick',
				'Snare',
				'Hi-hat',
				'Bing',
				'Bong',
				'Peeboo'
			],
			pattern:[
				[0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			],
			current:[
				0,0,0,0,0,0
			]
		}
	},

	// get current set of notes (and ones in the future)
	getCurrentNotes:function(offset) {
		var notes=[];
		for (var i in this.state.pattern) {
			//var current=this.state.current[i]; // which note is currently playing
			var current=0;
			if (offset>0) {
				current=current+offset;
				while (current >= this.state.pattern[i].length) {
					current=current-this.state.pattern[i].length;
				}
			}
			notes[i]=this.state.pattern[i][current];
		}
		return notes;
	},

	// provide number of steps from zero and they will increment
	showCurrent:function(offset) {
		var current=this.state.current;
		for (var i in this.state.pattern) {
			var thisOne=0;
			if (offset>0) {
				thisOne=thisOne+offset;
				while (thisOne >= this.state.pattern[i].length) {
					thisOne=thisOne-this.state.pattern[i].length;
				}
			}
			current[i]=thisOne;
		}
		this.setState({'current':current});
	},

	reset:function() {
		// put all players back to start
		var current=this.state.current;
		for (var i in this.state.pattern) {
			current[i]=0;
		}
		this.setState({'current':current});
	},

	setBeatVolume: function(rowID,beatID) {
		var pattern=this.state.pattern;
		var volume=pattern[rowID][beatID];
		volume=volume+1;
		if (volume>24) volume=0;
		pattern[rowID][beatID]=volume;
		this.setState({'pattern':pattern});
	},

	increaseRow: function(rowID) {
		var pattern=this.state.pattern;
		var row=pattern[rowID];
		if (row.length<33) {
			row.push(0);
		}
		pattern[rowID]=row;
		this.setState({'pattern':pattern});
	},

	decreaseRow: function(rowID) {
		var pattern=this.state.pattern;
		var row=pattern[rowID];
		if (row.length>1) {
			row.pop();
		}
		pattern[rowID]=row;
		this.setState({'pattern':pattern});
	},

	render: function() {
		return (
			<div>
				<Clock
					tempo="60"
					showCurrent={this.showCurrent}
					getCurrentNotes={this.getCurrentNotes}
				/>
				<Grid
					trackNames={this.state.trackNames}
					current={this.state.current}
					pattern={this.state.pattern}
					setBeatVolume={this.setBeatVolume}
					increaseRow={this.increaseRow}
					decreaseRow={this.decreaseRow}
				/>
			</div>
		);
	}

});

render (<App/>, document.getElementById('app'));
