import os
os.system("cls")

def fagylaltNevek():
    fagylaltLista = []
    while True:
        nev = input("Kérem a fagylalt nevét:    ").lower().strip()
        if not nev:
            break
        fagylaltLista.append(nev)
    return fagylaltLista

def Statisztika(fagylaltLista:list):
    veganFagylaltokSzama = 0
    fagylaltokSzama = len(fagylaltLista)
    for i in fagylaltLista:
        if "vegán" in i:
            veganFagylaltokSzama += 1
    print(f"{fagylaltokSzama} féle fagylalt kapható.\nEbből vegán ízesítésű: {veganFagylaltokSzama} db.")

fagylaltLista = fagylaltNevek()
Statisztika(fagylaltLista)