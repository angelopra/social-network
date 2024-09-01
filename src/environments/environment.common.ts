const envCommon = {
  // The routes ended in !AUTH! require a header with the idToken. This marker gets removed in the interceptor
  apiRoutes: {
    chat: {
      getMessages: '/chat/{otherUserId}!AUTH!',
    },
    follow: {
      request: '/follow/{followedId}!AUTH!',
      stopFollowing: '/follow/{followedId}!AUTH!',
      accept: '/follow/{followerId}/accept!AUTH!',
      deny: '/follow/{followerId}/deny!AUTH!',
    },
    group: {
      getById: '/group/{groupId}',
      getPosts: '/group/{groupId}/posts',
      create: '/group',
    },
    post: {
      create: '/post!AUTH!',
    },
    tag: {
      getAll: '/tag',
    },
    user: {
      search: '/user',
      getById: '/user/{userId}',
      posts: '/user/{userId}/posts',
      current: '/user/current!AUTH!',
      feed: '/user/current/feed!AUTH!',
    },
  },
  debounceTimeMs: 500,
  searchLimit: 10,
};

export default envCommon;
