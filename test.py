import learnset_db as db

pokemon = 'Abomasnow'

level_up1 = db.learnset_db[pokemon].get('Moves learnt by level up')
level_up2 = db.learnset_db[pokemon].get('Moves learnt by level up alt')
tm1 = db.learnset_db[pokemon].get("Moves learnt by TM")
tm2 = db.learnset_db[pokemon].get("Moves learnt by TM alt")
print(level_up1 == level_up2)
print(tm1 == tm2)

for i in level_up1:
    level, move = i
    print(f'Level:{level} - {move}')
