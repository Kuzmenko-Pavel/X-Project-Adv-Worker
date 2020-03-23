import GeoIP
import os

from geoip2.database import Reader, MODE_MEMORY


def load_city_base(dir_path):
    return GeoIP.open(dir_path + '/GeoLiteCity.dat', GeoIP.GEOIP_MEMORY_CACHE)


def load_country_base(dir_path):
    return GeoIP.open(dir_path + '/GeoIP.dat', GeoIP.GEOIP_MEMORY_CACHE)


def load_city_base2(dir_path):
    return Reader(dir_path + '/GeoLite2-City.mmdb', mode=MODE_MEMORY)


def load_country_base2(dir_path):
    return Reader(dir_path + '/GeoLite2-Country.mmdb', mode=MODE_MEMORY)


def init_geo_ip(app):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    app.GeoIPCity = load_city_base(dir_path)
    app.GeoIPCountry = load_country_base(dir_path)
    app.GeoIPCity2 = load_city_base2(dir_path)
    app.GeoIPCountry2 = load_country_base2(dir_path)
