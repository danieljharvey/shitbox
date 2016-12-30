import React from 'react';
import {render} from 'react-dom';

import Tempo from './Tempo.jsx';

var Clock = React.createClass({
	getInitialState: function () {
		return {
			playing:false,
			nextNoteTime:0,
			notesInQueue:[],
			timer:null,
			audioContext:null,
			audioPlayer:null,
			noteNumber:0, // current note we've scheduled
			showNoteNumber:0,  // current note we can see
			multiple:1.0594630944,
			scheduleAheadTime:100
		};
	},

  nextNote: function() {
      // Advance current note and time by a 16th note...
      var secondsPerBeat = 60.0 / parseInt(this.props.tempo);
			var nextNoteTime=this.state.nextNoteTime;

			nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
			var noteNumber=this.state.noteNumber;
			noteNumber++;
			this.setState({
				'nextNoteTime':nextNoteTime,
				'noteNumber':noteNumber
			});
  },

	getFrequency: function(note) {
    var freq=440;
    if (note==0) {
      return freq;
    } else if (note>0) {
      var times=parseInt(note);
			return freq*Math.pow(this.state.multiple,times);
    } else if (note<0) {
      var times=parseInt(note) *-1;
      return freq / Math.pow(this.state.multiple,times);
    } else {
      return freq;
    }
  },

  scheduleNote: function(note, time) {

		var notesInQueue=this.state.notesInQueue;
		notesInQueue.push({
			note: note,
			time: time,
			noteNumber: this.state.noteNumber
		});

		var allNotes=this.props.getCurrentNotes(this.state.noteNumber);
		var oscs=[];
		for (var i in allNotes) {
			if (allNotes[i]>0) {
				var bufferName=this.props.trackNames[i];
				this.state.audioPlayer.playSound(bufferName,allNotes[i],time,this.state.audioContext);

				/*
				var freq=this.getFrequency(allNotes[i]);
				// create an oscillator
				oscs[i] = this.state.audioContext.createOscillator();
				oscs[i].connect( this.state.audioContext.destination );
				oscs[i].frequency.value = freq;
				oscs[i].type='sawtooth';

				oscs[i].start( time );
				oscs[i].stop( time + 0.1 );*/
			}
		}

		this.setState({'notesInQueue':notesInQueue});
  },

  scheduler: function() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (this.state.nextNoteTime < this.state.audioContext.currentTime + 0.2 ) {
        this.scheduleNote(2, this.state.nextNoteTime );
        this.nextNote();
    }
  },

	draw: function() {
    var currentTime = this.state.audioContext.currentTime;
		var notesInQueue=this.state.notesInQueue;

		var showNoteNumber=this.state.showNoteNumber;

    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
				showNoteNumber=notesInQueue[0].noteNumber;
				notesInQueue.splice(0,1);   // remove shit in the past
    }
		this.props.showCurrent(showNoteNumber);
		this.setState({'showNoteNumber':showNoteNumber});

    // set up to draw again
    requestAnimFrame(this.draw);
	},

	scrollVisuals:function(amount) {
		if (amount==0) return false;
		for (var i=0; i<amount; i++) {
			// do parent scroll event
			this.props.incrementCurrent();
		}
	},

  play:function() {
		var doSchedule=this.scheduler;
    var timer=setInterval(function() {
      doSchedule();
    },this.state.scheduleAheadTime);
		requestAnimFrame(this.draw);

		this.setState({'timer':timer,"playing":true});
  },

	stop:function() {
		var timer=this.state.timer;
		clearInterval(timer);
		this.setState({'timer':null,'playing':false});
	},

	componentDidMount() {
		var audioContext=new AudioContext();
		var audioPlayer= new AudioPlayer();
		for (var i in this.props.trackNames) {
			audioPlayer.loadSample(this.props.trackNames[i],audioContext);
		}
		this.setState({'audioPlayer':audioPlayer,'audioContext':audioContext});
	},

  render: function() {
		if (!this.state.playing) {
			var button=(
				<button onClick={this.play}>PLAY</button>
				);
		} else {
			var button=(
				<button onClick={this.stop}>STOP</button>
			);
		}
		return (
			<div>
				{button}
				<Tempo tempo={this.props.tempo} setTempo={this.props.setTempo} />
			</div>
		);
  }
});

export default Clock;
