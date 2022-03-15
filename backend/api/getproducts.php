<?php

// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../models/General.php';
include_once '../config/Connection.php';


getProducts();

// Get Products
function getProducts()
{
    $conn = new Connection();
    $reader = new General();
    $reader->read($conn->pipe());
    echo getenv('DATABASE_USERNAME');
}

