export type Video = {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
    statistics: {
      viewCount: string;
      likeCount: string;
    };
  };
  