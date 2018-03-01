from .views import *


def setup_routes(app):
    app.router.add_route('GET', '/v1/pub', IframesView)
    app.router.add_route('POST', '/v1/pub', IframesView)
    app.router.add_route('POST', '/v1/advertises.json', AdvertisesView)
    #FAST BAG FIX, static path not found
    app.router.add_static('/v1/static/', 'x_project_adv_worker/static/', append_version=True)

