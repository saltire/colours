$.fn.extend({
	setColour: function(r, g, b) {
		$(this).find('.colour').css({
			visibility: 'visible',
			backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')'
		});
		return $(this);
	},
	
	setHex: function(r, g, b) {
		var str = (r * 65536 + g * 256 + b).toString(16);
		var hex = '#' + '000000'.slice(str.length) + str;
		$(this).find('.hex').attr('value', hex).val(hex);
		return $(this);
	},
	
	setRGB: function(r, g, b) {
		$(this).find('.r').attr('value', r).val(r);
		$(this).find('.g').attr('value', g).val(g);
		$(this).find('.b').attr('value', b).val(b);
		return $(this);
	},
	
	setHSV: function(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;

		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);

		if (min == max) {
			var h = 0;
			var s = 0;
			var v = Math.floor(min * 100);

		} else {
			var dif = (r == min) ? g - b : ((b == min) ? r - g : b - r);
			var hue = (r == min) ? 3 : ((b == min) ? 1 : 5);
			var chr = max - min;
			
			var h = Math.floor((hue - dif / chr) * 60);
			var s = Math.floor(chr / max * 100);
			var v = Math.floor(max * 100);
		}
		
		$(this).find('.h').attr('value', h).val(h);
		$(this).find('.s').attr('value', s).val(s);
		$(this).find('.v').attr('value', v).val(v);		
		return $(this);
	}
});


$(function() {
	
	$('.colours').sortable({
		handle: '.handle',
		update: function() {
			$('.save').addClass('active');
		}
	});
	
	var $blank = $('.row:first').clone()
		.find('input').val('').attr('value', '').each(function() {
			$(this).attr('name', $(this).attr('name').slice(0, -1));
		}).end()
		.find('.colour').css({visibility: 'hidden', backgroundColor: ''}).end();

	
	// left/right arrow on field
	
	$('.colours').on('keydown', 'input', function(e) {
		if (e.which == 37 || e.which == 39) {
			var $fields = $(this).closest('tr').find('input');
			var i = $fields.index($(this));
			var tgt = i + (e.which == 37 ? -1 : 1);
			if (tgt >= 0 && tgt < $fields.length) {
				$fields.eq(tgt).focus();
			}
		}
	});
	
	
	// up/down arrow on number field
	
	$('.colours').on('keydown', '.number', function(e) {
		if (e.which == 38 || e.which == 40) {
			var current = $(this).val() == '' ? 0 : parseInt($(this).val());
			var add = e.which == 38 ? 1 : -1;

			if ($(this).hasClass('h')) {
				var newval = (current + add + 360) % 360;
				
			} else {
				var max = $(this).hasClass('s') || $(this).hasClass('v') ?
						100 : 255;
				var newval = Math.max(0, Math.min(current + add, max));
			}
			
			$(this).attr('value', newval).val(newval);
			$(this).change();

		}
	});
	
	
	// hex value changed
	
	$('.colours').on('change', '.hex', function() {
		// check for valid hex in contents
		if (/^#?([0-9a-f]{3}){1,2}$/i.test($(this).val())) {
			// generate hex value
			var hex = '#' + $(this).val().replace('#', '');
			
			// calculate rgb
			if (hex.length == 4) {
				var r = parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16);
				var g = parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16);
				var b = parseInt(hex.slice(3, 4) + hex.slice(3, 4), 16);
			} else {
				var r = parseInt(hex.slice(1, 3), 16);
				var g = parseInt(hex.slice(3, 5), 16);
				var b = parseInt(hex.slice(5, 7), 16);
			}
			
			// update fields
			$(this).parent().setColour(r, g, b).setHex(r, g, b)
				.setRGB(r, g, b).setHSV(r, g, b);
			
		} else {
			// reset contents to value
			$(this).val($(this).attr('value'));
		}
	});
	
	
	// rgb values changed
	
	$('.colours').on('change', '.r, .g, .b', function() {
		var $rgb = $(this).parent().find('.r, .g, .b');
		
		if ($rgb.each(function() {
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
			
			var r = parseInt($rgb.filter('.r').val());
			var g = parseInt($rgb.filter('.g').val());
			var b = parseInt($rgb.filter('.b').val());

			// update fields
			$(this).parent().setColour(r, g, b).setHex(r, g, b).setHSV(r, g, b);
		}
	});
	
	
	// hsv values changed
	
	$('.colours').on('change', '.h, .s, .v', function() {
		var $hsv = $(this).parent().find('.h, .s, .v');
		
		if ($hsv.each(function() {
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
			
			var h = parseInt($hsv.filter('.h').val()) / 60;
			var s = parseInt($hsv.filter('.s').val()) / 100;
			var v = parseInt($hsv.filter('.v').val()) / 100;
			var rgb;
			
			if (s === 0) {
				rgb = [v, v, v];
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

			// update fields
			$(this).parent().setColour(r, g, b).setHex(r, g, b).setRGB(r, g, b);
		}
	});
	
	
	// add button clicked
	
	$('.add').click(function() {
		// add new blank row
		var i = 0;
		while ($('.colours input[name=name' + i + ']').length > 0) {
			i++;
		}
		$blank.clone().appendTo('.colours').find('input').each(function() {
			$(this).attr('name', $(this).attr('name') + i);
		});
		return false;
	});
	
	
	// inputs change: enable save button
	
	$('.colours').on('change', 'input', function() {
		$('.save').addClass('active');
	});
	
	
	// save button clicked
	
	$('.save').click(function() {
		if ($(this).hasClass('active')) {
			var colours = $('.colour').filter(function() {
				return $(this).css('visibility') == 'visible';
			}).siblings('input').serializeArray();
			
			$.post('save.php', {colours: colours}, function(data) {
				console.log(data);
				if (data == 1) {
					$('.save').removeClass('active');
				}
			});
		}
	});
	
	
	// delete row button clicked
	
	$('.colours').on('click', '.delete a', function() {
		if ($(this).closest('.row').find('.colour')
				.css('visibility') == 'visible') {
			$('.save').addClass('active');
		}
		$(this).closest('.row').remove();
		if (!$('.row').length) {
			$blank.clone().appendTo('.colours').find('input').each(function() {
				$(this).attr('name', $(this).attr('name') + 0);
			});
		}
	})
});



