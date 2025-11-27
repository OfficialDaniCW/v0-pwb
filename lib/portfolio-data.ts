// Shared portfolio data used by Our Work page and Scrolling Transformations component
export interface PortfolioProject {
  id: number
  title: string
  service: string
  serviceLink: string
  location: string
  description: string
  image: string
  beforeImage: string
  afterImage: string
  link: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Commercial Patio Clean",
    service: "Commercial",
    serviceLink: "/services/pressure-washing",
    location: "Dorset",
    description:
      "Professional commercial cleaning for high-traffic public space. Complete transformation of train station patio area.",
    image: "/images/portfolio/commercial-patio-after.jpg",
    beforeImage: "/images/portfolio/commercial-patio-before.jpg",
    afterImage: "/images/portfolio/commercial-patio-after.jpg",
    link: "/portfolio/commercial-patio",
  },
  {
    id: 2,
    title: "Roof Clean & Biocide Treatment",
    service: "Roof Cleaning",
    serviceLink: "/services/roof-cleaning",
    location: "Dorset",
    description:
      "Professional roof cleaning with PowerUp biocide treatment. Complete removal of moss, lichen, and algae with long-lasting protection.",
    image: "/images/after1.jpeg",
    beforeImage: "/images/before1.jpeg",
    afterImage: "/images/after1.jpeg",
    link: "/portfolio/roof-clean-biocide-treatment",
  },
  {
    id: 3,
    title: "Patio & Wall Refresh",
    service: "Patio Cleaning",
    serviceLink: "/services/patio-decking",
    location: "Swanage",
    description:
      "Dramatic transformation revealing stunning natural stone colours. Customer didn't think it could look this good!",
    image: "/images/portfolio/swanage-patio-after.jpg",
    beforeImage: "/images/portfolio/swanage-patio-before.jpg",
    afterImage: "/images/portfolio/swanage-patio-after.jpg",
    link: "/portfolio/swanage-patio-wall-refresh",
  },
  {
    id: 4,
    title: "Garden Patio Restoration",
    service: "Patio Cleaning",
    serviceLink: "/services/patio-decking",
    location: "Dorset",
    description: "Complete restoration of garden paving stones, removing grime and algae.",
    image: "/images/portfolio/garden-patio-after.jpg",
    beforeImage: "/images/portfolio/garden-patio-before.jpg",
    afterImage: "/images/portfolio/garden-patio-after.jpg",
    link: "/portfolio/garden-patio",
  },
  {
    id: 5,
    title: "Patio Entrance Restoration",
    service: "Patio Cleaning",
    serviceLink: "/services/patio-decking",
    location: "Dorset",
    description: "Dangerous moss-covered entrance completely restored to safe, pristine condition.",
    image: "/images/portfolio/patio-cleaning-after.jpg",
    beforeImage: "/images/portfolio/patio-cleaning-before.jpg",
    afterImage: "/images/portfolio/patio-cleaning-after.jpg",
    link: "/portfolio/patio-cleaning",
  },
  {
    id: 6,
    title: "Render Clean",
    service: "Softwash",
    serviceLink: "/services/render-cleaning",
    location: "Dorset",
    description: "Specialist softwash render cleaning removing years of dirt and algae staining.",
    image: "/images/portfolio/render-clean-after.jpg",
    beforeImage: "/images/portfolio/render-clean-before.jpg",
    afterImage: "/images/portfolio/render-clean-after.jpg",
    link: "/portfolio/render-clean",
  },
]

export const featuredProject = {
  title: "The Vicarage",
  service: "Garden Patio Pressure Washing",
  serviceLink: "/services/patio-decking",
  location: "Swanage, Purbeck",
  date: "November 2024",
  description:
    "Complete garden patio transformation removing years of moss, algae, and organic growth from Purbeck stone paving. This project required a chemical-free approach to protect the surrounding landscape and wildlife. Our team carefully removed debris and used precision pressure washing techniques to ensure the area was safe for visitors whilst achieving stunning results.",
  details: [
    "Surface: Purbeck stone paving",
    "Size: 120m² garden patio",
    "Treatment: Chemical-free pressure washing with careful debris removal",
    "Duration: 1 day",
    "Result: Pristine restoration whilst protecting the surrounding landscape and wildlife",
  ],
  beforeImage: "/images/before4.jpg",
  afterImage: "/images/after.jpg",
}

export const additionalImages = [
  {
    url: "/images/vicarage-scaled.jpg",
    alt: "The Vicarage - Complete property view after cleaning",
    caption: "Beautiful Purbeck stone property restored to its former glory",
  },
]
