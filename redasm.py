from flask import *
from website import *
import os

application = Flask(__name__)

if os.getenv("REDASM_TESTMODE"):
    print("WARNING: Running redasm.io in TEST MODE")
    application.jinja_env.auto_reload = True

website = WebSite()

@application.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(application.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@application.route("/")
def page_main():
    return render_template("index.html", website=website, page="/")

@application.route("/<path:subpath>")
def page_index(subpath):
    if subpath == "wiki":
        return redirect(website.wiki_url)
    elif subpath == "source":
        return redirect(website.repo_url)
    elif subpath == "community":
        return redirect(website.reddit_url)
    else:
        return render_template("index.html", website=website, page=subpath)

if __name__ == "__main__":
    application.run()
