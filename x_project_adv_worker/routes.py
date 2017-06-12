from .views import (IframesView, InformerView,
                    OffersPlaceView, OffersSocialView, OffersAccountRetargetingView, OffersDynamicRetargetingView,
                    TestView, Dummy)


def setup_routes(app):
    app.router.add_route('GET', '/pub', IframesView)
    app.router.add_route('POST', '/pub', IframesView)
    app.router.add_route('POST', '/informer.json', InformerView)
    app.router.add_route('POST', '/place.json', OffersPlaceView)
    app.router.add_route('POST', '/social.json', OffersSocialView)
    app.router.add_route('POST', '/account_retargeting.json', OffersAccountRetargetingView)
    app.router.add_route('POST', '/dynamic_retargeting.json', OffersDynamicRetargetingView)

    app.router.add_route('GET', '/test', TestView)
    app.router.add_route('GET', '/bl.js', Dummy)
    app.router.add_route('POST', '/bl.js', Dummy)
