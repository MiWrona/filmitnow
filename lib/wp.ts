import { request, gql } from 'graphql-request';

const endpoint = 'http://admin.filmitnow.pl/graphql';
const toHttp = (url: string) => url?.replace('https://admin.filmitnow.pl', 'http://admin.filmitnow.pl');

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
          socialText
          instaLink
          whastsappLink
          instaLogo {
  node {
    sourceUrl
  }
}
whatsappLogo {
  node {
    sourceUrl
  }
}
bottom_gallery_photo_i {
  node {
    sourceUrl
  }
}
bottom_gallery_photo_ii {
  node {
    sourceUrl
  }
}
bottom_gallery_photo_iii {
  node {
    sourceUrl
  }
}
bottom_gallery_photo_iiii {
  node {
    sourceUrl
  }
}
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
      .map((url) => toHttp(url.trim()))
      .filter(Boolean);

    const reelsVideos = (homepage.reelsVideos ?? "")
      .split("\n")
      .map((url) => toHttp(url.trim()))
      .filter(Boolean);

    const aboutImagesLeft = (homepage.aboutImagesLeft ?? "")
      .split("\n")
      .map((url) => toHttp(url.trim()))
      .filter(Boolean);

    const aboutImagesRight = (homepage.aboutImagesRight ?? "")
      .split("\n")
      .map((url) => toHttp(url.trim()))
      .filter(Boolean);

    const bottomGallery = [
      homepage.bottom_gallery_photo_i?.sourceUrl,
      homepage.bottom_gallery_photo_ii?.sourceUrl,
      homepage.bottom_gallery_photo_iiI?.sourceUrl,
      homepage.bottom_gallery_photo_iiii?.sourceUrl,
    ]
      .map(toHttp)
      .filter(Boolean);

    return {
      heroVideoUrl: toHttp(homepage.heroVideoUrl),
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
      formPhone: homepage.formPhone,
      followText: homepage.socialText,
      instaLink: homepage.instaLink,
      whatsappLink: homepage.whastsappLink,
      instaLogo: toHttp(homepage.instaLogo?.node?.sourceUrl),
      whatsappLogo: toHttp(homepage.whatsappLogo?.node?.sourceUrl),
      bottomGallery: [
        homepage.bottom_gallery_photo_i?.node?.sourceUrl,
        homepage.bottom_gallery_photo_ii?.node?.sourceUrl,
        homepage.bottom_gallery_photo_iii?.node?.sourceUrl,
        homepage.bottom_gallery_photo_iiii?.node?.sourceUrl,
      ].map(toHttp).filter(Boolean)
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
