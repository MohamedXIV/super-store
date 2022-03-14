<?php

include_once 'Product.php';

class Furniture extends Product
{
    private float $height;
    private float $width;
    private float $length;
    private string|false $dimensions;

    public function __construct($data)
    {
        $this->SKU = htmlspecialchars(strip_tags($data->sku));
        $this->name = htmlspecialchars(strip_tags($data->name));
        $this->price = htmlspecialchars(strip_tags($data->price));
        $this->height = htmlspecialchars(strip_tags($data->h));
        $this->width = htmlspecialchars(strip_tags($data->w));
        $this->length = htmlspecialchars(strip_tags($data->l));
        $this->dimensions = json_encode(['h'=>$this->height, 'w'=>$this->width, 'l'=>$this->length]);
    }

    public function logData()
    {
        echo $this->dimensions;
    }

    public function save(PDO $conn, string $table = "products"): void {

        $query = "
            INSERT INTO
                $table (sku, name, price, dimensions)
            VALUES
                ('$this->SKU', '$this->name', $this->price, '$this->dimensions')
        ";

        $stmt = $conn->prepare($query);

        if ($stmt->execute()){
            printf("Furniture data saved successfully");
        } else {
            printf("Error: ", $stmt->errorInfo());
        }
    }


}