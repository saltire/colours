<?php

$fields = array();
$colours = array();

if ($_POST['colours']) {
	foreach ($_POST['colours'] as $field) {
		$fields[$field['name']] = $field['value'];
	}
	
	foreach ($fields as $name => $value) {
		if (substr($name, 0, 4) == 'name') {
			$i = substr($name, 4);
			$colours[] = array(
					'name' => $value,
					'red' => $fields["r$i"],
					'green' => $fields["g$i"],
					'blue' => $fields["b$i"],
					'hue' => $fields["h$i"],
					'sat' => $fields["s$i"],
					'val' => $fields["v$i"],
					);
		}
	}
}
	
file_put_contents('colours.json', json_encode($colours));
echo 1;
