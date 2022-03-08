import base64
import hashlib
import pyDes
import json
import VaultOptions

def Encrypt(toEncrypt, key):
    toEncryptArray = key + toEncrypt
    hash_md5 = hashlib.md5()
    hash_md5.update(key.encode(encoding='UTF-8'))
    key = hash_md5.hexdigest()
    iv = key[0:8]
    key2 = key[0:24]
    k = pyDes.triple_des(key2, pyDes.CBC, IV=iv, pad=None, padmode=pyDes.PAD_PKCS5)
    d = k.encrypt(toEncryptArray.encode())
    d = base64.b64encode(d)
    return d.decode() 


def Decrypt(toDecrypt, key):
    hash_md5 = hashlib.md5()
    hash_md5.update(key.encode(encoding='UTF-8'))
    key = hash_md5.hexdigest()
    iv = key[0:8]
    key2 = key[0:24]
    k = pyDes.triple_des(key2, pyDes.CBC, IV=iv, pad=None, padmode=pyDes.PAD_PKCS5)
    data = base64.b64decode(toDecrypt)
    d = k.decrypt(data)
    return d.decode()


if __name__ == '__main__':
    message= 'build-uat/tcis-ssc-keycloak/settings'
    key= 'rcms@!@#' 
    res = Encrypt(message, key)
    print(res)
    res2 = Decrypt(res, key)
    print(res2)

f = open('appsetting.json')
data = json.load(f)
u = VaultOptions.Person(**data['vault'])
f.close()


url_p = Encrypt(u.url, key)
key_p = Encrypt(u.key, key)
authType_p = Encrypt(u.authType, key)
token_p = Encrypt(u.token, key)
r = VaultOptions.Person(u.enabled, url_p, key_p, authType_p, token_p, u.username, u.password, u.securityKey)

print(r.enabled)
print(r.key)
print(r.password)
print(r.securityKey)
print(r.token)
print(r.url)

jsonstr1 = json.dumps(r.__dict__)

result = '{"vault": '+ jsonstr1 +'}'

print(jsonstr1)

with open("sercurity.json", "w") as outfile:
    outfile.write(result)