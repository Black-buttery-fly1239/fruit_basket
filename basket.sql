create table fruit_basket ( 
  id serial not null primary key,
  fruit_name text, 
  qty int, 
  price decimal (10,2)
  );


-- insert into basket(fruit_name,qty,price) values('Banana','0','4.00');
-- insert into basket(fruit_name,qty,price) values('Apple','0', '3.00');
-- insert into basket(fruit_name,qty,price) values('Orange','0','3.50');