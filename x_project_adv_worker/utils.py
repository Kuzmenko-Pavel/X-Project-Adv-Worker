import linecache
import re
import sys

import trafaret as T

primitive_ip_regexp = r'^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$'

TRAFARET_CONF = T.Dict({
    T.Key('host'): T.Regexp(primitive_ip_regexp),
    T.Key('port'): T.Int(),
    T.Key('postgres'): T.Dict({
        T.Key('uri'): T.String(),
    }),
    T.Key('debug'): T.Dict({
        T.Key('status', default=False): T.Bool(),
        T.Key('console', default=False): T.Bool(),
    }),
})


def exception_message():
    exc_type, exc_obj, tb = sys.exc_info()
    f = tb.tb_frame
    lineno = tb.tb_lineno
    filename = f.f_code.co_filename
    linecache.checkcache(filename)
    line = linecache.getline(filename, lineno, f.f_globals)
    return 'EXCEPTION IN ({}, LINE {} "{}"): {}'.format(filename, lineno, line.strip(), exc_obj)


def encryptDecrypt(k, ip):
    if len(ip) < 1:
        return '0'
    key = list(ip)
    output = []
    for i in range(len(k)):
        xor_num = ord(k[i]) ^ ord(key[i % len(key)])
        output.append(chr(xor_num))

    return ''.join(output)


class Map(dict):
    """
    Example:
    m = Map({'first_name': 'Eduardo'}, last_name='Pool', age=24, sports=['Soccer'])
    """

    def __init__(self, *args, **kwargs):
        super(Map, self).__init__(*args, **kwargs)
        for arg in args:
            if isinstance(arg, dict):
                for k, v in arg.items():
                    if isinstance(v, dict):
                        self[k] = Map(v)
                    else:
                        self[k] = v

        if kwargs:
            for k, v in kwargs.items():
                if isinstance(v, dict):
                    self[k] = Map(v)
                else:
                    self[k] = v

    def __getattr__(self, attr):
        return self.get(attr)

    def __setattr__(self, key, value):
        self.__setitem__(key, value)

    def __setitem__(self, key, value):
        super(Map, self).__setitem__(key, value)
        self.__dict__.update({key: value})

    def __delattr__(self, item):
        self.__delitem__(item)

    def __delitem__(self, key):
        super(Map, self).__delitem__(key)
        del self.__dict__[key]


def css_minifier(css):
    css = re.sub(r'/\*[\s\S]*?\*/', "", css)
    css = re.sub(r'\s+', ' ', css)
    return css
