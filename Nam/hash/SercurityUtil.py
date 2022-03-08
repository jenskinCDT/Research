import hashlib
import json
import VaultOptions
import base64
from pyDes import *

def Encrypt(toEncrypt, key):
    m = hashlib.md5()
    m.update(key.encode('utf-8'))
    k = triple_des(m.digest(), ECB , padmode=PAD_PKCS5)
    return k.encrypt(toEncrypt)

def Decrypt(toDecrypt, key):
    m = hashlib.md5()
    m.update(key.encode('utf-8'))
    k = triple_des(m.digest(), ECB , padmode=PAD_PKCS5)
    return k.decrypt(toDecrypt)

#aaaa = b'\xfb\xcc\xe3\x18\xe0~-\xdd-\\.\x97k\x02\xffC\x8b~\xc7<8\xfe|\xf7\x1f&\xd02\r\x91\xab+\xca\x88\x86\x8b\xa8j\xe76'
message= 'build-uat/tcis-ssc-keycloak/settings'
key= 'rcms@!@#' 

print ("Encrypted: %r" % Encrypt(message, key))
#print ("Decrypted: %r" % Decrypt(aaaa, key))
#print (base64.encodestring(Encrypt(message, key)))

# f = open('appsetting.json')
# data = json.load(f)
# u = VaultOptions.Person(**data['vault'])
# f.close()


# url_p = Encrypt(u.url, key)
# key_p = Encrypt(u.key, key)
# authType_p = Encrypt(u.authType, key)
# token_p = Encrypt(u.token, key)
# r = VaultOptions.Person(u.enabled, url_p, key_p, authType_p, token_p, u.username, u.password, u.securityKey)
# print(r.authType.decode("utf-8"))
# #print(r.authType.decode("utf-8", "ignore"))

# print(r.enabled)
# print(r.key)
# print(r.password)
# print(r.securityKey)
# print(r.token)
# print(r.url)
# print("Decrypted: %r" % Decrypt(token_p, key).decode("utf-8", "ignore"))
       
#jsonstr1 = json.dumps(r.__dict__)