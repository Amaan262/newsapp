import React, { useState, useEffect } from "react";
import Loading from "./Loading.js";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const firstUpCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  
  const UpdateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${firstUpCase(props.category)} | NewsMonkey`;
    UpdateNews();
  }, []);
  // Not in use

  // const handlePrev = async () => {
  //   setPage(page - 1);
  //   UpdateNews();
  // };

  // const handleNext = async () => {
  //   setPage(page + 1);
  //   UpdateNews();
  // };
  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "90px" }}>
        NewsMonkey - Top Headlines from {firstUpCase(props.category)}
      </h1>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row my-4">
            {articles.map((element) => {
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
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pagesize: 1,
  category: "technology",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
