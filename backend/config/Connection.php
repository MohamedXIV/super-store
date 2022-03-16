<?php
include_once 'Database.php';
include_once '../config/DotEnv.php';
(new DotEnv(__DIR__ . '/credentials.env'))->load();

class Connection
{
    public function pipe(): PDO
    {
        $database = new Database($_ENV['DB_NAME'], $_ENV['DB_PASSWORD'], 'utf8mb4', $_ENV['DB_HOST'], $_ENV['DB_USERNAME']);
        return $database->connect();
    }

}