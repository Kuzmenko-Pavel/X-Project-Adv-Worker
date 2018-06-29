from .views import *


def setup_routes(app):
    app.router.add_route('GET', '/v1/pub', IframesView)
    app.router.add_route('POST', '/v1/pub', IframesView)
    app.router.add_route('POST', '/v1/advertises.json', AdvertisesView)
    # app.router.add_static('/v1/static/', app['config']['dir_path'] + '/static/', append_version=True)
