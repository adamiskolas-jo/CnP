import os, random
os.system("cls")

class Suti():
    def __init__(self, nev:str, tipus:str, ar:int, egyseg:str):
        self.nev = nev
        self.tipus = tipus
        self.ar = ar
        self.egyseg = egyseg
        self.eladas = 0
        self.bevetel = 0

    def EladasGeneralas(self):
        self.eladas = random.randint(100, 500)
        return self.eladas

    def BevetelSzamitas(self):
        self.bevetel = self.eladas * self.ar