import React from 'react';
import {render} from 'react-dom';

import Grid from './Grid.jsx';
import Clock from './Clock.jsx';

var App = React.createClass({

	getInitialState: function() {
		return {
			trackNames:[
				'bass.wav',
				'drum1.wav',
				'flat-snare.wav',
				'soft.wav',
				'closed-hh.wav',
				'electric.wav',
				'indian.wav',
				'stick.wav',
				'cymbal.wav',
				'electro-snare.wav',
				'open-hh.wav',
				'wood-snare.wav'
			],
			pattern:[
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			],
			current:[
				0,0,0,0,0,0,0,0,0,0,0,0
			],
			tempo:120
		}
	},

	// get current set of notes (and ones in the future)
	getCurrentNotes:function(offset) {
		var notes=[];
		for (var i in this.state.pattern) {
			var current=(offset % this.state.pattern[i].length);
			notes[i]=this.state.pattern[i][current];
		}
		return notes;
	},

	// provide number of steps from zero and they will increment
	showCurrent:function(offset) {
		var current=this.state.current;
		for (var i in this.state.pattern) {
			var thisOne=(offset % this.state.pattern[i].length);
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
		volume=volume+25;
		if (volume>100) volume=0;
		pattern[rowID][beatID]=volume;
		this.setState({'pattern':pattern});
	},

	setTempo: function(tempo) {
		this.setState({'tempo':tempo});
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
					tempo={this.state.tempo}
					showCurrent={this.showCurrent}
					getCurrentNotes={this.getCurrentNotes}
					trackNames={this.state.trackNames}
					setTempo={this.setTempo}
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
