export const HOMEPAGE_QUERY = `
{
  homepage {
    heroTitle
    heroSubtitle
    heroVideo {
      url
    }
    portfolioVideos {
      url
    }
    aboutHeadline
    aboutSubheadline
    aboutImagesLeft {
      url
    }
    aboutImagesRight {
      url
    }
  }
  allTeamMembers {
    name
    role
    bio
    photo {
      url
    }
  }
}
`;
