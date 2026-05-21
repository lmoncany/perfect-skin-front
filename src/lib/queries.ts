// WPGraphQL queries. Uses `contentNodes` instead of `posts` to bypass
// the hosting WAF which blocks the word "posts" in POST request bodies.
//
// Plugins required on WordPress:
//   - WPGraphQL (core)
//   - WPGraphQL for Rank Math SEO (exposes `seo` field)

export const POST_FIELDS = /* GraphQL */ `
  fragment PostFields on Post {
    id
    databaseId
    slug
    title
    excerpt
    content
    date
    modified
    author {
      node {
        name
        slug
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        slug
        name
      }
    }
    tags {
      nodes {
        slug
        name
      }
    }
    seo {
      title
      description
      canonicalUrl
      robots
      openGraph {
        title
        description
        image {
          url
        }
        type
      }
      jsonLd {
        raw
      }
    }
  }
`;

// Fetch all published articles via contentNodes (WAF-safe).
export const GET_ALL_POSTS = /* GraphQL */ `
  ${POST_FIELDS}
  query GetAllContentNodes($first: Int = 100, $after: String) {
    contentNodes(
      first: $first
      after: $after
      where: { contentTypes: POST, status: PUBLISH }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on Post {
          ...PostFields
        }
      }
    }
  }
`;

// Fetch a single article by slug via contentNode.
export const GET_POST_BY_SLUG = /* GraphQL */ `
  ${POST_FIELDS}
  query GetContentNodeBySlug($slug: ID!) {
    contentNode(id: $slug, idType: URI) {
      ... on Post {
        ...PostFields
      }
    }
  }
`;

// Fetch articles in a category via category → contentNodes.
export const GET_POSTS_BY_CATEGORY = /* GraphQL */ `
  ${POST_FIELDS}
  query GetCategoryContent(
    $categorySlug: ID!
    $first: Int = 100
    $after: String
  ) {
    category(id: $categorySlug, idType: SLUG) {
      contentNodes(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Post {
            ...PostFields
          }
        }
      }
    }
  }
`;

// Fetch articles by tag via tag → contentNodes.
export const GET_POSTS_BY_TAG = /* GraphQL */ `
  ${POST_FIELDS}
  query GetTagContent($tagSlug: ID!, $first: Int = 100, $after: String) {
    tag(id: $tagSlug, idType: SLUG) {
      contentNodes(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Post {
            ...PostFields
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = /* GraphQL */ `
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        slug
        name
        description
        count
      }
    }
  }
`;

export const GET_TAGS = /* GraphQL */ `
  query GetTags {
    tags(first: 200, where: { hideEmpty: true }) {
      nodes {
        slug
        name
        count
      }
    }
  }
`;

// WordPress Pages (about, contact, legal, etc.)
export const PAGE_FIELDS = /* GraphQL */ `
  fragment PageFields on Page {
    id
    databaseId
    slug
    title
    content
    modified
    seo {
      title
      description
      canonicalUrl
      robots
      openGraph {
        title
        description
        image { url }
        type
      }
      jsonLd { raw }
    }
  }
`;

export const GET_ALL_PAGES = /* GraphQL */ `
  ${PAGE_FIELDS}
  query GetAllPages {
    contentNodes(first: 100, where: { contentTypes: PAGE, status: PUBLISH }) {
      nodes {
        ... on Page {
          ...PageFields
        }
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG = /* GraphQL */ `
  ${PAGE_FIELDS}
  query GetPageBySlug($slug: ID!) {
    contentNode(id: $slug, idType: URI) {
      ... on Page {
        ...PageFields
      }
    }
  }
`;
