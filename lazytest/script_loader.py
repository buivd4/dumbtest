import logging
logger = logging.getLogger("lazytest")

import glob,os
import inspect,importlib
from lazytest.classes.AbstractTestIterator import AbstractTestIterator
def load_iterators(dir):
    modules = glob.glob(os.path.join(dir, "*.py"))
    cls=[]
    for module in modules:
        cls.extend([c for n,c in inspect.getmembers(importlib.import_module(module.replace("/",".").replace("\\",".").removesuffix(".py")), inspect.isclass)])
    return [c for c in cls if c is not AbstractTestIterator and issubclass(c, AbstractTestIterator)]