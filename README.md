# X-Project-Adv-Worker

Getting Started
---------------

- Change directory into your newly created project.

    cd X-Project-Adv-Worker

- Create a Python virtual environment.

    virtualenv --no-site-packages -p python3.5 env

- Upgrade packaging tools.

    env/bin/pip install --upgrade pip setuptools

- Install the project req

    sudo apt install unixodbc-dev python3.5-pyodbc

- Install the project in editable mode with its testing requirements.

    env/bin/pip install -e .


`sudo siege -v -b -c10 -t60S -H "X-Requested-With: XMLHttpRequest" 'http://0.0.0.0:8000/v1/informer.json POST {"w":1920,"h":389,"device":"pc","block_id":"9200beb4-b468-11e5-a497-00e081bad801","auto":false,"country":"UA","ip":"37.57.27.229","token":"EVBS","cost":0,"gender":0,"retargeting":[["1460851","75251188-6ABF-4A39-87D0-A38280779F9B",1],["217358277","75251188-6ABF-4A39-87D0-A38280779F9B",1],["94411852","75251188-6ABF-4A39-87D0-A38280779F9B",1],["2","43711F9F-464B-4DA2-A013-D23A581A9538",0]]}'`

`siege -v -c20 -b -i -t60S -H "X-Requested-With: XMLHttpRequest" 'http://0.0.0.0:8000/v1/advertises.json POST {"w":1920,"h":456,"block_id":"c9ccda88-9168-11e7-b157-002590d97638","auto":false,"country":"","region":"","ip":"95.69.249.86","is_webp":true,"time_start":1540211411591,"cost":0,"gender":0,"retargeting":[],"index":0,"exclude":["5179316357172120968","1901696542839098254","9144991745399145044","1005409559897328022","2988262943206755558","2026812908325454892","6224928934085936498","947240442154729772","2559453081161517894","9080172258984150114","7526099027832947414","3990773600190416004","5784538230554316312","2210914635834869478","1428845613045467194","5098398741490910320","6623452348237434874","1938713863801750884","1545028889637635268","4746136404598738028","5249753866119171382","7730689736615936004","7965075983486569176","5381726314654354984","8209315122543477368","5572813720506223552","7931973822863131478","5994612239035943994","4934162144124420160","723994675913576280","1525597325622987624","7370192153185767320","1752918400163203144","4884593497643696886","5069711519087805214","58209501292348570","8609886460703950714","2142421339942569884","1235065446806997890"],"retargeting_account_exclude":[],"retargeting_dynamic_exclude":[]}'`


sudo -u postgres psql
CREATE DATABASE ad_worker;
CREATE USER ad_worker WITH password 'ad_worker';
GRANT ALL ON DATABASE ad_worker TO ad_worker;
create role root login nocreaterole nocreatedb nosuperuser noinherit;
create database root;
sudo -u postgres psql -d ad_worker
VACUUM FULL VERBOSE ANALYZE;
CREATE EXTENSION pg_buffercache;
