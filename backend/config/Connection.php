<?php
include_once 'Database.php';

class Connection
{
    public static function pipe(): PDO
    {
        $database = new Database('super_store', 'fBKjT0izaFjGGjBP', username: 'superAdmin');
        return $database->connect();
    }

}