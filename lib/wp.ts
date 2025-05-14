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
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query);
    const homepage = data.page.acf;

    const portfolioVideos = (homepage.portfolioVideos ?? "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const reelsVideos = (homepage.reelsVideos ?? "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    return {
      heroVideoUrl: homepage.heroVideoUrl,
      portfolioVideos,
      reelsVideos
    };
  } catch (error) {
    console.error("❌ Błąd pobierania danych z WordPressa:", error);
    return null;
  }
}
