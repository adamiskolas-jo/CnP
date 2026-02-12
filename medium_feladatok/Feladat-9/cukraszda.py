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

sutemenyek = []
with open(f"{os.path.dirname(__file__)}/13_2024-03-10_11-16-56_4255.txt", "r", encoding="utf-8") as f:
    for beolvasottSuti in f:
        beolvasottSuti = beolvasottSuti.split(";")
        nev = beolvasottSuti[0]
        tipus  = beolvasottSuti[1]
        ar = int(beolvasottSuti[2])
        egyseg = beolvasottSuti[3].strip()
        uj_suti = Suti(nev, tipus, ar, egyseg)
        uj_suti.EladasGeneralas()
        uj_suti.BevetelSzamitas()
        sutemenyek.append(uj_suti)

with open(f"{os.path.dirname(__file__)}/sutik.txt", "w", encoding="utf-8") as txt:
    for sutemeny in sutemenyek:
        txt.write(f"Sütemény neve: {sutemeny.nev}\nA sütemény kiszerelése: {sutemeny.egyseg}")
        if sutemeny.egyseg == "kg":
            txt.write(f"\nEladott mennyiség: {sutemeny.eladas} kg\nBevétel: {sutemeny.bevetel} Ft\n")
        else:
            txt.write(f"\nEladott mennyiség: {sutemeny.eladas} db\nBevétel: {sutemeny.bevetel} Ft\n")
        if sutemeny.bevetel > 100000:
            txt.write("NÉPSZERŰ\n-------------------------------------\n")
        else:
            txt.write("-------------------------------------\n")

