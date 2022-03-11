import hvac
import Decrypt

def read_vault(token,path,url):
    client = hvac.Client(url=url,token=token)
    read_secret_result = client.secrets.kv.v1.read_secret(
        path=path,
        mount_point="kv/data",
    )
    return read_secret_result["data"]["data"]
def Get_Vault_web():
    x=Decrypt.decrypt_vault("appsetting.json")
    return read_vault(x["token"],x["key"],x["url"])