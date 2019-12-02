from ipaddress import IPv4Network
from os import path
import json

res = []
json_path = path.join(path.dirname(path.abspath(__file__)), "customer_ips.json")
with open(json_path) as json_file:
    data = json.load(json_file)
    for item in data:
        res.append(IPv4Network(item))

# PROM.UA
res.append(IPv4Network('193.34.169.0/24'))
# META.UA
res.append(IPv4Network('194.0.131.0/24'))

customer_ips = set(res)
