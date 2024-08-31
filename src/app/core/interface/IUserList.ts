export interface IUserList {
  id: number;
  name: string;
  father_name: string;
  grandfather_name: string;
  family_branch_name: string;
  tribe: string;
  image: string;
  gender: 'string';
  date_of_birth: string;
  country_id: number;
  phone: string;
  email: string;
  type: string;
  active: number;
  is_premium: number;
  code: any;
  verified_at: any;
  created_at: string;
  updated_at: string;
  country: Country;
}

export interface Country {
  id: number;
  name_ar: string;
  name_en: string;
  iso2: string;
  phonecode: string;
  name: string;
}
