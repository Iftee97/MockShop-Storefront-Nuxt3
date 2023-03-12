export async function getFakeStoreProducts() {
  const response = await fetch('https://fakestoreapi.com/products')
  const data = await response.json()
  return data
}

export async function getFakeStoreCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories')
  const data = await response.json()
  return data
}

export async function getFakeStoreUsers() {
  const response = await fetch('https://fakestoreapi.com/users')
  const data = await response.json()
  return data
}

async function ShopifyData(query) {
  const URL = `https://new-store-458.myshopify.com/api/2022-10/graphql.json` // test store's shopify store domain

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": '646b8a7bec666c4c872a76bfbf10b720', // test store's storefront access token
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }

  try {
    const response = await fetch(URL, options)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Products not fetched")
  }
}

export async function getCollections() {
  const query = `{
    collections(first: 250) {
      edges {
        node {
          id
          handle
          title
          image {
            src
          }
          products(first: 250) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const allCollections = response.data.collections.edges ? response.data.collections.edges : []
  return allCollections
}

export async function getCollectionByHandle(handle) {
  const query = `{
    collection(handle: "${handle}") {
      id
      handle
      title
      image {
        src
        altText
      }
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              id
              url
            }
            images(first: 10) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const collection = response.data.collection ? response.data.collection : []
  return collection
}

export async function getProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          collections(first: 100) {
            nodes {
              id
              title
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            id
            url
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          options {
            name
            values
            id
          }
          variants(first: 3) {
            edges {
              node {
                id
                title
                availableForSale
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const allProducts = response.data.products.edges ? response.data.products.edges : []
  return allProducts
}

export async function getProductByHandle(handle) {
  const query = `{
    product(handle: "${handle}") {
      id
      title
      handle
      description
      tags
      collections(first: 100) {
        nodes {
          id
          title
        }
      }
      featuredImage {
        id
        url
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)
  const product = response.data.product ? response.data.product : []
  return product
}
