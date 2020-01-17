import { Customer } from '../types/invest'

export interface CustomerFromAPI {
  accountType: string;
  companyName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  postCode?: string;
  country?: string;
  companyAddressRegistered?: {
    streetAddress: string;
    apartment: string;
    city: string;
    postCode: string;
    country: string;
  };
}

export default function prepareCustomerData(data: CustomerFromAPI): Customer | void {
  switch (data.accountType) {
    case 'individual':
      return {
        name: `${data.firstName} ${data.lastName}`,
        streetAddress: data.streetAddress || '',
        apartment: data.apartment || '',
        city: data.city || '',
        postCode: data.postCode || '',
        country: data.country || '',
      }

    case 'business': {
      if (!data.companyAddressRegistered) {
        return undefined
      }

      return {
        name: data.companyName || '',
        streetAddress: data.companyAddressRegistered.streetAddress || '',
        apartment: data.companyAddressRegistered.apartment || '',
        city: data.companyAddressRegistered.city || '',
        postCode: data.companyAddressRegistered.postCode || '',
        country: data.companyAddressRegistered.country || '',
      }
    }

    default:
      return undefined
  }
}
