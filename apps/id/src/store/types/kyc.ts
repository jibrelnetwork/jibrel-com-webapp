export enum KYCIndividualStatus {
  personal = 'personal',
  residency = 'residency',
  income = 'income',
}

export interface Document {
  id?: string;
  error?: string;
  fileName?: string;
  fileSize?: number;
  isLoading?: boolean;
}

export interface Documents {
  [fieldName: string]: Document | undefined;
}

export type UploadDocumentHandler = (document: {
  file: File | void;
  fieldName: string;
}) => Promise<string | void>

export interface PersonalValues {
  firstName: string;
  middleName?: string;
  lastName: string;
  alias?: string;
  birthDate: string;
  nationality: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportDocument: string;
}

export interface ResidencyValues {
  streetAddress: string;
  apartment?: string;
  city: string;
  postCode?: string;
  country: string;
  proofOfAddressDocument: string;
}

// copied from swagger spec
/* eslint-disable @typescript-eslint/camelcase */
export enum Occupation {
  other = 'other',

  accounting = 'accounting',
  admin_clerical_automotive = 'admin_clerical_automotive',
  banking = 'banking',
  biotech = 'biotech',
  broadcast_journalism = 'broadcast_journalism',
  business_development = 'business_development',
  construction = 'construction',
  consultant = 'consultant',
  customer_service = 'customer_service',
  design = 'design',
  distribution_shipping = 'distribution_shipping',
  education_teaching = 'education_teaching',
  engineering = 'engineering',
  entry_level_new_grad = 'entry_level_new_grad',
  executive = 'executive',
  facilities = 'facilities',
  finance = 'finance',
  franchise = 'franchise',
  general_business = 'general_business',
  general_labor = 'general_labor',
  government = 'government',
  grocery = 'grocery',
  health_care = 'health_care',
  hotel_hospitality = 'hotel_hospitality',
  human_resources = 'human_resources',
  information_technology = 'information_technology',
  installation_maint_repair = 'installation_maint_repair',
  insurance = 'insurance',
  inventory = 'inventory',
  legal = 'legal',
  legal_admin = 'legal_admin',
  management = 'management',
  manufacturing = 'manufacturing',
  marketing = 'marketing',
  media_journalism_newspaper = 'media_journalism_newspaper',
  nonprofit_social_services = 'nonprofit_social_services',
  nurse = 'nurse',
  pharmaceutical = 'pharmaceutical',
  professional_services = 'professional_services',
  purchasing_procurement = 'purchasing_procurement',
  qa_quality_control = 'qa_quality_control',
  real_estate = 'real_estate',
  research = 'research',
  restaurant_food_service = 'restaurant_food_service',
  retail = 'retail',
  sales = 'sales',
  science = 'science',
  skilled_labor_trades = 'skilled_labor_trades',
  strategy_planning = 'strategy_planning',
  supply_chain = 'supply_chain',
  telecommunications = 'telecommunications',
  training = 'training',
  transportation = 'transportation',
  warehouse = 'warehouse',
}

export enum IncomeSource {
  other = 'other',

  primary_occupation = 'primary_occupation',
  secondary_business_activities = 'secondary_business_activities',
  sale_assets = 'sale_assets',
  inheritance = 'inheritance',
}
/* eslint-enable @typescript-eslint/camelcase */

export interface IncomeValues {
  occupation: string;
  occupationOther?: string;
  incomeSource: string;
  incomeSourceOther?: string;
}

export interface KYCIndividualValues extends Partial<PersonalValues>, Partial<ResidencyValues>, Partial<IncomeValues> {}

export type KYCState = {
  documents: Documents;
}

export type KYCIndividualState = {
  status: KYCIndividualStatus;
  values: KYCIndividualValues;
}

export interface CompanyValues {
  companyName: string;
  tradingName: string;
  dateOfIncorporation: string;
  placeOfIncorporation: string;
  commercialRegister: string;
  shareholderRegister: string;
  articlesOfIncorporation: string;
}

export interface ContactValues {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  postCode?: string;
  country: string;
  proofOfAddressDocument: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportDocument: string;
}

export interface AddressValues {
  streetAddress: string;
  apartment?: string;
  city: string;
  postCode?: string;
  country: string;
}

export interface OfficeAddressValues {
  registered: AddressValues;
  haveCompanyAddressPrincipal: boolean;
  principal?: AddressValues;
}

export type BeneficiariesValues = ContactValues[]

export interface DirectorValues {
  fullName: string;
}

export type DirectorsValues = DirectorValues[]

export interface KYCInstitutionValues {
  company: CompanyValues;
  primaryContact: ContactValues;
  officeAddress: OfficeAddressValues;
  beneficiaries: BeneficiariesValues;
  directors: DirectorsValues;
}

export enum KYCStatus {
  pending = 'pending',
  verified = 'verified',
  unverified = 'unverified',
}
