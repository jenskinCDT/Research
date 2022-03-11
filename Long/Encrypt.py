import SercurityUtil
import json
import VaultOptions

def encrypt_vault(fileName):
    g = open(fileName)
    data = json.load(g)
    u = VaultOptions.Person(**data['vault'])
    g.close()

    url_p = SercurityUtil.Encrypt(u.url, u.securityKey)
    key_p = SercurityUtil.Encrypt(u.key, u.securityKey)
    authType_p = SercurityUtil.Encrypt(u.authType, u.securityKey)
    token_p = SercurityUtil.Encrypt(u.token, u.securityKey)

    r = VaultOptions.Person(u.enabled, url_p, key_p, authType_p, token_p, u.username, u.password, u.securityKey)

    jsonstr1 = json.dumps(r.__dict__)
    return '{"vault": '+ jsonstr1 +'}'