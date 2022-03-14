<?php

class Database
{
    // DB Params
    private string $host;
    private string $db_name;
    private string $username;
    private string $password;
    private string $charset;
    private PDO $conn;

    // The Constructor
    public function __construct($db_name, $password, $charset = 'utf8mb4', $host = 'localhost', $username = 'root')
    {
        $this->db_name = $db_name;
        $this->password = $password;
        $this->charset = $charset;
        $this->host = $host;
        $this->username = $username;
    }

    // DB Connect
    public function connect(): PDO
    {
        // $this->conn = new PDO('mysql');

        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->db_name;charset=$this->charset", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connecting Error: " . $e->getMessage();
        }

        return $this->conn;
    }
}