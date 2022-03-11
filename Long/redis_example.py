import redis

pool = redis.ConnectionPool(host='10.1.38.58', port=6379, db=0, password="ssc@TCIS!@#", decode_responses=True)
r = redis.Redis(connection_pool=pool)
r.set('foo', 'bar')
abc=r.get('foo')
list={
    "abc":"xyz",
    "a":"b",
    "fff":"zzz"
}
l=["abc","a","fff","foo"]
r.mset(list)