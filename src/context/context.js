import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  console.log("context rendered");

  const searchGithubUser = async (user) => {
    console.log("searchGithubUsers called");
    toggleError();
    setIsLoading(true);
    console.log("searchGithubUsers called and api about to call");

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err.message)
    );
    console.log("searchGithubUsers called and api also called");
    if (response) {
      setGithubUser(response.data);
      console.log("Got response");
    } else {
      toggleError(true, "There is no user with that username");
    }

    console.log("searchGithubUsers ended");
  };

  //destructuring the response and getting only data by writing {data}
  // furthere destructuring the data object

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        console.log(data);
        //in data we have rate property which we destructured and then destructured the rate ti get value of remaininig property.
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => err.message);
  };

  //if we are not passing show and msg value then the deffault value is false and "" **
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
