from flask import *
from website import *
import os

app = Flask(__name__)
website = WebSite()

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route("/")
def page_main():
    return render_template("index.html", website=website, page="/")

@app.route("/<path:subpath>")
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
    app.jinja_env.auto_reload = True
    app.run()
