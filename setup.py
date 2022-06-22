import os
import re

from setuptools import setup, find_packages


def read_version():
    regexp = re.compile(r"^__version__\W*=\W*'([\d.abrc]+)'")
    init_py = os.path.join(os.path.dirname(__file__),
                           'x_project_adv_worker', '__init__.py')
    with open(init_py) as f:
        for line in f:
            match = regexp.match(line)
            if match is not None:
                return match.group(1)
        else:
            msg = 'Cannot find version in x_project_adv_worker/__init__.py'
            raise RuntimeError(msg)


# 'aiodns==1.1.1',
# 'ujson==1.35',
# 'multidict==4.4.2',
# 'uvloop==0.11.3',
install_requires = ['aiohttp==2.3.10',
                    'aiodns==2.0.0',
                    'ujson==2.0.2',
                    'Jinja2==2.11.1',
                    'multidict==4.7.5',
                    'aiohttp-jinja2==0.15.0',
                    'async-timeout==2.0.1',
                    'trafaret==2.0.2',
                    'trafaret-config==2.0.2',
                    'pytz==2019.3',
                    'GeoIP==1.3.2',
                    'asyncpg==0.20.1',
                    'scipy==1.4.1',
                    'numpy==1.22.0',
                    'uvloop==0.14.0',
                    'cchardet==2.1.6',
                    'chardet==3.0.4',
                    'aiohttp-debugtoolbar==0.5.0',
                    'ua-parser==0.10.0',
                    'trans==2.1.0',
                    'maxminddb==1.5.2',
                    'geoip2==3.0.0',
                    'pytest-aiohttp',
                    'pytest-asyncio',
                    'pytest',
                    'Faker',
                    'pytest-faker'
                    ]

setup(
    name="X-Project-Adv-Worker",
    version=read_version(),
    url="",
    packages=find_packages(),
    package_data={
        'x_project_adv_worker': [
            './../conf.yaml',
            '*.json',
            './**/*.json',
            './**/*.mmdb',
            './**/*.dat',
            './**/*.html',
            './**/**/*.js'
        ]
    },
    include_package_data=True,
    install_requires=install_requires,
    zip_safe=False,
    entry_points={
        'console_scripts': [
        ],
    }
)
