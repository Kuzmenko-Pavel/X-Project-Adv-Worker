import asyncio

import pytest

from x_project_adv_worker.main import init


@pytest.yield_fixture
def loop():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()


@pytest.fixture
def app(loop, test_client):
    return init(loop, [])


async def test_items_get(test_client, app):
    client = await test_client(app)
    resp = await client.get('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_head(test_client, app):
    client = await test_client(app)
    resp = await client.head('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_post(test_client, app):
    client = await test_client(app)
    resp = await client.post('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_options(test_client, app):
    client = await test_client(app)
    resp = await client.options('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_post_valid(test_client, app):
    empty_data = dict({
        'css': '',
        'block': dict(),
        'offers': list(),
        'clean': {
            'place': None,
            'social': None,
            'account_retargeting': None,
            'dynamic_retargeting': None
        },
        'parther': False,
        'test': False
    })
    client = await test_client(app)
    payload = {"w": 631, "h": 400, "ti": "EVB%5CS", "guid_block": "8715ca9e-6bb9-11e7-8440-d8cb8a7f86f0", "auto": True,
               "country": "", "region": "", "ip": "37.57.27.229", "is_webp": True, "test": False,
               "time_start": 1585841506469, "cost": 0, "gender": 0, "thematics": [], "mediaQ": "d", "lc": "2",
               "vw": "1920", "vh": "1053", "retargeting": [], "index": 2,
               "exclude": ["125", "299", "467", "808", "1002", "1467891", "4397960", "21464367"],
               "thematics_exclude": [], "retargeting_account_exclude": [], "retargeting_dynamic_exclude": []}

    headers = {
        'x-requested-with': 'XMLHttpRequest',
        'content-type': 'text/plain;charset=UTF-8',
        'cookie': 'yottos_unique_id=15858415007834132; bhpp=2.5.5'
    }
    resp = await client.post('/v2/items', json=payload, headers=headers)
    assert resp.status == 200
    resp_data = await resp.json()
    assert resp_data != empty_data
    assert len(resp_data['offers']) > 0
    assert len(resp_data['css']) > 0
    assert not resp_data['test']


async def test_items_post_broken_json(test_client, app):
    empty_data = dict(
        {'clean': {'account_retargeting': True, 'place': True, 'social': True, 'dynamic_retargeting': True},
         'test': False, 'css': '', 'block': {}, 'parther': False, 'offers': []})
    client = await test_client(app)
    payload = 'ip=94.180.161.4&origin=http%3A%2F%2Fhelpers.com.ua&location=http%3A%2F%2Fhelpers.com.ua%2F%3Fadsbyyottos_ip%3D94.180.161.4&referrer=&cd=true&rotator=0&hdl=false&index=0&rand=1585844998298&post=true&scr=9200beb4-b468-11e5-a497-00e081bad801&mod=20191120142546&h=1275&w=160&m=d&vw=1920&vh=1053'

    headers = {
        'x-requested-with': 'XMLHttpRequest',
        'content-type': 'text/plain;charset=UTF-8',
        'cookie': 'yottos_unique_id=15858415007834132; bhpp=2.5.5'
    }
    resp = await client.post('/v2/items', data=payload, headers=headers)
    assert resp.status == 200
    resp_data = await resp.json()
    print(resp_data)
    assert resp_data == empty_data


async def test_items_post_valid_random(test_client, app, faker):
    fake_guid_block = "1715ca9e-6bb9-11e7-8440-d8cb8a7f86f1"
    for mediaQ in ['m', 't', 'd', '']:
        for guid_block in ["8715ca9e-6bb9-11e7-8440-d8cb8a7f86f0", fake_guid_block,
                           "9200beb4-b468-11e5-a497-00e081bad801"]:
            client = await test_client(app)
            for x in range(0, 1000):
                empty_data = dict({
                    'css': '',
                    'block': dict(),
                    'offers': list(),
                    'clean': {
                        'place': None,
                        'social': None,
                        'account_retargeting': None,
                        'dynamic_retargeting': None
                    },
                    'parther': False,
                    'test': False
                })
                is_webp = faker.pybool()
                test = faker.pybool()
                payload = {"w": faker.pyint(10, 1000),
                           "h": faker.pyint(10, 1000),
                           "ti": "OUBX%5C",
                           "guid_block": guid_block,
                           "auto": faker.pybool(),
                           "country": "",
                           "region": "",
                           "ip": faker.ipv4(),
                           "is_webp": is_webp,
                           "test": test,
                           "time_start": faker.unix_time(),
                           "cost": 1,
                           "gender": 0,
                           "thematics": ["255.255.255", "141.172.107.238.159", "114.209.148.110.102", "6.1.2",
                                         "18.3.16",
                                         "18.3.7", "49.216.48.189.242", "14.1", "14.2", "2.143.5.245.95"],
                           "mediaQ": mediaQ,
                           "lc": "2",
                           "vw": "1920",
                           "vh": "1053",
                           "retargeting": [["451283", "D7AE4545-4EC1-4F46-A484-AA249D423ED7", 27],
                                           ["001", "9DB56C62-6D0C-49C6-A735-1FE70D94896F", 28],
                                           ["006", "9DB56C62-6D0C-49C6-A735-1FE70D94896F", 28],
                                           ["007", "9DB56C62-6D0C-49C6-A735-1FE70D94896F", 28],
                                           ["", "D7AE4545-4EC1-4F46-A484-AA249D423ED7", 28],
                                           ["_", "d7eca385-2542-4c34-b2f9-2fc5a0e4c21d", 28],
                                           ["1", "43711F9F-464B-4DA2-A013-D23A581A9538", 1],
                                           ["2", "43711F9F-464B-4DA2-A013-D23A581A9538", 1],
                                           ["683975900", "75251188-6ABF-4A39-87D0-A38280779F9B", 1],
                                           ["_", "43711F9F-464B-4DA2-A013-D23A581A9538", 1],
                                           ["3", "43711F9F-464B-4DA2-A013-D23A581A9538", 1]], "index": 1,
                           "exclude": ["125", "299", "467", "700", "808", "850", "851", "852", "897", "1002", "1023",
                                       "1137",
                                       "1321", "1467891", "4397960", "21464367"],
                           "thematics_exclude": [],
                           "retargeting_account_exclude": [],
                           "retargeting_dynamic_exclude": ["5036901"]
                           }

                headers = {
                    'x-requested-with': 'XMLHttpRequest',
                    'content-type': 'text/plain;charset=UTF-8',
                    'cookie': 'yottos_unique_id=15858415007834132; bhpp=2.5.5',
                    'user-agent': faker.user_agent(),
                    'ACCEPT': 'application/json, text/javascript, */*; q=0.01'
                }
                resp = await client.post('/v2/items', json=payload, headers=headers)
                assert resp.status == 200
                resp_data = await resp.json()
                assert resp_data != empty_data
                assert len(resp_data['offers']) > 0
                assert len(resp_data['css']) > 0
                assert resp_data['test'] == test if guid_block != fake_guid_block else True
