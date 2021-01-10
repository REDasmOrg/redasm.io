from flask import url_for
import os

class WebSite:
    def __init__(self):
        self._menu = { "Home": "/",
                       "Features": "/features",
                       "Roadmap": "/roadmap",
                       "Download": "/download" }

    def _readlines(self, filename):
        lines = []
        with open("static/assets/" + filename) as fp:
            lines = fp.readlines()
        return lines

    def _readcolumns(self, filename):
        columns = [ ]
        lines = self._readlines(filename)
        for line in lines:
            columns.append(line.split("|"))
        return columns

    @property
    def version(self):
        return "0.6.0"

    @property
    def title(self):
        return "REDasm Disassembler"

    @property
    def short_title(self):
        return "REDasm"

    @property
    def brand(self):
        return "REDasm: The OpenSource Disassembler"

    @property
    def logo_navbar_url(self):
        return url_for("static", filename="assets/logo_navbar.png")

    @property
    def logo_url(self):
        return url_for("static", filename="assets/logo.png")

    @property
    def repo_url(self):
        return "https://github.com/REDasmOrg/REDasm"

    @property
    def bugtracker_url(self):
        return self.repo_url + "/issues"

    @property
    def wiki_url(self):
        return self.repo_url + "/wiki"

    @property
    def reddit_url(self):
        return "https://www.reddit.com/r/REDasm"

    @property
    def telegram_url(self):
        return "https://t.me/REDasmDisassembler"

    @property
    def menu(self):
        return self._menu

    def menu_url(self, key):
        return self._menu[key]

    def get_features(self):
        return self._readlines("features.txt")

    def get_roadmap(self):
        return self._readcolumns("roadmap.txt")

    def get_assemblers(self):
        return self._readcolumns("assemblers.txt")

    def get_formats(self):
        return self._readcolumns("formats.txt")

    def get_packages(self):
        return self._readcolumns("packages.txt")

    def get_carousel(self):
        carousel = [ ]
        for root, dirs, files in os.walk("static/assets/carousel"):
            for file in files:
                if file.endswith(".png"):
                    carousel.append(os.path.join(root, file))
        return carousel
