from flask import *
from website import *
from downloads import *
import re
import os

application = Flask(__name__)

if os.getenv("REDASM_TESTMODE"):
    print("WARNING: Running redasm.io in TEST MODE")
    application.jinja_env.auto_reload = True

website = WebSite()

@application.template_filter("identifier")
def identifier(input):
    return re.sub(r"\s+", "_", input.lower())

@application.route("/favicon.ico")
def favicon():
    return send_from_directory(application.static_folder, "favicon.ico", mimetype="image/vnd.microsoft.icon")

@application.route("/robots.txt")
def robots():
    print(application.static_folder)
    return send_from_directory(application.static_folder, "robots.txt", mimetype="text/plain")

@application.route("/sitemap.xml")
def sitemap():
    pages = []

    for k in website.menu:
        if website.menu[k] == "/":
            continue
        pages.append(request.url_root + website.menu[k][1:])

    sitemapxml = render_template("sitemap.xml", pages=pages)
    response = make_response(sitemapxml)
    response.headers["Content-Type"] = "application/xml"
    return response

@application.route("/")
def page_main():
    return render_template("index.html", website=website, page="/")

@application.route("/download/<int:identifier>/<string:filename>")
def download_file(identifier, filename):
    downloads = Downloads()
    print(downloads.get_download_path(identifier))
    return send_from_directory(directory=downloads.get_download_path(identifier), filename=filename)

@application.route("/<path:subpath>")
def page_index(subpath):
    PAGES = ["features", "roadmap", "download"]
    if subpath not in PAGES: abort(404)

    if subpath == "download":
       downloads = Downloads()
       return render_template("index.html", website=website, downloads=downloads, page=subpath)

    return render_template("index.html", website=website, downloads=None, page=subpath)

if __name__ == "__main__":
    application.run()
