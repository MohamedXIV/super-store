<?php

abstract class Product
{
    // Base Properties
    private string $SKU;
    private string $name;
    private float $price;

    // Get Products
    public function read(PDO $conn, string $table = "products"): void
    {
        $query = "SELECT * FROM $table ORDER BY id";

        // Prepare
        $res = $conn->prepare($query);

        // Execute query
        $res->execute();

        // Get row counts
        $rowCounts = $res->rowCount();

        // Check if there are any products
        if ($rowCounts > 0) {
            $productsArray = array();

            while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                $productsArray[] = $row;
            }
            echo json_encode($productsArray);
        } else {
            echo json_encode(
                array('message' => 'No Products Found')
            );
        }
    }
}