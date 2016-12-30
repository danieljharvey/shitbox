function AudioPlayer() {
  var self=this;
  this.buffers=[]

  this.loadSample=function(name, audioContext) {

    var request = new XMLHttpRequest();

    request.open('GET', '/audio/'+name, true);

    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(theBuffer) {
        self.buffers[name] = theBuffer;
        console.log('loaded '+name);
      }, self.loadError);
    }
    request.send();
  }


  this.playSound=function(bufferName,volume,time,audioContext) {
    var buffer=this.buffers[bufferName];
    if (!buffer) {
      return false; // sound not loaded yet
    }
    var source = audioContext.createBufferSource();
    var g = audioContext.createGain();
    source.buffer = buffer;
    source.start(time); // schedule at time
    g.gain.value = volume/100;
    source.connect(g);
    g.connect(audioContext.destination);
  }

  this.loadError=function(error) {
    console.log(error);
  }

  //this.constructor(); // get audio context
}
