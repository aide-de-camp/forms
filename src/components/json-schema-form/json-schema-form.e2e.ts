import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('The JSON Schema Form Builder', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('should render the component properly', async () => {
    await page.setContent('<adc-forms-json-schema></adc-forms-json-schema>');
    const el = await page.find('adc-forms-json-schema');
    expect(el).not.toBeNull();
  });

  xit('should build a basic form', async () => {
    await page.setContent('<adc-forms-json-schema></adc-forms-json-schema>');
    await page.$eval('adc-forms-json-schema', (el: any) => {
      // within the browser's context
      // let's set new property values on the component
      el.schema = {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'First name',
          },
        },
      };
      el.cssClass = 'test-form';
    });

    // we just made a change and now the async queue need to process it
    // make sure the queue does its work before we continue
    await page.waitForChanges();

    // const component = await page.find('adc-forms-json-schema');
    const form = await page.find('form');
    console.log(form);
    expect(form).not.toBeNull();
  });
});
