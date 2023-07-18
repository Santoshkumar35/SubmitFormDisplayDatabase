<?php 
include('dbConnection.php');
$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data,true);
$id = $mydata['id'];

$name = $mydata['name'];
$email = $mydata['email'];
$password = $mydata['password'];

// // Insert data
// if(!empty($name) && !empty($email) && !empty($password)){
//     $sql = "INSERT INTO student(name, email, password) VALUES ('$name','$email','$password')";
//     if($conn->query($sql) == TRUE){
//         echo "Student Submit Successfully";
//     }else{
//         echo "Unable to Save Student";
//     }
// }
// else{
//     echo "Fill ALL Fields";
// }

// Insert data or Update data
if(!empty($name) && !empty($email) && !empty($password)){
    $sql = "INSERT INTO student2 (id, name, email, password) VALUES ('$id' , '$name','$email','$password') ON DUPLICATE KEY UPDATE name='$name' , email='$email', password = '$password'";
    if($conn->query($sql) == TRUE){
        echo "Student Submit Successfully";
    }else{
        echo "Unable to Save Student";
    }
}
else{
    echo "Fill ALL Fields";
}
?>