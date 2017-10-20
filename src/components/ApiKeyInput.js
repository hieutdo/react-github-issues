import PropTypes from 'prop-types';
import React from 'react';

function ApiKeyInput({ onSubmit = f => f }) {
  let input;

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(input.value);
  };

  return (
    <div className="card">
      <div className="card-header">Github API Key</div>
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Github API key"
              required
              ref={i => (input = i)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

ApiKeyInput.propTypes = {
  onSubmit: PropTypes.func,
};

export default ApiKeyInput;
