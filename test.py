import pokemon_learnset_db as learn_db

x = learn_db.pokemon_learnset_db['Vikavolt']

for set in x:
    print('######################')
    for row in set:
        if len(row) == 2:
            level, move = row
            if len(set[0][0]) == 1:  # if 1 digit, its a list of moves learned by level
                print("level:", level, '-', move)
            elif len(set[0][0]) == 2:  # if 2 digits, its a list of moves learned by TM
                print("TM:", level, '-', move)
        elif len(row) == 1:  # just move names and its a egg, tutor or evolution moveset
            print(row[0])

print(x[0] == x[5])  # some level up movesets are identical
print(x[3] == x[-1])  # some TM movesets are identical too
