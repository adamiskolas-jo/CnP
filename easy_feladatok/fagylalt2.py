import os
os.system("cls")


fagylaltLista = []

def fagylaltNevek(nev:str):
    fagylaltLista.append(nev)
    return fagylaltLista

def Statisztika(fagylaltLista:str):
    fagylaltokSzama = len(fagylaltLista)
    fagylaltListaSzoveg = "".join(fagylaltLista)
    fagylaltLista = fagylaltListaSzoveg.strip("")
    veganFagylaltokSzama = fagylaltLista.count("vegán")
    print(f"{fagylaltokSzama} féle fagylalt kapható.\nEbből vegán ízesítésű: {veganFagylaltokSzama} db.")

while True:
    nev = input("Kérem a fagylalt nevét:    ")
    if not nev:
        break
    fagyiNevek = fagylaltNevek(nev)

Statisztika(fagyiNevek)