from pathlib import Path
from datetime import datetime
import os

class DownloadItem:
    def __init__(self, path, identifier):
        self._path = path
        self._date = os.path.getctime(path)
        self._id = identifier

    @property
    def id(self):
        return self._id

    @property
    def name(self):
        return os.path.basename(self._path)

    @property
    def root_path(self):
        return os.path.dirname(self._path)

    @property
    def path(self):
        return self._path

    @property
    def release_date(self):
        return datetime.fromtimestamp(self._date).strftime("%d/%m/%Y")

    @property
    def date(self):
        return self._date

    @property
    def size(self):
        res = os.path.getsize(self._path)
        for unit in ["","Ki","Mi","Gi","Ti","Pi","Ei","Zi"]:
            if abs(res) < 1024.0:
                return "%3.1f%s%s" % (res, unit, "B")
            res /= 1024.0
        return "%.1f%s%s" % (res, "Yi", "B")

class Downloads:
    def __init__(self):
        self._releases = list()
        self._nightlies = list()
        self._downloads = list();
        self.fetch_downloads("releases", self._releases)
        self.fetch_downloads("nightlies", self._nightlies)
        sorted(self._releases, key = lambda download: download.date, reverse=True)
        sorted(self._nightlies, key = lambda download: download.date, reverse=True)

    def fetch_downloads(self, folder: str, container):
        pathlist = Path.home().joinpath("downloads", folder).glob("**/*.*")

        for path in pathlist:
            di = DownloadItem(path, len(self._downloads))
            self._downloads.append(di)
            container.append(di)

    def get_download_path(self, identifier):
        return self._downloads[identifier].root_path

    @property
    def current_version(self):
        return "2.0"

    @property
    def releases(self):
        return self._releases

    @property
    def nightlies(self):
        return self._nightlies
