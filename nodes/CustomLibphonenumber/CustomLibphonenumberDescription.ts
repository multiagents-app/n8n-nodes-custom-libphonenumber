import { INodeTypeDescription } from 'n8n-workflow';

export const CustomLibphonenumberDescription: INodeTypeDescription = {
  displayName: 'LibPhoneNumber',
  name: 'LibPhoneNumber',
  group: ['transform'],
  version: 1,
  description: 'Validate and format phone numbers using libphonenumber-js',
  defaults: {
    name: 'LibPhoneNumber',
  },
  inputs: ['main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Phone Number',
      name: 'phoneNumber',
      type: 'string',
      default: '',
      placeholder: '+55 31 91111-1111',
      required: true,
    },
    {
      displayName: 'Country Code Default',
      name: 'countryCodeDefault',
      type: 'string',
      default: '',
      placeholder: 'BR',
      required: true,
    }
  ],
};
