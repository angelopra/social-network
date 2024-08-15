const envCommon = {
  apiRoutes: {
    follow: {
      request: '/follow/{followedId}',
      stopFollowing: '/follow/{followedId}',
      accept: '/follow/{followerId}/accept',
      deny: '/follow/{followerId}/deny',
    },
    group: {
      getById: '/group/{groupId}',
      getPosts: '/group/{groupId}/posts',
      create: '/group',
    },
    post: {
      create: '/post',
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
};

export default envCommon;
