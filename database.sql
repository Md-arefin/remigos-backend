CREATE DATABASE remigosDB;

CREATE TABLE products (
    id UUID PRIMARY KEY,
    category VARCHAR(255),
    name VARCHAR(255),
    seller VARCHAR(255),
    price DECIMAL(10, 2),
    stock INT,
    ratings INT,
    ratings_count INT,
    img VARCHAR(255),
    shipping INT,
    quantity INT
);