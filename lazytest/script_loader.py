import logging
logger = logging.getLogger("lazytest")

import glob,os,sys
import inspect,importlib
from lazytest.classes.AbstractScriptingTest import AbstractScriptingTest
from lazytest.classes.AbstractFuzzingGenerator import AbstractFuzzingGenerator

def load_iterators(dir):
    sys.path.append(dir)
    modules = glob.glob(os.path.join(dir, "**/*.py")) + glob.glob(os.path.join(dir, "*.py"))
    cls=[]
    for module in modules:
        cls.extend([c for n,c in inspect.getmembers(importlib.import_module(module.replace("/",".").replace("\\",".").removesuffix(".py")), inspect.isclass)])
    return [c for c in cls if c not in {AbstractScriptingTest,AbstractFuzzingGenerator} and (issubclass(c, AbstractScriptingTest) or issubclass(c, AbstractFuzzingGenerator))]