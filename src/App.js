import './App.css';

import axios from 'axios';
import React, { Component } from 'react';

import ApiKeyInput from './components/ApiKeyInput';
import RepoList from './components/RepoList';
import logo from './logo.svg';

const GITHUB_REPO_PER_PAGE = 100;

const http = axios.create({
  baseURL: 'https://api.github.com',
});

class App extends Component {
  state = {
    apiKey: null,
    selectedRepo: null,
    repos: [],
    issues: [],
  };

  handleApiKeySubmit = apiKey => {
    http.defaults.headers.common['Authorization'] = `token ${apiKey}`;
    this.fetchRepos();
    this.setState({ apiKey });
  };

  handleRepoSelect = repo => {
    this.fetchRepoIssues(repo);
    this.setState({ selectedRepo: repo });
  };

  fetchRepos = () => {
    http.get(`/user/repos?per_page=${GITHUB_REPO_PER_PAGE}`).then(response => {
      this.setState({ repos: response.data });
    });
  };

  fetchRepoIssues = repo => {
    const issuesUrl = repo['issues_url'].replace(/\{\/number\}$/, '');
    http.get(issuesUrl).then(response => {
      this.setState({ issues: response.data });
    });
  };

  renderApiKeyInput = () => {
    return (
      <div className="row">
        <div className="col-6 mx-auto">
          <ApiKeyInput onSubmit={this.handleApiKeySubmit} />
        </div>
      </div>
    );
  };

  renderRepoList = () => {
    const { repos, issues, selectedRepo } = this.state;
    return (
      <RepoList
        repos={repos}
        issues={issues}
        selectedRepo={selectedRepo}
        onRepoSelect={this.handleRepoSelect}
      />
    );
  };

  render() {
    const { apiKey } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Github Issues</h1>
        </header>
        <div className="container">
          {apiKey ? this.renderRepoList() : this.renderApiKeyInput()}
        </div>
      </div>
    );
  }
}

export default App;
