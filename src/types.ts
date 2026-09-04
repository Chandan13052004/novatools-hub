export type Pricing = '100% Free' | 'Freemium' | 'Free Trial Available';

export type CategoryId =
  | 'all'
  | 'writing'
  | 'image-gen'
  | 'video'
  | 'productivity'
  | 'marketing'
  | 'developer';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  logoText: string;
  logoColor: string;
  description: string;
  category: Exclude<CategoryId, 'all'>;
  pricing: Pricing;
  url: string;
  deal?: string;
  approved: boolean;
}

export interface ToolSubmission {
  id: string;
  name: string;
  email: string;
  url: string;
  category: string;
  pitch: string;
  createdAt: string;
}
