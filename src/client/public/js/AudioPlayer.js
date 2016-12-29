function AudioPlayer() {
  var self=this;
  this.myBuffer=false;
  this.context=false;

  this.loadSamples=function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    var request = new XMLHttpRequest();

    request.open('GET', '/audio/bass.wav', true);

    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      self.context.decodeAudioData(request.response, function(theBuffer) {
        self.myBuffer = theBuffer;
        self.playSound(self.myBuffer);
      }, self.loadError);
    }
    request.send();
  }


  this.playSound=function(buffer) {
    var source = this.context.createBufferSource(), g = this.context.createGain();
    source.buffer = buffer;
    source.start(0);
    g.gain.value = 0.5;
    source.connect(g);
    g.connect(this.context.destination);
  }

  this.loadError=function(error) {
    console.log(error);
  }

}
