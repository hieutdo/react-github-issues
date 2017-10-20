import PropTypes from 'prop-types';
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ issue }) => {
  return <li className="list-group-item IssueList-item">{issue.title}</li>;
});

const SortableList = SortableContainer(({ issues }) => {
  return (
    <ul className="list-group list-group-flush">
      {issues.map((issue, index) => (
        <SortableItem key={issue.id} issue={issue} index={index} />
      ))}
    </ul>
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
