<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file']['tmp_name'];

        $data = array_map('str_getcsv', file($file));
        $columns = array_shift($data); // Extract column headers

        echo json_encode([
            'columns' => $columns,
            'rows' => $data,
        ]);
    } else {
        echo json_encode(['error' => 'No file uploaded']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>
