<?php
include('dbConnection.php');

// When you click Edit button below code get Executed
$data = stripcslashes(file_get_contents("php://input"));
$mydata = json_decode($data,true);
$id = $mydata['sid'];

// Retrieving Specific Student Information
$sql = "SELECT * FROM Student2 WHERE id = {$id}";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

// Returning Json format Data as Response to Ajax Call
echo json_encode($row);


?>