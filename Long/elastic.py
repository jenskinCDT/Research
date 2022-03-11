from datetime import datetime
from elasticsearch import Elasticsearch

es = Elasticsearch(
    basic_auth=("elastic", "abc"),
    hosts="https://10.1.38.58:9200",
    verify_certs=False
)
doc = {
    'author': 'author_name',
    'text': 'Interesting modified content...',
    'timestamp': datetime.now(),
}
res = es.get(index="test-index", id=1)
print(res['_source'])
es.indices.refresh(index="test-index")