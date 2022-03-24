from datetime import datetime
from elasticsearch import Elasticsearch
es = Elasticsearch('https://localhost:9200')
 
doc = {
    'author': 'author_name',
    'text': 'Interensting content...',
    'timestamp': datetime.now(),
}
# Indexing a document
resp = es.index(index="test-index", id=1, document=doc)
print(resp['result'])
# Get document
resp = es.get(index="test-index", id=1)
# Refresh index
es.indices.refresh(index="test-index")
# Search for document
resp = es.search(index="test-index", query={"match_all": {}})
print("Got %d Hits:" % resp['hits']['total']['value'])
for hit in resp['hits']['hits']:
    print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])
# Updating document
resp = client.update(index="test-index", id=1, document=doc)
# Delete document
client.delete(index="test-index", id=1)