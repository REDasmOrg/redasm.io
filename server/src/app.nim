import prologue, github

let settings = newSettings(port = Port(3001))

proc getReleases(ctx: Context) {.async.} =
  resp jsonResponse(getReleases())

proc getArtifacts(ctx: Context) {.async.} =
  resp jsonResponse(getArtifacts())

let app = newApp(settings)
app.get("/artifacts", getArtifacts)
app.get("/releases", getReleases)
app.run()
