DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,

  product_name VARCHAR(50) NOT NULL,

  department_name VARCHAR(50) NOT NULL,

  price FLOAT(10,2) NOT NULL,

  stock_quantity INTEGER(10) NOT NULL,

  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Mario Odyssey", "Videogames", 60, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Resident Evil 2", "Videogames", 60, 57);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vintage Record Player", "Antiques", 149.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Walking Dead: Seasons 1-7", "DVD", 40, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beige Couch", "Furniture", 299.99, 57);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tortoise plushy", "Toys", 15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nerf Gun", "Toys", 34.99, 86);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doom", "Videogames", 60, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Medieval style french chair", "Furniture", 129.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Simpsons: Seasons 1-20", "DVD", 119.99, 200);

