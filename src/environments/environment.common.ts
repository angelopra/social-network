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
      getById: '/group/{groupId}!AUTH!',
      getPosts: '/group/{groupId}/posts!AUTH!',
      create: '/group!AUTH!',
    },
    post: {
      create: '/post!AUTH!',
      delete: '/post/{postId}!AUTH!',
    },
    tag: {
      getAll: '/tag',
    },
    user: {
      search: '/user',
      getById: '/user/{userId}',
      posts: '/user/{userId}/posts',
      current: {
        get: '/user/current!AUTH!',
        updateAbout: '/user/current/about!AUTH!',
        updateTags: '/user/current/tags!AUTH!',
      },
      feed: '/user/current/feed!AUTH!',
    },
  },
  debounceTimeMs: 500,
  searchLimit: 10,
};

export default envCommon;
