import React, { Component } from "react";
import Loading from "./Loading.js";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 1,
    category: "technology",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  firstUpCase=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.firstUpCase(this.props.category)} | NewsMonkey`
  }

  async UpdateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7b70e1001164e2cb7eaf452a09ccdd6&page=${this.state.page}&pageSize=${this.state.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  
  componentDidMount() {
    this.UpdateNews();
  }
  handlePrev = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.UpdateNews();
  };

  handleNext = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.UpdateNews();
  };


  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center">NewsMonkey - Top Headlines from {this.firstUpCase(this.props.category)}</h1>
          {this.state.loading && <Loading />}
          <div className="row my-4">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4 my-2">
                    <NewsItem
                      title={element.title.slice(0, 45)}
                      description={
                        element.description === null
                          ? ""
                          : element.description.slice(0, 88)
                      }
                      newsUrl={element.url}
                      imageUrl={
                        element.urlToImage === null
                          ? "https://image.cnbcfm.com/api/v1/image/106762532-1603756611792-gettyimages-1064197298-GB211043.jpeg?v=1640194526&w=1920&h=1080"
                          : element.urlToImage
                      }
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              onClick={this.handlePrev}
              className="btn btn-dark"
            >
              &#x2190; Previous
            </button>
            <button
              type="button"
              disabled={
                Math.ceil(this.state.totalResults / 20) < 1 + this.state.page
              }
              onClick={this.handleNext}
              className="btn btn-dark"
            >
              Next &#x2192;
            </button>
          </div>
        </div>
      </>
    );
  }
}
