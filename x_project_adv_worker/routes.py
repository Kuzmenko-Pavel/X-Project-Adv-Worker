from .views import *


def setup_routes(app):
    app.router.add_route('GET', '/v2/pub', IframesView)
    app.router.add_route('POST', '/v2/pub', IframesView)
    app.router.add_route('GET', '/v2/partners', PartnersIframeView)
    app.router.add_route('POST', '/v2/partners', PartnersIframeView)
    app.router.add_route('GET', '/v2/not_found', NotFoundView)
    app.router.add_route('POST', '/v2/not_found', NotFoundView)
    app.router.add_route('POST', '/v2/advertises.json', AdvertisesView)
    app.router.add_route('POST', '/v2/items', AdvertisesView)
    app.router.add_route('POST', '/v2/error.json', ErrorView)
    app.router.add_route('POST', '/v2/error', ErrorView)
    app.router.add_route('POST', '/v2/not_found.json', NotFoundView)
    app.router.add_static('/v2/static/', app['config']['dir_path'] + '/static/', append_version=True)
