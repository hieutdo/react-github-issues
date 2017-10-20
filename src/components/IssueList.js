import PropTypes from 'prop-types';
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ issue }) => {
  return (
    <tr>
      <td>{issue.number}</td>
      <td>{issue.title}</td>
      <td>{issue.state}</td>
      <td>{issue.updated_at}</td>
    </tr>
  );
});

const SortableList = SortableContainer(({ issues }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>State</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue, index) => (
          <SortableItem key={issue.id} issue={issue} index={index} />
        ))}
      </tbody>
    </table>
  );
});

function IssueList({ issues = [], onSortEnd = f => f }) {
  return (
    <div className="card">
      <div className="card-header">{issues.length} Issues</div>
      {issues.length > 0 ? (
        <SortableList issues={issues} onSortEnd={onSortEnd} />
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
  onSortEnd: PropTypes.func,
};

export default IssueList;
