<?php
include_once 'Database.php';
include_once '../config/DotEnv.php';
(new DotEnv(__DIR__ . '/credentials.env'))->load();

class Connection
{
    public function pipe(): PDO
    {
        // localhost = 'super_store', 'fBKjT0izaFjGGjBP', 'utf8mb4', 'localhost', 'superAdmin'
        // epiz: 'epiz_31286135_super_store', 'VRT4s6aLh5S', 'utf8mb4', 'sql101.epizy.com', 'epiz_31286135'
        $database = new Database($_ENV['DB_NAME'], $_ENV['DB_PASSWORD'], 'utf8mb4', $_ENV['DB_HOST'], $_ENV['DB_USERNAME']);
        return $database->connect();
    }

}