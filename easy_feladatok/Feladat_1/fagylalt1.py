import os
os.system("cls")

gomboc_ar = int(input("Mennyibe kerül egy gombóc fagyi?: "))
tolcser_ar = int(input("Mennyibe kerül egy fagyistölcsér?: "))
mennyiseg = int(input("Hány gombóc fagylaltot szeretne?: "))
ar = gomboc_ar*mennyiseg
if mennyiseg <= 3:
    ar = ar+tolcser_ar

print(f"{mennyiseg} gombóc fagylalt a tölcsérrel együtt {ar} Ft lesz.")