app.factory('FooterFactory',function($http){
	//D3 SVG
	var svgHeight = '300';
	var svgWidth = '1200';
	var barPadding = '1';
	function createSvg(parent, height, width) {
	  return d3.select(parent).append('svg').attr('height', height).attr('width', width);
	}
	var svg = createSvg('#thediv', svgHeight, svgWidth);
	
	var svgRun = function(){}
	var playing;
	return {
		draw: function(analyser, color, arrLength, shape, decibels){
			var frequencyData = new Uint8Array(arrLength);
			svg.selectAll("*").remove();
			cancelAnimationFrame(playing)
			if (decibels) analyser.minDecibels = -decibels
			switch (shape) {
				case "bars":

					svg.selectAll('rect')
					.data(frequencyData)
					.enter()
					.append('rect')
					.attr('x', function (d, i) {
					      return i * (svgWidth / frequencyData.length); //frequencyData.length
					   })
					   .attr('width', svgWidth / frequencyData.length - barPadding);

					function renderChart(){
						playing = requestAnimationFrame(renderChart)
						analyser.getByteFrequencyData(frequencyData);
						svg.selectAll('rect')
						.data(frequencyData)
						//bars
						.attr('y', function(d) {
							return svgHeight - d;
						})
						.attr('height', function(d) {
							return d;
						})
						.attr('fill', function(d) {
							if (color){
								return 'rgb(' + (Math.floor(Math.random() * 255) + 1).toString() + ',' + (Math.floor(Math.random() * 255) + 1).toString() + ','  + (color) + ')';
							} else {
								return 'rgb(0, 0, ' + 255 + ')';
							}
						});
					}
					break;

				case "circles":
					svg.selectAll('circle')
					.data(frequencyData)
					.enter()
					.append('circle')
					.attr('cx', function (d, i) {
				      return i * (svgWidth / frequencyData.length); //frequencyData.length
				   })

					function renderChart(){
						playing = requestAnimationFrame(renderChart)
						analyser.getByteFrequencyData(frequencyData);

						svg.selectAll('circle')
						.data(frequencyData)
						.attr('cy', function(d) {
							return svgHeight - d;
						})
						.attr('r', 30)
						.attr('fill', function(d){
							if (color){
								return 'rgb(' + (Math.floor(Math.random() * 255) + 1).toString() + ',' + (Math.floor(Math.random() * 255) + 1).toString() + ','  + (color) + ')';
							 } else {
							 	return 'rgb(0, 0, ' + 255 + ')';
							 }
						});
					}
					break;

				case "circlePulse":
				// for (var i =200; i< 800; i+= 200){
					svg.selectAll('circle')
					.data(frequencyData)
					.enter()
					.append('circle')
					.attr('cx', function (d, i) {
				  		return i * (svgWidth / frequencyData.length) + 200; //frequencyData.length
					})

					function renderChart(){
						playing = requestAnimationFrame(renderChart)
						analyser.getByteFrequencyData(frequencyData);

						svg.selectAll('circle')
						.data(frequencyData)
						.attr('cy', 200)
						.attr('r', function(d){
							return 275 - d //- 10
							// return d
						})
						.attr('fill', function(d){
							if (color){
								return 'rgb(' + (Math.floor(Math.random() * 255) + 1).toString() + ',' + (Math.floor(Math.random() * 255) + 1).toString() + ','  + (color) + ')';
							 } else {
							 	return 'rgb(0, 0, ' + 255 + ')';
							 }
						});
					}
					break;
				// }
			}
			renderChart();
		}
	}
})
