from setuptools import setup, find_packages

setup(
    name="lazytest",
    version="0.1",
    description="Testing tool for lazy dev",
    author="Duong Bui",
    author_email="buivd4@hotmail.com",
    packages=find_packages(),  # Automatically discover and include all packages
    install_requires=[
        "selenium==4.11.2",
        "rstr==3.2.1"
    ],
    entry_points={
        "console_scripts": [
            "lazytest = lazytest.main:main"
        ]
    },

)
