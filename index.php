<html>
	<head>
		<title>Colours</title>
		<link rel="stylesheet" type="text/css" href="colours.css" />
		<script type="text/javascript" src="jquery-1.10.1.min.js"></script>
		<script type="text/javascript" src="colours.js"></script>
	</head>
	<body>
		<table>
			<tr>
				<th></th>
				<th class="sep"></th>
				<th>Name</th>
				<th class="sep"></th>
				<th>Hex</th>
				<th class="sep"></th>
				<th>R</th>
				<th>G</th>
				<th>B</th>
				<th class="sep"></th>
				<th>H</th>
				<th>S</th>
				<th>V</th>
				<th class="sep"></th>
				<th></th>
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
				<td class="colour"<?php echo $hex ? " style=\"visibility: visible; background-color: $hex;\"" : ''; ?>></td>
				<td class="sep"></td>
				<td><input type="text" name="name<?php echo $i; ?>" maxlength="50" class="name" value="<?php echo $colour['name']; ?>" /></td>
				<td class="sep"></td>
				<td><input type="text" name="hex<?php echo $i; ?>" maxlength="7" class="hex" value="<?php echo $hex; ?>" /></td>
				<td class="sep"></td>
				<td><input type="text" name="r<?php echo $i; ?>" maxlength="3" class="number r" value="<?php echo $colour['red']; ?>" /></td>
				<td><input type="text" name="g<?php echo $i; ?>" maxlength="3" class="number g" value="<?php echo $colour['green']; ?>" /></td>
				<td><input type="text" name="b<?php echo $i; ?>" maxlength="3" class="number b" value="<?php echo $colour['blue']; ?>" /></td>
				<td class="sep"></td>
				<td><input type="text" name="h<?php echo $i; ?>" maxlength="3" class="number h" value="<?php echo $colour['hue']; ?>" /></td>
				<td><input type="text" name="s<?php echo $i; ?>" maxlength="3" class="number s" value="<?php echo $colour['sat']; ?>" /></td>
				<td><input type="text" name="v<?php echo $i; ?>" maxlength="3" class="number v" value="<?php echo $colour['val']; ?>" /></td>
				<td class="sep"></td>
				<td class="colour"<?php echo $hex ? " style=\"visibility: visible; background-color: $hex;\"" : ''; ?>></td>
			</tr>
<?php } ?>
		</table>
		<div class="buttons">
			<a class="add active">&#xff0b; Add</a>
			<a class="save">&#x2191; Save</a>
		</div>
	</body>
</html>