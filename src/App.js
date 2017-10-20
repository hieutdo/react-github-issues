import './App.css';

import axios from 'axios';
import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import ApiKeyInput from './components/ApiKeyInput';
import RepoList from './components/RepoList';
import logo from './logo.svg';

const GITHUB_REPO_PER_PAGE = 100;

const http = axios.create({
  baseURL: 'https://api.github.com',
});

const sortIssues = (oldIndex, newIndex) => state => {
  const issues = arrayMove(state.issues, oldIndex, newIndex);
  const issueIds = issues.map(i => i.id);
  localStorage.setItem(`repo-${state.selectedRepo.id}`, issueIds);
  return { issues };
};

const reorderIssues = issues => state => {
  if (state.selectedRepo) {
    const repoId = `repo-${state.selectedRepo.id}`;
    const lsIssueIds = localStorage.getItem(repoId);
    if (lsIssueIds) {
      const issueMap = issues.reduce((map, issue) => {
        map[issue.id] = issue;
        return map;
      }, {});
      const issueIds = lsIssueIds.split(',');
      return { issues: issueIds.map(id => issueMap[id]) };
    }
  }
  return { issues };
};

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

  handleIssueSorting = ({ oldIndex, newIndex }) => {
    this.setState(sortIssues(oldIndex, newIndex));
  };

  fetchRepos = () => {
    http
      .get(`/user/repos?per_page=${GITHUB_REPO_PER_PAGE}`)
      .then(({ data: repos }) => {
        this.setState({ repos });
      });
  };

  fetchRepoIssues = repo => {
    const issuesUrl = repo['issues_url'].replace(/\{\/number\}$/, '');
    http.get(issuesUrl).then(({ data: issues }) => {
      this.setState(reorderIssues(issues));
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
        onIssueSortEnd={this.handleIssueSorting}
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
