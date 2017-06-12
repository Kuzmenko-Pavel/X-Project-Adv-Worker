from .iframes import IframesView
from .informer import InformerView
from .offers_place import OffersPlaceView
from .offers_social import OffersSocialView
from .offers_account_retargeting import OffersAccountRetargetingView
from .offers_dynamic_retargeting import OffersDynamicRetargetingView

from .test import TestView
from .dummy import Dummy

__all__ = (IframesView, InformerView,
           OffersPlaceView, OffersSocialView, OffersAccountRetargetingView, OffersDynamicRetargetingView,
           TestView, Dummy)
