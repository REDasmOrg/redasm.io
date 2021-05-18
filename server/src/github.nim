import httpclient, strformat, json, times, os

const GITHUB_URL = "https://api.github.com/repos/REDasmOrg/REDasm"
const ARTIFACTS_FILE = "artifacts.json"
const RELEASES_FILE = "releases.json"

proc isExpired(filename: string): bool =
  if not fileExists(filename): return true

  let now = getTime()
  let fi = getFileInfo(filename);
  return (now - fi.lastWriteTime).inDays > 0;

proc read(filename: string): JsonNode =
  try:
    return parseJson(readFile(filename))
  except:
    return newJNull()

proc request(q: string, filename: string): JsonNode =
  let client = newHttpClient()

  try:
    let s = client.getContent(fmt"{GITHUB_URL}/{q}")
    writeFile(filename, s)
    return parseJson(s)
  except:
    return newJNull()

proc check(q: string, filename: string): JsonNode =
  if isExpired(filename):
    return request(q, filename)

  return read(filename)

proc getReleases*(): JsonNode =
  return check("releases", RELEASES_FILE);

proc getArtifacts*(): JsonNode =
  return check("actions/artifacts", ARTIFACTS_FILE);

