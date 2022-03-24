import base64
import hashlib
import pyDes

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