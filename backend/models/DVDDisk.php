<?php

include_once 'Product.php';

class DVDDisk extends Product
{
    private float $size;

    public function __construct($data)
    {
        $this->SKU = htmlspecialchars(strip_tags($data->sku));
        $this->name = htmlspecialchars(strip_tags($data->name));
        $this->price = htmlspecialchars(strip_tags($data->price));
        $this->size = htmlspecialchars(strip_tags($data->size));
    }

    public function save(PDO $conn, string $table = "products"): void {

        $query = "
            INSERT INTO
                $table (sku, name, price, size)
            VALUES
                ('$this->SKU', '$this->name', $this->price, $this->size)
        ";

        $stmt = $conn->prepare($query);

        if ($stmt->execute()){
            printf("DVD data saved successfully");
        } else {
            printf("Error: ", $stmt->errorInfo());
        }
    }

}