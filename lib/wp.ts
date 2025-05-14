import { request, gql } from 'graphql-request';

const endpoint = 'http://admin.filmitnow.pl/graphql';

export async function getHomepage() {
  const query = gql`
    query {
      page(id: "6", idType: DATABASE_ID) {
        acf {
          heroVideoUrl
          portfolioVideos
          reelsVideos
          aboutHeadline
          aboutSubheadline
          aboutText
          aboutImagesLeft
          aboutImagesRight
          formLeftText
          formMainText
          formEmail
          formPhone
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query);
    const homepage = data.page?.acf;

    if (!homepage) {
      console.error("⚠️ Nie znaleziono danych ACF.");
      return null;
    }

    const portfolioVideos = (homepage.portfolioVideos ?? "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const reelsVideos = (homepage.reelsVideos ?? "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const aboutImagesLeft = (homepage.aboutImagesLeft ?? "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const aboutImagesRight = (homepage.aboutImagesRight ?? "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    return {
      heroVideoUrl: homepage.heroVideoUrl,
      portfolioVideos,
      reelsVideos,
      aboutHeadline: homepage.aboutHeadline,
      aboutSubheadline: homepage.aboutSubheadline,
      aboutText: homepage.aboutText,
      aboutImagesLeft,
      aboutImagesRight,
      formLeftText: homepage.formLeftText,
      formMainText: homepage.formMainText,
      formEmail: homepage.formEmail,
      formPhone: homepage.formPhone
    };
  } catch (error) {
    console.error("❌ Błąd pobierania danych z WordPressa:", error);
    return null;
  }
}

export async function getTeamMembers() {
  const query = gql`
    query {
      teamMembers {
        nodes {
          title
          member {
            role
            bio
            photo {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query);
    return data.teamMembers.nodes.map((entry: any) => ({
      name: entry.title,
      role: entry.member?.role ?? '',
      bio: entry.member?.bio ?? '',
      photo: entry.member?.photo?.node?.sourceUrl ?? ''
    }));
  } catch (error) {
    console.error("❌ Błąd pobierania teamMembers:", error);
    return [];
  }
}
