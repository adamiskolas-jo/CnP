import os, random
def cls():
    os.system("cls")

cls()

def dobas(hanyszorGeneralja:int, meddig:int, hozzaadottSzam:int=0):
    eredmeny = 0
    for _ in range(hanyszorGeneralja):
        eredmeny += random.randint(1, meddig)
    return eredmeny + hozzaadottSzam

class Karakter():
    def __init__(self, nev:str, kaszt:str, fegyver:str):
        self.nev = nev
        self.kaszt = kaszt
        self.fegyver = fegyver
        self.hp = 25    

        if kaszt == "harcos":
            self.ero = dobas(1, 10, 10)
            self.gyorsasag = dobas(2,6,8)
            self.ugyesseg = dobas(3,6)
            self.specialName = "Csatakiáltás"
            self.special = "Erős karakter, csatakiáltás képességgel, ami 3 körre plusz 1d6 sebzést ad, de csözzenti a védekezést 20%-kal."

        elif kaszt == "tolvaj":
            self.ero = dobas(3,6)
            self.gyorsasag = dobas(1, 10, 10)
            self.ugyesseg = dobas(2,6,8)
            self.specialName = "Hátbaszúrás"
            self.special = "Gyors karakter, hátbaszúrás képességgel, ami 1,5-szörös sebzést okoz és nem hárítható."


        elif kaszt == "pap":
            self.ero = dobas(2,6,8)
            self.gyorsasag = dobas(3,6)
            self.ugyesseg = dobas(1,10,10)
            self.specialName = "Gyógyítás"
            self.special = "Ügyes karakter, gyógyítás képességgel, ami 5 életpontot visszaad."


        # Fegyverek
        
        if fegyver == "kard":
            self.fegyverDmg = dobas(1,6,3)
            self.fegyverSpeed = 6
            self.fegyverDefense = 8
            self.fegyverAttack = 6
            self.fegyverKardBlacklist = ""
 
        elif fegyver == "tőr":
            self.fegyverDmg = dobas(1,6)
            self.fegyverSpeed = 10
            self.fegyverDefense = 3
            self.fegyverAttack = 10
            self.fegyverTorBlacklist = "harcos"
        
        elif fegyver == "bot":
            self.fegyverDmg = dobas(1,4)
            self.fegyverSpeed = 8
            self.fegyverDefense = 10
            self.fegyverAttack = 8
            self.fegyverBotWhitelist = "pap"
 
        elif fegyver == "pallos":
            self.fegyverDmg = dobas(2,6)
            self.fegyverSpeed = 1
            self.fegyverDefense = 1
            self.fegyverAttack = 4
            self.fegyverPallosWhitelist = "harcos"
        
        elif fegyver == "buzogány":
            self.fegyverDmg = dobas(2,4,2)
            self.fegyverSpeed = 4
            self.fegyverDefense = 5
            self.fegyverAttack = 4
            self.fegyverBuzoganyBlacklist = "tolvaj"
        
        self.tamadas = max(0, self.ero - 10) + self.fegyverAttack 
        self.vedekezes = max(0, self.ugyesseg - 10) + self.fegyverDefense  
        self.kezdemenyezes = max(0, self.gyorsasag - 10) + self.fegyverSpeed
        self.specialUsedLastRound = False
       
karakterekSzama = 0
def karakterLetrehozas():
    global karakterekSzama
    cls()
    print(">>>> Karakter Létrehozás <<<<")
    if karakterekSzama == 0:
        print("Hozd létre az első karaktert!")
    else:
        print("Hozd létre a második karaktert!")

    kivalasztottNev = input("Adj meg egy nevet a karakternek:  ")
    while True:
        print(" Válassz egy kasztot!\n  Választható kasztok:")
        print("  1. Harcos\n  2. Tolvaj\n  3. Pap")
        kivalasztottKaszt = int(input("Add meg a kasztod (1-3):   "))
        match kivalasztottKaszt:
            case 1:
                kivalasztottKaszt = "harcos"
                break
            case 2:
                kivalasztottKaszt = "tolvaj"
                break
            case 3:
                kivalasztottKaszt = "pap"
                break
            case _:
                input("Helytelen kaszt!\nEnter az újrapróbáláshoz")
                cls()

    while True:
        cls()
        print(" Válassz egy fegyvert!\n  Választható fegyverek:")
        print("  1. Kard")

        if kivalasztottKaszt == "harcos":
            print("  2. Pallos | Harcos Exklúzív")
            print("  3. Buzogány")
            kivalasztottFegyver = int(input("Add meg a fegyvered (1-4):   "))
            match kivalasztottFegyver:
                case 1:
                    kivalasztottFegyver = "kard"
                    break
                case 2:
                    kivalasztottFegyver = "pallos"
                    break
                case 3:
                    kivalasztottFegyver = "buzogány"
                    break
                case _:
                    input("Helytelen választás!\nEnter az újrapróbáláshoz!")


        elif kivalasztottKaszt == "tolvaj":
            print("  2. Tőr")
            kivalasztottFegyver = int(input("Add meg a fegyvered (1-2):   ")) # egyenlőre neki csak kardja van :c
            match kivalasztottFegyver:
                case 1:
                    kivalasztottFegyver = "kard"
                    break
                case 2:
                    kivalasztottFegyver = "tőr"
                    break
                case _:
                    input("Helytelen !\nEnter az újrapróbáláshoz!")

        elif kivalasztottKaszt == "pap":
            print("  2. Bot | Pap Exklúzív")
            print("  3. Buzogány")
            kivalasztottFegyver = int(input("Add meg a fegyvered (1-3):   "))
            match kivalasztottFegyver:
                case 1:
                    kivalasztottFegyver = "kard"
                    break
                case 2:
                    kivalasztottFegyver = "bot"
                    break
                case 3:
                    kivalasztottFegyver = "buzogány"
                    break
                case _:
                    input("Helytelen !\nEnter az újrapróbáláshoz!")

    letrehozottKarakter = Karakter(kivalasztottNev, kivalasztottKaszt, kivalasztottFegyver)
    cls()
    cls()
    print(">>> Karakter Létrehozva <<<")
    print("Alap statisztika:")
    print(f"  Név: {letrehozottKarakter.nev}")
    print(f"  Kaszt: {letrehozottKarakter.kaszt}")
    print(f"  Fegyver: {letrehozottKarakter.fegyver}")
    print("\nKarakter statisztika:")
    print(f"  Életerő: {letrehozottKarakter.hp}")
    print(f"  Erő: {letrehozottKarakter.ero}")
    print(f"  Gyorsaság: {letrehozottKarakter.gyorsasag}")
    print(f"  Ügyesség: {letrehozottKarakter.ugyesseg}")
    print(f"  Támadás: {letrehozottKarakter.tamadas}")
    print(f"  Védekezés: {letrehozottKarakter.vedekezes}")
    print(f"  Kezdeményezés: {letrehozottKarakter.kezdemenyezes}")
    input("\nFegyver statisztika (ENTER):   ")
    print(f"  Fegyver típusa: {letrehozottKarakter.fegyver}")
    print(f"  Fegyver Sebzése: {letrehozottKarakter.fegyverDmg}")
    print(f"  Fegyver Védekezése: {letrehozottKarakter.fegyverDefense}")
    print(f"  Fegyver Gyorsasága: {letrehozottKarakter.fegyverSpeed}")
    print(f"  Fegyver Támadása: {letrehozottKarakter.fegyverAttack}")
    input("\nENTER a folytatáshoz!   ")

    karakterekSzama += 1
    return letrehozottKarakter

karakter1 = karakterLetrehozas()
karakter2 = karakterLetrehozas()

def harc():
    global karakter1, karakter2
    cls()
    if (karakter1.kezdemenyezes + dobas(1,10)) > (karakter2.kezdemenyezes + dobas(1,10)):
        print(">>> Harc <<<")
        while True:
            print(f"{karakter1.nev} Mit fogsz tenni?")
            if karakter1.specialUsedLastRound == False:
                print("Lehetőségek:\n Támadás (1) | Védekezés (2) | Képesség (3) | Képesség infó (4)")
            else:
                print("Lehetőségek:\n Támadás (1) | Védekezés (2) | Nem használhatod most a képességed | Képesség infó (4)")
            try:
                valasztasHarc = int(input("Válassz!   "))
                match valasztasHarc:
                    case 1:
                        pass #tamad
                        break
                    case 2:
                        pass #vedekez
                        break
                    case 3:
                        if karakter1.specialUsedLastRound == False:
                            pass # kepessegel
                            break
                    case 4:
                        cls()
                        print(f"\nKépességed neve: {karakter1.specialName}\nKépesség leírása: {karakter1.special}")
                        input("Enter a visszalépéshez!   ")
                        cls()
            except:
                input("Helytelen választás!\nPróbáld újra\nEnter a visszalépéshez!   ")
                cls()
           

harc()