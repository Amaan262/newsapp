import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date ,source } = this.props;
    return (
      <div>
        <div className="card" style={{}}>
          <span  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',left: '84%!important'}}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} {new Date(date).toUTCString()}{" "}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
