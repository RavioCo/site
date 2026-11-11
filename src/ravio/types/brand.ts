/**
 * Brand domain types for RAVIO by Ravio & Co.
 */

export interface BrandFoundationData {
  name: string;
  parentCompany: string;
  domain: string;
  tagline: string;
  establishedPhilosophy: string;
  mission: string;
  aestheticHeritage: {
    referenceHouses: string[];
    guidingTenets: string[];
    antiPatterns: string[];
  };
  marketStrategy: {
    primaryLaunchMarket: string;
    currency: string;
    currencySymbol: string;
    localCommerceTouchpoints: string[];
    internationalPositioning: string;
  };
}

export interface BrandChapter {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  narrative: string[];
  materialFocus?: string;
}
