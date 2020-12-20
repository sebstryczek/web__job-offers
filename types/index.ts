export type Skill = {
  level: number;
  name: string;
};

export type Offer = {
  company_logo_url: string;
  company_name: string;
  company_size: string;
  company_url: string;
  country_code: string;
  employment_type: string;
  experience_level: string;
  id: string;
  latitude: string;
  longitude: string;
  marker_icon: string;
  published_at: string;
  remote: boolean;
  salary_currency: string;
  salary_from: string;
  salary_to: string;
  skills: Skill[],
  street: string;
  title: string;
};
