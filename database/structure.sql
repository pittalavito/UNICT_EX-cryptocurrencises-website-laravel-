

/*--- USERS -----------------------------------------------------------------------------------------*/
CREATE TABLE users (
  id        integer       primary key auto_increment,
  username  varchar(16)   not null unique,
  email     varchar(255)  not null unique,
  password  varchar(255)  not null,
  nome      varchar(255)  not null,
  cognome   varchar(255)  not null,
  img       varchar(255),
  n_watch   integer default 0,
  n_news    integer default 0,
  saldo     numeric(38,2)  default 100000,
  balance   numeric(38,2)  default 0,   
  since     timestamp      not null default current_timestamp
)Engine = InnoDB;

/*--- WATCHLIST ASSETS -------------------------------------------------------------------------------*/
CREATE TABLE assets_watchlist (
  id         integer       primary key auto_increment,
  us         integer       not null, 
  id_crypto  varchar(16)   not null,  /*id criptovaluta*/
  unique(us , id_crypto),
  foreign key(us) references users(id) on delete cascade on update cascade
)Engine = InnoDB ;

DELIMITER //
CREATE TRIGGER add_watchlist_assets
AFTER INSERT ON assets_watchlist
FOR EACH ROW
BEGIN
UPDATE users
SET n_watch = n_watch + 1
WHERE id = new.us;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER delete_watchlist_assets
AFTER DELETE ON assets_watchlist
FOR EACH ROW
BEGIN
UPDATE users
SET n_watch = n_watch - 1
WHERE id = old.us;
END //
DELIMITER ;

/*--- WATCHLIST NEWS ---------------------------------------------------------------------------------*/
CREATE TABLE news_watchlist (
  id           integer        primary key auto_increment,
  us           integer        not null,
  title        varchar(255)   not null,
  description  varchar(512)   not null,
  image        varchar(255)   ,
  url          varchar(255)   not null,
  foreign key(us) references users(id) on delete cascade on update cascade
)Engine = InnoDB ;

DELIMITER //
CREATE TRIGGER add_watchlist_news
AFTER INSERT ON news_watchlist
FOR EACH ROW
BEGIN
UPDATE users 
SET n_news = n_news + 1
WHERE id = new.us;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER delete_watchlist_news
AFTER DELETE ON news_watchlist
FOR EACH ROW
BEGIN
UPDATE users 
SET n_news = n_news - 1
WHERE id = old.us;
END //
DELIMITER ;

/*--- PORTFOLIO --------------------------------------------------------------------------------------*/

CREATE TABLE portfolio (
  id          integer              primary key auto_increment,
  us          integer              not null, 
  id_crypto   varchar(16)          not null,  /*id criptovaluta*/
  quantita    numeric(38,10)       default 0, 
  img         varchar(255),
  unique(us , id_crypto),
  foreign key(us) references users(id) on delete cascade on update cascade
)Engine = InnoDB;

/*--- TRANSACTIONS  -------------------------------------------------------------*/

CREATE TABLE transactions (
  id          integer         primary key auto_increment,
  us          integer         not null,
  id_crypto   varchar(16)     not null,
  tipo        boolean         default 0,
  importo     numeric(38,2)   not null,
  quantita    numeric(38,10)  not null,
  since       timestamp       not null default current_timestamp,
  foreign key(us)  references users(id) on delete cascade on update cascade
)Engine=InnoDB;








