''' 1-es feladat  '''
create DATABASE mbt;


create table telek(
	id int not null,
    telepules text,
    muvmod text,
    allapot text,
    fedoszint decimal(6,2),
	fekuszint decimal(6,2),
    PRIMARY KEY(id)
);

CREATE TABLE nyersanyag(
    id int not null,
    nev text,
    PRIMARY KEY(id)
);

CREATE TABLE kapcsolo(
	telekid int not null,
    nyersanyagid int not null,
    FOREIGN KEY(telekid) REFERENCES telek(id),
    FOREIGN KEY(nyersanyagid) REFERENCES nyersanyag(id)
);


''' 2-es feladat  '''
SELECT telepules, muvmod FROM `telek` where allapot="S" order by telepules;

''' 3-as feladat  '''
SELECT DISTINCT telek.telepules, nyersanyag.nev from ((kapcsolo inner join telek on telek.id = kapcsolo.telekid) INNER JOIN nyersanyag on nyersanyag.id = kapcsolo.nyersanyagid) where fekuszint<0 and fedoszint<0;

''' 4-es feladat  '''
SELECT DISTINCT telek.telepules, telek.fedoszint, telek.fekuszint from ((kapcsolo inner join telek on telek.id = kapcsolo.telekid) INNER JOIN nyersanyag on nyersanyag.id = kapcsolo.nyersanyagid) where nyersanyag.nev LIKE "%dolomit%" and telek.allapot="M";

''' 5-ös feladat  '''
SELECT telek.telepules, (telek.fedoszint+telek.fekuszint) AS "vastagsag", nyersanyag.nev  from ((kapcsolo inner join telek on telek.id = kapcsolo.telekid) INNER JOIN nyersanyag on nyersanyag.id = kapcsolo.nyersanyagid) where nyersanyag.nev LIKE "%kavics%" order by telek.fedoszint-telek.fekuszint desc limit 3;

''' 6-os feladat  '''
SELECT telek.telepules, nyersanyag.nev, telek.fekuszint, telek.fedoszint  from ((kapcsolo inner join telek on telek.id = kapcsolo.telekid) INNER JOIN nyersanyag on nyersanyag.id = kapcsolo.nyersanyagid) 
where telek.fedoszint >= 450 AND telek.fekuszint <= 550

''' 7-es feladat  '''
SELECT nyersanyag.nev, COUNT(DISTINCT telek.id) as "banyatelekek-szama" from ((kapcsolo inner join telek on telek.id = kapcsolo.telekid) INNER JOIN nyersanyag on nyersanyag.id = kapcsolo.nyersanyagid) GROUP BY nyersanyag.nev ORDER BY `banyatelekek-szama` desc limit 1;