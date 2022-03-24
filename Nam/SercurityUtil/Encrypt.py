import SercurityUtil
import json
import VaultOptions

if __name__ == '__main__':
    g = open('appsetting.json')
    data = json.load(g)
    u = VaultOptions.Person(**data['vault'])
    g.close()

    url_p = SercurityUtil.Encrypt(u.url, u.securityKey)
    key_p = SercurityUtil.Encrypt(u.key, u.securityKey)
    authType_p = SercurityUtil.Encrypt(u.authType, u.securityKey)
    token_p = SercurityUtil.Encrypt(u.token, u.securityKey)

    r = VaultOptions.Person(u.enabled, url_p, key_p, authType_p, token_p, u.username, u.password, u.securityKey)

    jsonstr1 = json.dumps(r.__dict__)
    result = '{"vault": '+ jsonstr1 +'}'

    with open("Encrypt.json", "w") as outfile:
        outfile.write(result)