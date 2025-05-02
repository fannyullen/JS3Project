CREATE TABLE products(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  productName TEXT,
  productPrice TEXT,
  description TEXT,
  category TEXT,
  color TEXT,
  image TEXT,
  urlSlug TEXT UNIQUE
);

INSERT INTO products (
  productName,
  productPrice,
  description,
  category,
  color,
  image,
  urlSlug
) VALUES (
    'Striped Coupe',
    '250',
    'Imponera på gästerna med dessa vackra och unika glas. Passar utmärkt till både drinken och desserten. Kommer i ett set av 2.',
    'Glass',
    'Pink',
    '/public/stripedCoupe.png',
    'striped-coupe'
);

INSERT INTO products (
  productName,
  productPrice,
  description,
  category,
  color,
  image,
  urlSlug
) VALUES (
    'Dotted Coupe',
    '250',
    'Imponera på gästerna med dessa vackra och unika glas. Passar utmärkt till både drinken och desserten. Kommer i ett set av 2.',
    'Glass',
    'Blue',
    '/public/dottedCoupe.png',
    'dotted-coupe'
);