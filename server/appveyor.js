const axios = require("axios");

module.exports = class AppVeyor {
  constructor(accountname, projectslug) {
    this.BEARER_TOKEN = "mwsh699lf3tm9tir8y93";
    this.PAGE_COUNT = 10;
    this.ALLOWED_HISTORY = ["buildId", "commitId", "created"];

    this.m_accountname = accountname;
    this.m_projectslug = projectslug;
    this.m_jobs = {};

    this._getProjectInfo().then((response) => {
      this.m_projectinfo = response.data;

      for (let job of this.m_projectinfo.build.jobs) {
        if (!(job.osType in this.m_jobs)) this.m_jobs[job.osType] = [];
        this.m_jobs[job.osType].push(job);
      }
    });
  }

  _get(endpoint) {
    return axios.get(`https://ci.appveyor.com/api${endpoint}`, {
      headers: {
        "Authorization": `Bearer: ${this.BEARER_TOKEN}`,
        "Content-type": "application/json"
      }
    });
  }

  _getProjectInfo() { return this._get(`/projects/${this.m_accountname}/${this.m_projectslug}`); }
  getOsTypes() { return Object.keys(this.m_jobs); }

  async getHistory() {
    const response = await this._get(`/projects/${this.m_accountname}/${this.m_projectslug}/history?recordsNumber=${this.PAGE_COUNT}`);
    let builds = response.data.builds.filter(b => b.status === "success");

    let filteredbuilds = [];

    for (let build of builds) {
      filteredbuilds.push(Object.keys(build)
                                .filter(key => this.ALLOWED_HISTORY.includes(key))
                                .reduce((obj, key) => {
                                  obj[key] = build[key];
                                  return obj;
                                }, {}));
    }

    return filteredbuilds;
  }

  getArtifacts() {
    console.log(this.m_projectinfo);
    for (let [osttype, jobs] of Object.entries(this.m_jobs)) {
      for (let job of jobs) {
        this._get(`/buildjobs/${job.jobId}/artifacts`).then((response) => {
          console.log(response.data);
        });
      }
    }
  }
}
