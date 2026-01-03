export const MY_CREATIONS = `
  query MyCreations($limit: Int!, $offset: Int!, $locale: LocaleEnum!, $currency: CurrencyEnum!) {
    myself {
      creationsBatch(limit: $limit, offset: $offset) {
        total
        results {
          name(locale: $locale)
          url(locale: $locale)
          illustrationImageUrl
          downloadsCount
          viewsCount
          totalSalesAmount(currency: $currency) { cents }
          blueprints {
            fileUrl
            imageUrl
          }
        }
      }
    }
  }
`;

export const CREATION_BY_SLUG = `
  query CreationBySlug($slug: String!, $locale: LocaleEnum!, $currency: CurrencyEnum!) {
    creation(slug: $slug) {
      name(locale: $locale)
      shortUrl
      illustrationImageUrl
      license { name(locale: $locale) }
      category { name(locale: $locale) }
      publishedAt
      viewsCount
      likesCount
      downloadsCount
      tags(locale: $locale)
      price(currency: $currency) { cents }
      creator { nick shortUrl }
    }
  }
`;

export const USER_HEADER = `
  query UserHeader($nick: String!) {
    user(nick: $nick) {
      shortUrl
      bio
      imageUrl
      creationsCount
    }
  }
`;
