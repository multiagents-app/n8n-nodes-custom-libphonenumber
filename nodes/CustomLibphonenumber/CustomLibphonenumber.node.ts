import { IExecuteFunctions } from 'n8n-workflow';
import { INodeType, INodeTypeDescription, INodeExecutionData } from 'n8n-workflow';
import { CustomLibphonenumberDescription } from './CustomLibphonenumberDescription';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export class CustomLibphonenumber implements INodeType {
  description: INodeTypeDescription = CustomLibphonenumberDescription;

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const results = [];

    for (let i = 0; i < items.length; i++) {
      const phoneNumberInput = this.getNodeParameter('phoneNumber', i) as string;
      const countryCodeDefault = this.getNodeParameter('countryCodeDefault', i, {}) as object;
      const phoneNumber = parsePhoneNumberFromString(phoneNumberInput, countryCodeDefault);

      if (typeof phoneNumber === 'undefined' || !phoneNumber || !phoneNumber.isValid()) {
        results.push({ json: { valido: false, formatado: null }});
      }

      results.push({ json: {
        valido: true,
        internacional: !phoneNumber || phoneNumber.formatInternational(), // +1 202 555 0125
        nacional: !phoneNumber || phoneNumber.formatNational(),           // (202) 555-0125
        pais: !phoneNumber || phoneNumber.country,                        // "US"
      }});
    }

    return [results];
  }
}
