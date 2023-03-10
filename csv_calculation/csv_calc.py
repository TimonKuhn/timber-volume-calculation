import csv

L = []

with open("Bäume_Lenzerheide.csv") as file:
    reader = csv.reader(file, delimiter=",")
    for data in reader:
        L.append(data[4])
        reader.__next__()

L = L[1:len(L)]

# Volumen aus der Höhe und einem nach der Höhe klassifizierten Durchmesser
# V = (D^2 x H)/2
Volumen =0

for Hoehe in L:
    Hoehe = float(Hoehe)
    if 15 > Hoehe > 20:
        Durchmesser = 25
    elif Hoehe > 25:
        Durchmesser = 35
    elif Hoehe > 30:
        Durchmesser = 45
    elif Hoehe > 35:
        Durchmesser = 60
    elif Hoehe > 40:
        Durchmesser = 75
    else:
        Durchmesser = 0
    Volumen += (Durchmesser**2*Hoehe)/2

print(Volumen)