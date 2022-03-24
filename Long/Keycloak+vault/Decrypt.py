import SercurityUtil
import json
import VaultOptions

def decrypt_vault(fileNAME):
    g = open(fileNAME)
    data = json.load(g)
    u = VaultOptions.Person(**data["vault"])
    g.close()

    url_p = SercurityUtil.Decrypt(u.url, u.securityKey)
    key_p = SercurityUtil.Decrypt(u.key, u.securityKey)
    authType_p = SercurityUtil.Decrypt(u.authType, u.securityKey)
    token_p = SercurityUtil.Decrypt(u.token, u.securityKey)

    r = VaultOptions.Person(u.enabled, url_p.replace(u.securityKey, ""), key_p.replace(u.securityKey, ""), authType_p.replace(u.securityKey, ""), token_p.replace(u.securityKey, ""), u.username, u.password, u.securityKey)

    jsonstr1 = json.dumps(r.__dict__)
    return '{"vault": '+ jsonstr1 +'}'
