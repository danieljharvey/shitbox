function Metronome() {
  var self=this;
  this.audioContext = null;
  this.isPlaying = false;      // Are we currently playing?
  this.startTime;              // The start time of the entire sequence.

  this.tempo = 120.0;          // tempo (in beats per minute)
  this.lookahead = 25.0;       // How frequently to call scheduling function
                            //(in milliseconds)
  this.scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps
                            // with next interval (in case the timer is late)
  this.nextNoteTime = 0.0;     // when the next note is due.

  this.noteLength = 0.1;      // length of "beep" (in seconds)

  this.notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}
  this.timer=null;

  this.multiple=1.0594630944; // for calcing tones

  this.nextNote=function() {
      // Advance current note and time by a 16th note...
      var secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT tempo value to calculate beat length.
      this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
  }

  this.scheduleNote=function(note, time) {
    console.log('scheduleNote at '+time);
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push( { note: note, time: time } );

    var freq=this.getFrequency(note);

    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect( this.audioContext.destination );
    osc.frequency.value = freq;

    osc.start( time );
    osc.stop( time + this.noteLength );
  }

  this.getFrequency=function(note) {
    var freq=440;
    if (note==0) {
      return freq;
    } else if (note>0) {
      var times=parseInt(note);
      return freq*Math.pow(this.multiple,times);
    } else if (note<0) {
      var times=parseInt(note) *-1;
      return freq / Math.pow(this.multiple,times);
    } else {
      return freq;
    }
  }

  this.scheduler=function() {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
        this.scheduleNote( 2, this.nextNoteTime );
        this.nextNote();
    }
  }

  this.play=function() {
    this.isPlaying = !this.isPlaying;
    if (!this.audioContext) {
      this.audioContext=new AudioContext();
    }
    if (this.isPlaying) { // start playing
        this.timer=setInterval(function() {
          self.scheduler();
        },this.scheduleAheadTime);
    } else {
        clearInterval(this.timer);
    }
  }

}
