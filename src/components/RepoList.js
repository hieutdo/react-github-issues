import PropTypes from 'prop-types';
import React from 'react';

function RepoList({ repos = [], onSelect = f => f }) {
  return (
    <div className="card">
      <div className="card-header">Your Repositories</div>
      <ul className="list-group list-group-flush">
        {repos.map(repo => (
          <li
            key={repo.id}
            className="list-group-item RepoList-item"
            onClick={() => onSelect(repo)}
          >
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

RepoList.propTypes = {
  repos: PropTypes.array,
  onSelect: PropTypes.func,
};

export default RepoList;
