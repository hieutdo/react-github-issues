import PropTypes from 'prop-types';
import React from 'react';

import IssueList from './IssueList';

function RepoList({
  repos = [],
  issues = [],
  selectedRepo = null,
  onRepoSelect = f => f,
}) {
  return (
    <div className="row">
      <div className="col-4">
        <div className="card">
          <div className="card-header">Your Repositories</div>
          <ul className="list-group list-group-flush">
            {repos.map(repo => (
              <li
                key={repo.id}
                className="list-group-item RepoList-item"
                onClick={() => onRepoSelect(repo)}
              >
                {repo.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-8">
        {selectedRepo ? (
          <IssueList issues={issues} />
        ) : (
          <div className="alert alert-secondary">No repositories selected!</div>
        )}
      </div>
    </div>
  );
}

RepoList.propTypes = {
  repos: PropTypes.array,
  issues: PropTypes.array,
  selectedRepo: PropTypes.object,
  onRepoSelect: PropTypes.func,
};

export default RepoList;
