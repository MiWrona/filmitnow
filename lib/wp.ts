import { request, gql } from 'graphql-request';

const endpoint = 'http://filmitnow.pl/graphql';


export async function getHomepage() {
  const query = gql`
    query {
      page(id: "6", idType: DATABASE_ID) {
        title
        acf {
         heroTitle
          heroSubtitle
          heroVideoUrl
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query);
    return data.page.acf;
  } catch (error) {
    console.error("❌ Błąd pobierania danych z WordPressa:", error);
    return null;
  }
}


