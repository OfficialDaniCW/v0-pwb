// Service breadcrumb schema helper
export function createServiceBreadcrumbs(serviceName: string, serviceSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://powerwashbros.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://powerwashbros.co.uk/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": serviceName,
        "item": `https://powerwashbros.co.uk/services/${serviceSlug}`
      }
    ]
  }
}

// Blog article breadcrumb schema helper
export function createBlogBreadcrumbs(articleTitle: string, articleSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://powerwashbros.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://powerwashbros.co.uk/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": articleTitle,
        "item": `https://powerwashbros.co.uk/blog/${articleSlug}`
      }
    ]
  }
}
