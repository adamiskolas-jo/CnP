import os, random
os.system("cls")

felhasználó = input("adjon meg egy nevet:")

kivalasztottKaszt = input("Add meg a kasztod :")

def dobas(hanyszorGeneralja:int, meddig:int, hozzaadottSzam:int=0):
    eredmeny = 0
    for _ in range(hanyszorGeneralja):
        eredmeny += random.randint(1, meddig)
    return eredmeny + hozzaadottSzam

class character():
    def __init__(self, nev, kaszt, fegyver):
        self.nev = nev
        self.kaszt = kaszt
        self.fegyver = fegyver
        self.hp = 25

        if kaszt == "harcos":
            self.ero = dobas(1, 10, 10)
            self.gyorsasag = dobas(2,6,8)
            self.ugyesseg = dobas(3,6)

        elif kaszt == "tolvaj":
            self.ero = dobas(3,6)
            self.gyorsasag = dobas(1, 10, 10)
            self.ugyesseg = dobas(2,6,8)

        elif kaszt == "pap":
            self.ero = dobas(2,6,8)
            self.gyorsasag = dobas(3,6)
            self.ugyesseg = dobas(1,10,10)

        
        if fegyver == "kard":
            self.fegyverDmg = dobas(1,6,3)
            self.fegyverSpeed = 6
            self.fegyverDefense = 8
            self.fegyverAttack = 6
 
        elif fegyver == "tőr":
            self.fegyverDmg = dobas(1,6)
            self.fegyverSpeed = 10
            self.fegyverDefense = 3
            self.fegyverAttack = 10
            # Harcos NEM használhatja
        
        elif fegyver == "bot":
            self.fegyverDmg = dobas(1,4)
            self.fegyverSpeed = 8
            self.fegyverDefense = 10
            self.fegyverAttack = 8
            # CSAK a pap használhatja
 
        elif fegyver == "pallos":
            self.fegyverDmg = dobas(2,6)
            self.fegyverSpeed = 1
            self.fegyverDefense = 1
            self.fegyverAttack = 4
            # CSAK A HARCOS
        
        elif fegyver == "buzogány":
            self.fegyverDmg = dobas(2,4,2)
            self.fegyverSpeed = 4
            self.fegyverDefense = 5
            self.fegyverAttack = 4
            # a Tolvaj NEM használhatja
        

