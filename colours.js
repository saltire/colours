$.fn.extend({
	setHSV: function(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;

		var minRGB = Math.min(r, g, b);
		var maxRGB = Math.max(r, g, b);

		if (minRGB == maxRGB) {
			var h = 0;
			var s = 0;
			var v = Math.floor(minRGB * 100);

		} else {
			var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
			var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
			var c = maxRGB - minRGB;
			
			var h = Math.floor((h - d / c) * 60);
			var s = Math.floor(c / maxRGB * 100);
			var v = Math.floor(maxRGB * 100);
		}
		
		$(this).find('.h').attr('value', h).val(h);
		$(this).find('.s').attr('value', s).val(s);
		$(this).find('.v').attr('value', v).val(v);
	},
	
	setRGB: function(r, g, b) {
		$(this).find('.r').attr('value', r).val(r);
		$(this).find('.g').attr('value', g).val(g);
		$(this).find('.b').attr('value', b).val(b);
	},
	
	setHex: function(hex) {
		$(this).find('.hex').attr('value', hex).val(hex);
	},
	
	setColour: function(hex) {
		$(this).find('.colour').css('background', hex);
	}
});


function rgb2hex(r, g, b) {
	var hex = '#';
	[r, g, b].forEach(function(c) {
		var str = c.toString(16);
		hex += '00'.slice(str.length) + str;
	});
	return hex
}


$(function() {
	
	// add button clicked
	
	$('.add').click(function() {
		// add new blank row
		$('table tr:last').clone().appendTo('table')
			.find('input').val('').attr('value', '').end()
			.find('.colour').css('background-color', 'transparent');
		return false;
	});
	
	
	// hex value changed
	
	$('table').on('change', '.hex', function() {
		// check for valid hex in contents
		if (/^#?([0-9a-f]{3}){1,2}$/i.test($(this).val())) {
			// generate hex value
			var hex = '#' + $(this).val().replace('#', '');
			
			// update value with contents
			$(this).attr('value', hex).val(hex);
			
			// update rgb
			if ($(this).val().length == 4) {
				var r = parseInt(hex.slice(1, 2), 16);
				var g = parseInt(hex.slice(2, 3), 16);
				var b = parseInt(hex.slice(3, 4), 16);
			} else {
				var r = parseInt(hex.slice(1, 3), 16);
				var g = parseInt(hex.slice(3, 5), 16);
				var b = parseInt(hex.slice(5, 7), 16);
			}
			
			// update rgb, hsv, colour
			$(this).closest('tr').setRGB(r, g, b);
			$(this).closest('tr').setHSV(r, g, b);
			$(this).closest('tr').setColour(hex);
			
		} else {
			// reset contents to value
			$(this).val($(this).attr('value'));
		}
	});
	
	
	// rgb values changed
	
	$('table').on('change', '.r, .g, .b', function() {
		var $colours = $(this).closest('tr').find('.r, .g, .b');
		
		if ($colours.each(function() {
			// test if contents are a valid number
			if (/^\d{1,3}$/.test($(this).val())) {
				// clamp it and set new value
				$(this).attr('value', Math.min(255, parseInt($(this).val())));
			}
			// reset contents to value
			$(this).val($(this).attr('value'));
			
		}).filter(function() {
			// check that no contents are blank
			return $(this).val() == '';
		}).length === 0) {
			
			var r = parseInt($colours.filter('.r').val());
			var g = parseInt($colours.filter('.g').val());
			var b = parseInt($colours.filter('.b').val());

			// update hex, hsv, colour
			var hex = rgb2hex(r, g, b);
			$(this).closest('tr').setHex(hex);
			$(this).closest('tr').setHSV(r, g, b);
			$(this).closest('tr').setColour(hex);
		}
	});
	
	
	// hsv values changed
	
	$('table').on('change', '.h, .s, .v', function() {
		var $colours = $(this).closest('tr').find('.h, .s, .v');
		
		if ($colours.each(function() {
			// test if contents are a valid number
			if (/^\d{1,3}$/.test($(this).val())) {
				// set new value
				var num = parseInt($(this).val());
				if ($(this).hasClass('h')) {
					// hue is modulo 360
					$(this).attr('value', num % 360);
				} else {
					// saturation and value are clamped under 255
					$(this).attr('value', Math.min(num, 255));
				}
			}

			// reset contents to value
			$(this).val($(this).attr('value'));
			
		}).filter(function() {
			// check that no contents are blank
			return $(this).val() == '';
		}).length === 0) {
			
			var h = parseInt($colours.filter('.h').val()) / 60;
			var s = parseInt($colours.filter('.s').val()) / 100;
			var v = parseInt($colours.filter('.v').val()) / 100;
			var rgb;
			
			if (s === 0) {
				rgb = [v, v, v]
			} else {
				i = Math.floor(h);
				data = [v * (1 - s),
				        v * (1 - s * (h - i)),
				        v * (1 - s * (1 - (h - i)))];
				
				if (i == 0) {
					rgb = [v, data[2], data[0]];
				} else if (i == 1) {
					rgb = [data[1], v, data[0]];
				} else if (i == 2) {
					rgb = [data[0], v, data[2]];
				} else if (i == 3) {
					rgb = [data[0], data[1], v];
				} else if (i == 4) {
					rgb = [data[2], data[0], v];
				} else if (i == 5) {
					rgb = [v, data[0], data[1]];
				}
			}
			
			var r = Math.floor(rgb[0] * 255);
			var g = Math.floor(rgb[1] * 255);
			var b = Math.floor(rgb[2] * 255);

			// update rgb, hex, colour
			var hex = rgb2hex(r, g, b);
			$(this).closest('tr').setRGB(r, g, b);
			$(this).closest('tr').setHex(hex);
			$(this).closest('tr').setColour(hex);
		}
		
	});
});