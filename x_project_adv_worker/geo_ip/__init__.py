import os
import GeoIP


def load_city_base(dir_path):
    return GeoIP.open(dir_path + '/GeoLiteCity.dat', GeoIP.GEOIP_MEMORY_CACHE)


def load_country_base(dir_path):
    return GeoIP.open(dir_path + '/GeoIP.dat', GeoIP.GEOIP_MEMORY_CACHE)


def init_geo_ip(app):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    app.GeoIPCity = load_city_base(dir_path)
    app.GeoIPCountry = load_country_base(dir_path)
