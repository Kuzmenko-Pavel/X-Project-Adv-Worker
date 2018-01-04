import hashlib
from base64 import encodebytes


async def static_hash(app):
    app.static_hash = {}
    dir_path = app['config']['dir_path']
    files = ['static/js/block.js']
    for file in files:
        sha = await sha256_checksum(dir_path + '/' + file)
        app.static_hash[file] = 'sha256-' + encodebytes(sha)[:-1].decode("utf-8")


async def sha256_checksum(filename):
    sha256 = hashlib.sha256()
    with open(filename, 'rb') as f:
        for block in iter(lambda: f.read(2**10), b''):
            sha256.update(block)
    return sha256.digest()
