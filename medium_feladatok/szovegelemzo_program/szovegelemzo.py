import os
os.system("cls")

szoveg = input("Adjon meg egy tetszőleges szöveget: ")
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

leghosszabbSzo = ""
for szo in szovegLista:
    if len(szo) > len(leghosszabbSzo):
        leghosszabbSzo = szo
print(f"Leghosszabb szó: {leghosszabbSzo}")

betukLista = []
voltBetuk = []

for betu in szoveg:
    betuSzotar = {}
    if betu != " " and betu not in voltBetuk:
        voltBetuk.append(betu)
        betuSzotar['betu'] = betu
        betuSzotar['gyakorisag'] = szoveg.count(betu)
        betukLista.append(betuSzotar)        
index = 0

for i in betukLista:
    print(f"Betű: {betukLista[index]['betu']}, Gyakorisága: {betukLista[index]['gyakorisag']}")
    index += 1