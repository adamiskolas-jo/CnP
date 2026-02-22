import os
os.system("cls")

szoveg = input("Adjon meg egy tetzőleges szöveget: ")
szovegLista = szoveg.split()
karakterekSzama = 0
maganhanzokSzama = 0
szavakSzama = len(szovegLista)

for betu in szoveg:
    karakterekSzama += 1
    if betu in ["a", "á", "e", "é", "i", "í", "o", "ó", "ö", "ő", "ü", "ű", "u", "ú"]:
        maganhanzokSzama += 1

print(f"Karakterek száma: {karakterekSzama}")
print(f"Szavak száma: {szavakSzama}")
print(f"Magánhangzók száma: {maganhanzokSzama}")