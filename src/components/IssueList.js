import PropTypes from 'prop-types';
import React from 'react';

function IssueList({ issues = [] }) {
  return (
    <div className="card">
      <div className="card-header">{issues.length} Issues</div>
      {issues.length > 0 ? (
        <ul className="list-group list-group-flush">
          {issues.map(issue => (
            <li key={issue.id} className="list-group-item IssueList-item">
              {issue.title}
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-body">
          You have no issues in this repository!{' '}
          <span role="img" aria-label="yay">
            🎉
          </span>
        </div>
      )}
    </div>
  );
}

IssueList.propTypes = {
  issues: PropTypes.array,
};

export default IssueList;
