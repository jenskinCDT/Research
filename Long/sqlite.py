from sqlalchemy import *
import sqlite3

conn = sqlite3.connect('test.db')
metadata_obj = MetaData()
user = Table('NhatGa', metadata_obj,
    Column('Id', Integer),
    Column('Name', String),
    Column('Age', Integer),
    Column('Address', String)
)
engine = create_engine('sqlite:///test.db')
def Create_db():
  metadata_obj.create_all(engine)
def insert():
  data=[]
  for x in range(1000):
    item={"Id":x,"Name":"NhatGa_"+str(x),"Age":x,"Address":"Unknow"}
    data.append(item)
  engine.execute(user.insert(), data)
def select(lm,ofs):
  test=engine.execute(user.select().limit(lm).offset(ofs))
  data=[]
  for x in test:
    data.append(x)
  return data
Create_db()
insert()