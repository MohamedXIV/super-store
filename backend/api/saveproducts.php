<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


include_once '../config/Connection.php';
include_once '../models/Book.php';
include_once '../models/DVDDisk.php';
include_once '../models/Furniture.php';


$data = json_decode(file_get_contents("php://input"));

echo $data->type;

saveProducts($data);

function saveProducts($post)
{
    $productTypes = array(
        "book" => 0,
        "dvd" => 1,
        "furniture" => 2
    );

    $conn = new Connection();

    if (!empty($post)) {
        $productType = intval($post->type);
        switch ($productType) {
            case $productTypes['book']:
                $book = new Book($post);
                $book->save($conn->pipe());
                echo "Book Data Inserted ";
                break;
            case $productTypes['dvd']:
                $dvd = new DVDDisk($post);
                $dvd->save($conn->pipe());
                echo "DVD data inserted";
                break;
            case $productTypes['furniture']:
                $furniture = new Furniture($post);
                $furniture->save($conn->pipe());
//                $furniture->logData();
                echo " Furniture data inserted";
                break;
            default :
                echo "No Data Saved! ";

        }
    } else {
        echo "POST array is empty";
    }
}




