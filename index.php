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
		<table>
			<tr>
				<th class='handle'></th>
				<th class='colour'></th>
				<th class='sep'></th>
				<th class='name'>Name</th>
				<th class='sep'></th>
				<th class='hex'>Hex</th>
				<th class='sep'></th>
				<th class='number'>R</th>
				<th class='number'>G</th>
				<th class='number'>B</th>
				<th class='sep'></th>
				<th class='number'>H</th>
				<th class='number'>S</th>
				<th class='number'>V</th>
				<th class='sep'></th>
				<th class='colour'></th>
				<th class='delete'></th>
			</tr>
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
			<tr>
				<td class='handle'><a>&#x2591;</a></td>
				<td class='colour'<?php echo $hex ? " style='visibility: visible; background-color: $hex;'" : ''; ?>></td>
				<td class='sep'></td>
				<td class='name'><input type='text' name='name<?php echo $i; ?>' maxlength='50' value='<?php echo $colour['name']; ?>' /></td>
				<td class='sep'></td>
				<td class='hex'><input type='text' name='hex<?php echo $i; ?>' maxlength='7' value='<?php echo $hex; ?>' /></td>
				<td class='sep'></td>
				<td class='number'><input type='text' name='r<?php echo $i; ?>' maxlength='3' class='r' value='<?php echo $colour['red']; ?>' /></td>
				<td class='number'><input type='text' name='g<?php echo $i; ?>' maxlength='3' class='g' value='<?php echo $colour['green']; ?>' /></td>
				<td class='number'><input type='text' name='b<?php echo $i; ?>' maxlength='3' class='b' value='<?php echo $colour['blue']; ?>' /></td>
				<td class='sep'></td>
				<td class='number'><input type='text' name='h<?php echo $i; ?>' maxlength='3' class='h' value='<?php echo $colour['hue']; ?>' /></td>
				<td class='number'><input type='text' name='s<?php echo $i; ?>' maxlength='3' class='s' value='<?php echo $colour['sat']; ?>' /></td>
				<td class='number'><input type='text' name='v<?php echo $i; ?>' maxlength='3' class='v' value='<?php echo $colour['val']; ?>' /></td>
				<td class='sep'></td>
				<td class='colour'<?php echo $hex ? " style='visibility: visible; background-color: $hex;'" : ''; ?>></td>
				<td class='delete'><a>&#x2715;</a></td>
			</tr>
<?php } ?>
		</table>
		<div class='buttons'>
			<a class='add active'>&#xff0b; Add</a>
			<a class='save'>&#x2191; Save</a>
		</div>
	</body>
</html>