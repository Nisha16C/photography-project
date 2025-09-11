export const PHOTOGRAPHER_INFO = {
  name: "Himanshu Chaurasiya",
  phone: "+91 7400823680",
  email: "himanshuchaurasiya5811@gmail.com",
  address: "Dhawari, Lane No. 1, Satna, Madhya Pradesh",
  experience: "4+ years",
  specialties: ["Wedding Photography", "Pre-Wedding Shoots", "Event Photography"],
  instagram: "https://www.instagram.com/himanshu_photography_satna?igsh=MWhoem94b3VocWV0YQ==",
  youtube: "https://youtube.com/@himanshuchaurasiaphotography?si=iWoR5PuoQ_VpWU8v",
  whatsapp: "https://wa.me/917400823680"
};


// import local hero images
// Load home images via glob (avoids hard-coded file names / spacing issues)
// @ts-ignore - Vite import.meta.glob types may not be available in TS config
const homeModules = import.meta.glob('/src/assets/images/home/**/*.{jpg,jpeg,png,svg,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const HOME_IMAGES = Object.values(homeModules);

// Build portfolio categories automatically from assets folder (Vite)
// This collects all images under /src/assets/images/portfolio/<Category>/*
// and groups them by the subdirectory name.
// @ts-ignore - Vite import.meta.glob types may not be available in TS config
// use new query/import format to return URLs
const portfolioModules = import.meta.glob('/src/assets/images/portfolio/**/*.{jpg,jpeg,png,webp,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

// normalize folder name -> human readable (e.g., "Mehndi-Img" -> "Mehndi")
function beautifyFolderName(folder: string) {
  return folder
    .replace(/[-_]/g, ' ')
    .replace(/\b(img|img[s]?|images?)\b/gi, '') // drop common suffixes
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// store arrays of { src, alt } for each category
const PORTFOLIO_CATEGORIES_BUILT: Record<string, { src: string; alt?: string }[]> = {};

Object.entries(portfolioModules).forEach(([fullPath, url]) => {
  // Example path: /src/assets/images/portfolio/Weddings-Img/360_F_4722.jpg
  const m = fullPath.match(/\/portfolio\/([^\/]+)\/([^\/]+)$/);
  const folderRaw = m ? m[1] : 'Uncategorized';
  const folder = beautifyFolderName(folderRaw);
  if (!PORTFOLIO_CATEGORIES_BUILT[folder]) PORTFOLIO_CATEGORIES_BUILT[folder] = [];
  const fileName = decodeURIComponent(fullPath.split('/').pop() || '');
  PORTFOLIO_CATEGORIES_BUILT[folder].push({ src: url, alt: fileName });
});

// flatten all images for default "All" portfolio
const ALL_PORTFOLIO_IMAGES = Object.values(PORTFOLIO_CATEGORIES_BUILT).flat();

// Exported maps
export const PORTFOLIO_CATEGORIES: Record<string, { src: string; alt?: string }[]> = PORTFOLIO_CATEGORIES_BUILT;

export const LOCAL_IMAGES = {
  // use glob-sourced home images (keeps exact filenames / spacing safe)
  home: HOME_IMAGES,
  profile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
  portfolio: ALL_PORTFOLIO_IMAGES as { src: string; alt?: string }[],
  testimonials: [
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  ]
};
 
// Keep the old DUMMY_IMAGES for backward compatibility
export const DUMMY_IMAGES = LOCAL_IMAGES;
 
// Add a simple export for LOCAL_VIDEOS so imports expecting it won't break.
// If you later have local videos, replace the empty array with a glob similar to images.
export const LOCAL_VIDEOS: { src: string; alt?: string }[] = [];
