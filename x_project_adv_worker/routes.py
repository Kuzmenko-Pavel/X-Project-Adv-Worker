from .views import IframesView, BlocksView, StylesView


def setup_routes(app):
    app.router.add_route('GET', '/iframe', IframesView)
    app.router.add_route('GET', '/blocks', BlocksView)
    app.router.add_route('POST', '/styles.json', StylesView)
