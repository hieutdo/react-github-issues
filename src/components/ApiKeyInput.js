import React from 'react';

function ApiKeyInput() {
  return (
    <div className="card">
      <div className="card-header">Github API Key</div>
      <div className="card-body">
        <div className="card-title">Please provide your Github API key:</div>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApiKeyInput;
