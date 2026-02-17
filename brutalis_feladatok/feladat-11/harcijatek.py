import os, random
os.system("cls")

felhasználó = input("adjon meg egy nevet:")

kivalasztottKaszt = input("Add meg a kasztod :")

def dobas(a,b,c):
    eredmeny = 0
    for i in range(a):
        eredmeny+=random.randint(1,b)
    eredmeny+=c
    return eredmeny

class Harcos():
    def __init__(self):
        ero = random.randint(1,10)+10
        Gyorsasag = random.randint(2,6)+8
        ügyesseg = random.randint(3,6)
        print(f"Harcos ereje :{Harcos}")
        print(f"Harcos gyorsasága:")
        print(f"Harcos ügyessége:")

Harcos()

class tolvaj():
    def __init__(self):
        ero = random.randint(3,6)
        Gyorsasag = random.randint(1,10)+10
        ügyesseg = random.randint(2,6)+8
        print(f"Tolvaj ereje :{ero}")
        print(f"Tolvaj gyorsasága: {Gyorsasag}")
        print(f"Tolvaj ügyessége: {ügyesseg}")


class pap():
    def __init__(self):
        ero = random.randint(2,6)+8
        Gyorsasag = random.randint(3,6)
        ügyesseg = random.randint(1,10)+10
        print(f"Pap ereje :{ero}")
        print(f"Pap gyorsasága: {Gyorsasag}")
        print(f"Pap ügyessége: {ügyesseg}")


