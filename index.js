
//weather app
$(document).ready(function(){
	$('.short').hide();
	$('#switch').hide();

	if(navigator.geolocation){
		var cLoc = '';
		navigator.geolocation.getCurrentPosition(function(position){
			cLoc = position;
			//get latitude
			var latitude = cLoc.coords.latitude;
			//get longitude
			var longitude = cLoc.coords.longitude;
			//console.log(latitude, longitude);
			//call to api
			var url = 'https://api.apixu.com/v1/forecast.json?key=17c8f8d91e5945a1be2110848182503&q=';
			$.getJSON(url + latitude + ',' + longitude, function(data){
				console.log(data);
				//JSON.stringify turns a javascript object into json text and stores that json text in a string
				var data = JSON.stringify(data);
				//JSON.parse turns a string of JSON text into a javascript object
				var json = JSON.parse(data);

				var country = json.location.country;
				var city = json.location.name;
				var state = json.location.region;

				var temp = json.current.temp_c;
				var temp_f = json.current.temp_f;
				var l_update = json.current.last_updated.replace('-', ' ');

				var wind = json.current.wind_kph;
				var humidity = json.current.humidity;
				var time = json.location.localtime.split(' ')[1];
				var cloude = json.current.cloud;

				//Now showing all data in UI-html
				$('#addressed').html(city+ ', '+state+ ' '+ country);

				//change background image when weather change
				if(temp < 18){
					$('.weatherDet').css({
						backgroundImage: 'url(img/coldday.jpg)',
						backgroundSize: 'cover'
					});
					$('#weate_info').html('It\'s a pretty cold day today..');
				}else if (temp > 10 && temp < 28){
					$('.weatherDet').css({
						backgroundImage: 'url(img/sunnyday.jpg)',
						backgroundSize: 'cover'
					});
					$('#weate_info').html('It\'s sunny day today..');
				}else{
					$('.weatherDet').css({
						backgroundImage: 'url(img/hotday.jpg)',
						backgroundSize: 'cover'
					});
					$('#weate_info').html('It\'s hot day today..');
				}

				//time
				$('#info1').html(time);
				$('#info2').html('Wind '+ wind + ' kph');
				$('#info3').html(temp + '&#8451');
				$('#info6').html('Humidity '+humidity+ ' %');

				$('.short').show();
				$('#switch').show();

				//change celsius to farenheight
				var yes = true;
				$('#switch').on('click', function(){
					if(yes){
						$('#info3').html(temp_f + '&#8451');
						$('#switch').html('Show in Celsius');
						yes = false;
					}else{
						$('#info3').html(temp + '&#8457');
						$('#switch').html('Show in Farenheight');
						yes = true;
					};
				});

				//showing sky condition
				if(cloude <= 30){
					$('#info5').html('Clear Sky');
				}else{
					$('#info5').html('Cloudy Sky');
				}


			})
		})
	}

})
