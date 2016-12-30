import React from 'react';
import {render} from 'react-dom';

var Tempo = React.createClass({
	getDefaultProps: function () {
		return {
			tempo:120
		};
	},

  increase: function() {
    var tempo=this.props.tempo;
    if (tempo<240) {
			tempo++;
		}
		console.log(tempo);
    this.props.setTempo(tempo);
  },

  decrease:function() {
    var tempo=this.props.tempo;
    if (tempo>20) {
			tempo--;
		}
		console.log(tempo);
    this.props.setTempo(tempo);
  },

	render: function() {
		return (
			<div>
				<button onClick={this.decrease}>-</button>
				<span>{this.props.tempo} bpm</span>
				<button onClick={this.increase}>+</button>
			</div>
		);
  }

})

export default Tempo;
