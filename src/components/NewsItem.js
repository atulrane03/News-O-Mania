import React, { useState } from "react";
import "./NewsItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

const NewsItem = (props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  const { id, title, description, imageUrl, newsUrl, author, date, source } =
    props;

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
      setDisliked(false);
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
      }
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(dislikeCount + 1);
      setDisliked(true);
      setLiked(false);
      if (liked) {
        setLikeCount(likeCount - 1);
      }
    } else {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
    }
  };

  const handleAnchorClick = () => {
    // Your code for handling anchor click
    // Note: Since you're not using event parameter, you can omit it
    fetch("http://localhost:5000/watch/" + id, { credentials: "include" })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShare = () => {
    setShowDropdown(!showDropdown);
  };

  const handleShareLink = (platform) => {
    const shareUrl = newsUrl; // URL to share
    const titleText = "Check out this news article!"; // Title text for sharing

    let shareLink = "";

    if (platform === "twitter") {
      shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(titleText)}`;
    } else if (platform === "facebook") {
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}&quote=${encodeURIComponent(titleText)}`;
    } else if (platform === "linkedin") {
      shareLink = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        shareUrl
      )}&title=${encodeURIComponent(titleText)}`;
    }

    if (shareLink) {
      window.open(shareLink, "_blank");
    }
  };

  return (
    <div className="my-3">
      <div className="card">
        <div className="source-badge">
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <div className="image-container">
          <img
            src={
              imageUrl ||
              "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
            }
            className="card-img-top"
            alt="News"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          {/* <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toDateString()}
            </small>
          </p> */}
          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on {new Date(date).toDateString()}
            </small>
          </p>
          <div className="footer">
            <div className="arrows">
              <div
                className={`like ${liked ? "active" : ""}`}
                onClick={handleLike}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{likeCount}</span>
              </div>
              <div
                className={`dislike ${disliked ? "active" : ""}`}
                onClick={handleDislike}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                <span>{dislikeCount}</span>
              </div>
              <div className="share" onClick={handleShare}>
                <FontAwesomeIcon icon={faShareAlt} />
                {showDropdown && (
                  <div className="share-dropdown">
                    <ul>
                      <li onClick={() => handleShareLink("twitter")}>
                        Twitter
                      </li>
                      <li onClick={() => handleShareLink("facebook")}>
                        Facebook
                      </li>
                      <li onClick={() => handleShareLink("linkedin")}>
                        LinkedIn
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
              onClick={handleAnchorClick}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
