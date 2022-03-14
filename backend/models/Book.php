<?php

include_once 'Product.php';

class Book extends Product
{
    private float $weight;

    public function __construct($data)
    {
        //extract($data);
        $this->SKU = htmlspecialchars(strip_tags($data->sku));
        $this->name = htmlspecialchars(strip_tags($data->name));
        $this->price = htmlspecialchars(strip_tags($data->price));
        $this->weight = htmlspecialchars(strip_tags($data->weight));

    }

    public function save(PDO $conn, string $table = "products"): void {

        $query = "
            INSERT INTO
                $table (sku, name, price, weight)
            VALUES
                ('$this->SKU', '$this->name', $this->price, $this->weight)
        ";

        $stmt = $conn->prepare($query);

        if ($stmt->execute()){
            printf("Book data saved successfully");
        } else {
            printf("Error: ", $stmt->errorInfo());
        }
    }

}