from .views import (IframesView, InformerView,
                    OffersPlaceView, OffersSocialView, OffersAccountRetargetingView, OffersDynamicRetargetingView,
                    TestView, Dummy)


def setup_routes(app):
    app.router.add_route('GET', '/v1/pub', IframesView)
    app.router.add_route('POST', '/v1/pub', IframesView)
    app.router.add_route('POST', '/v1/informer.json', InformerView)
    app.router.add_route('POST', '/v1/place.json', OffersPlaceView)
    app.router.add_route('POST', '/v1/social.json', OffersSocialView)
    app.router.add_route('POST', '/v1/account_retargeting.json', OffersAccountRetargetingView)
    app.router.add_route('POST', '/v1/dynamic_retargeting.json', OffersDynamicRetargetingView)
    app.router.add_static('/v1/static/', 'x_project_adv_worker/static/', append_version=True)

    if app['config']['debug']:
        app.router.add_route('GET', '/v1/test', TestView)
        app.router.add_route('GET', '/bl.js', Dummy)
        app.router.add_route('POST', '/bl.js', Dummy)
        app.router.add_route('GET', '/logger.json', Dummy)
        app.router.add_route('POST', '/logger.json', Dummy)
