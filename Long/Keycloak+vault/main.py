from multiprocessing import set_forkserver_preload
from pickle import NONE
import requests
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import json
from authlib.jose import jwt
from SercurityUtil import Decrypt
import sqlite
import vault

app = FastAPI()
urlToken="https://10.1.38.58:7000/auth/realms/tcis/protocol/openid-connect/token"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    payload={
        "username":form_data.username,
        "password":form_data.password,
        "grant_type":form_data.grant_type,
        "client_id":"rcms-api",
        "client_secret":"Sd0SRFvJ6MBoR2ltlwA1RO5dMuBsxjob"
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    token_response = requests.request(
        "POST", urlToken, data=payload, headers=headers, verify=False
    )
    token = json.loads(token_response.content)
    return token
class Item:
  def __init__(self, id, name, age, address):
    self.name = name
    self.age = age
    self.id = id
    self.address = address
data=[]
for x in range(1000):
    item=Item(x,"nhatga_"+ str(x),23,"Unknow")
    data.append(item)
class requestBody:
    page : NONE
    limit : NONE
    def __init__(self, page, limit):
        self.page=page
        self.limit=limit

@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme), page: int=0, limit: int=100):
    f = open('cert.cer', "r")
    tk=jwt.decode(token,f.read())
    f.close()
    try:
        tk.validate()
    except:
        return{"Error":401}
    return sqlite.select(limit,(limit*page))
@app.get("/get-vault-web/")
async def read_items(token: str = Depends(oauth2_scheme)):
    f = open('cert.cer', "r")
    tk=jwt.decode(token,f.read())
    f.close()
    try:
        tk.validate()
    except:
        return{"Error":401}
    return vault.Get_Vault_web()
