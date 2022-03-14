<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../models/General.php';
include_once '../config/Connection.php';

getProducts();

// Get Products
function getProducts()
{
    $reader = new General();
    $reader->read(Connection::pipe());
}

