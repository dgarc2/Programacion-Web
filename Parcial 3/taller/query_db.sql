CREATE DATABASE eventos_db;
use eventos_db;
create table eventos(
    id int auto_increment primary key,
    nombre varchar(255) not null,
    descripcion text,
    fecha date not null,
    lugar varchar(255)
);
create table reservas(
    id int auto_increment primary key,
    evento_id int,
    usuario_id int,
    fecha_reserva date,
    foreign key (evento_id) references eventos(id)
);