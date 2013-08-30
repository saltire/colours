<!DOCTYPE html>
<html>
	<head>
		<title>Colours</title>
		<meta charset='utf-8'>
		<link rel='stylesheet' type='text/css' href='colours.css' />
		<script type='text/javascript' src='jquery-1.10.1.min.js'></script>
		<script type='text/javascript' src='jquery-ui-1.10.3.sortable.min.js'></script>
		<script type='text/javascript' src='colours.js'></script>
	</head>
	<body>
		<div class='header'>
			<span></span>
			<div class='colour'></div>
			<div class='name'>Name</div>
			<div class='hex'>Hex</div>
			<div class='number r'>R</div>
			<div class='number g'>G</div>
			<div class='number b'>B</div>
			<div class='number h'>H</div>
			<div class='number s'>S</div>
			<div class='number v'>V</div>
			<div class='colour'></div>
			<span></span>
			<span></span>
		</div>
		<div class='colours'>
<?php
$colours = json_decode(file_get_contents('colours.json'), 1)
	?: array(0 => array('name' => '',
		'red' => '', 'green' => '', 'blue' => '',
		'hue' => '', 'sat' => '', 'val' => ''
	));

foreach ($colours as $i => $colour) {
	if ($colour['red'] != '') {
		$hex = '#' . sprintf('%06x',
			$colour['red'] * 65536 +
			$colour['green'] * 256 +
			$colour['blue']);
	} else {
		$hex = '';
	}
?>
			<div class='row'>
				<a class='handle left' title='move up/down'>&#x2591;</a>
				<div class='colour'<?php echo $hex ? " style='visibility: visible; background-color: $hex;'" : ''; ?>></div>
				<input class='name' type='text' name='name<?php echo $i; ?>' maxlength='50' value='<?php echo $colour['name']; ?>' />
				<input class='hex' type='text' name='hex<?php echo $i; ?>' maxlength='7' value='<?php echo $hex; ?>' />
				<input class='number r' type='text' name='r<?php echo $i; ?>' maxlength='3' value='<?php echo $colour['red']; ?>' />
				<input class='number g' type='text' name='g<?php echo $i; ?>' maxlength='3' value='<?php echo $colour['green']; ?>' />
				<input class='number b' type='text' name='b<?php echo $i; ?>' maxlength='3' value='<?php echo $colour['blue']; ?>' />
				<input class='number h' type='text' name='h<?php echo $i; ?>' maxlength='3' value='<?php echo $colour['hue']; ?>' />
				<input class='number s' type='text' name='s<?php echo $i; ?>' maxlength='3' value='<?php echo $colour['sat']; ?>' />
				<input class='number v' type='text' name='v<?php echo $i; ?>' maxlength='3' value='<?php echo $colour['val']; ?>' />
				<div class='colour'<?php echo $hex ? " style='visibility: visible; background-color: $hex;'" : ''; ?>></div>
				<a class='setbkgd right' title='set as background'>&#x25a3;</a>
				<a class='delete right' title='remove'>&#x2715;</a>
			</div>
<?php } ?>
		</div>
		<div class='buttons'>
			<a class='add active'>&#xff0b; Add</a>
			<a class='save'>&#x2191; Save</a>
		</div>
	</body>
</html>