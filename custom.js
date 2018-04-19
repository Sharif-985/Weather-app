$(document).ready(function(){
	$('#switch').hide();
	$('.short').hide();

	//first call geo location
	if(navigator.geolocation){
		var cLocat = '';
		navigator.geolocation.getCurrentPosition(function(position){
		cLocat = position;
			var latitude = cLocat.coords.latitude;
			var longitude = cLocat.coords.longitude;
			//console.log(latitude, longitude);

			//call ajax request json data
			var url = 'https://api.apixu.com/v1/forecast.json?key=17c8f8d91e5945a1be2110848182503&q=';
			$.getJSON(url + latitude + ' , ' + longitude, function(data){
				console.log(data);

				//json object data to stringify
				var data = JSON.stringify(data);
				//json string data to object
				var json = JSON.parse(data);

				//now diclare var for all data
				var humidity = json.current.humidity;
				var cloud = json.current.cloud;
				var l_Update = json.current.last_updated.split(' ')[1];
				var temp = json.current.temp_c;
				var temp_f = json.current.temp_f;
				var wind = json.current.wind_kph;

				var country = json.location.country;
				var time = json.location.localtime.split(' ')[1];
				var place = json.location.region;
				var name = json.location.name;
				var area = json.location.tz_id;

				//now show it in HTML page
				$('#addressed').html(name+', '+place+ ', '+ country);
				$('#info1').html(time);
				$('#info2').html('Wind '+wind+ 'kph');
				$('#info3').html(temp+ '&#8451');

				$('#switch').show();
				$('.short').show();
				

				//when click the button, the temp change into both Cel & faren
				
				var yes = true;
				$('#switch').on('click', function(){
					if(yes){
						$('#info3').html(temp_f + '&#8457');
						$('#switch').html('Show in Celsius');
						yes = false;
					}else{
						$('#info3').html(temp + '&#8451');
						$('#switch').html('Show in Farenheight');
						yes = true;
					};
				});

				$('#info6').html('Humidity '+humidity+ ' %');
				if(cloud <= 30){
					$('#info5').html('Clear Sky');
				}else{
					$('#info5').html('Cloudy Sky');
				};

				//change background image when tem change
				if(temp < 18){
					$('.weatherDet').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/22/00/05/water-3248815_960_720.jpg)',
						backgroundSize: 'cover'
					});
					$('#weate_info').html('This is cold day today..');
				}else if(temp > 10 && temp < 28 ){
					$('.weatherDet').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/12/20/30/holiday-3220774_960_720.jpg)',
						backgroundSize: 'cover'
					});
					$('#weate_info').html('It is sunny day today..');
				}else {
					$('.weatherDet').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/02/05/23/05/road-3133502_960_720.jpg)',
						backgroundSize: 'cover'
					});
					$('#weate_info').html('It is hot day today..');
				}

			});
		})
	}
})