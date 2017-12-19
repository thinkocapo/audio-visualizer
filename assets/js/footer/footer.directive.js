app.directive('footer', function (FooterFactory) {
	return {
		restrict: 'E',
		// scope: {},
		templateUrl: 'assets/js/footer/footer.html',
		controller: 'homeCtrl',
		link: function (scope) {
			scope.value = "bars"
			// scope.backgroundimage = "default"
			scope.updateBackground = function(thing){
				switch (thing){
					case 'default':
						d3.select('body').style('background', '#000000')
						break;
					case 'beach':
						d3.select('body').style('background', 'url("/Users/WillsHome/Projects/audio-visualizer/niteroi_soccer_picture.png")')
						d3.select('body').style('background-size', 'contain')
						break;
					case 'bottles':
						d3.select('body').style('background-image', 'url("/Users/WillsHome/Projects/audio-visualizer/puff_daddy.jpg")')
						d3.select('body').style('background-size', 'contain')
						break;
					case 'hill':
						d3.select('body').style('background-image', 'url("/Users/WillsHome/Projects/audio-visualizer/saopaulo_hill.jpg")')
						d3.select('body').style('background-size', 'contain')
						break;
				}
				console.log("altered")
			}
			var started = false;

			//1. DROPPING THE FILENAME
			var file;	
			var holder = document.getElementById('holder');
			holder.ondragover = function () {
				return false;
			};
			holder.ondragleave = holder.ondragend = function () {
				return false;
			};
			holder.ondrop = function (e) {
				holder.style.border = '4px solid green'; 
				holder.innerHTML = 'music file ready'; 
				e.preventDefault();
				file = e.dataTransfer.files[0];
				console.log('File you dragged here is', file.path);
				return false;
			};

			//2. AUDIO SETUP / FUNCTION DECLARATION FOR GETTING AUDIO FROM DROPPED FILE
			var count = 0;
			var audioCtx = new (window.AudioContext)
			var source;
			var distortion = audioCtx.createWaveShaper();
			var gainNode = audioCtx.createGain();
			var biquadFilter = audioCtx.createBiquadFilter();
			var analyser = audioCtx.createAnalyser();
			analyser.fftSize = 2048;
			var bufferLength = analyser.frequencyBinCount;
			var dataArray = new Uint8Array(bufferLength);
			// analyser.getByteTimeDomainData(dataArray);
			function getData(file) {
			  source = audioCtx.createBufferSource();
			  source.crossOrigin = "anonymous"
			    var request = new XMLHttpRequest();
			    request.open('GET', file.path, true);
			    request.send();
			    request.responseType = 'arraybuffer';
			    request.onload = function() {
			        var audioData = request.response;
			        audioCtx.decodeAudioData(audioData, function(buffer) {
			          source.buffer = buffer;
			          source.connect(analyser);
			          analyser.connect(audioCtx.destination);
			          source.loop = true;
			          source.start(0);
					  // analyser.getByteTimeDomainData(dataArray); // Place this in Draw functions
			          // play.setAttribute('disabled', 'disabled');
			        },
			        function(e){"Error with decoding audio data" + e.err});  
			    }
			}

			//3. PLAY AND STOP BUTTONS
			var play = document.querySelector('.play');
			var stop = document.querySelector('.stop');
			play.onclick = function() {
			  started = true;
			  //Plays Audio
			  getData(file);
			  play.setAttribute('disabled', 'disabled');
			  scope.draw()
			}

			stop.onclick = function(){
			  source.stop();
			  play.removeAttribute('disabled');
			}

			scope.draw = function(reset){
				if (reset) var color = null
				else var color = scope.colorNumber
				var shape = scope.value
				var arrLength;
				switch (shape){
					case "bars":
						arrLength = scope.arrayLength || 150 //arrLength = userSelection || 150
						break;
					case "circles":
						arrLength = scope.arrayLength || 10
					case "circlePulse":
						arrLength = scope.arrayLength || 4
				}
				FooterFactory.draw(analyser, color, arrLength, shape, scope.decibels)
			}
		}
	}
});
