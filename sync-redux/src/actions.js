import fetch from "cross-fetch";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

function receivePosts(subreddit, json) {
  // 重新封装请求得到的数据，作为action的工作内容
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now()
  };
}

function fetchPosts(subreddit) {
  // 返回重新封装的异步dispatch
  return (dispatch) => {
    // 先执行 `发起请求` 事件
    dispatch(requestPosts(subreddit));
    // 将请求事件的异步返回结果返回
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((json) => dispatch(receivePosts(subreddit, json)));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
