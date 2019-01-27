# adc-forms-json-schema

This standalone Web Component builds a form programmatically according to a JSON Schema definition passed as property / attribute. The JSON schema is also used for client-side form validation.

The label for each input will be populated according to the `description` field of each of the schema properties.

## Usage

### Vanilla JS

```html
<adc-forms-json-schema
  css-class="my-form"
  submit="Go!"
  reset="Forget it..."
  action="/my-handling-form-page"
></adc-forms-json-schema>

<script>
  const jsonSchemaBuilder = document.querySelector('adc-forms-json-schema');
  jsonSchemaBuilder.schema = {
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: {
        type: 'string',
        description: 'Full name',
        minLength: 5,
        maxLength: 12,
      },
      age: {
        type: 'number',
        description: 'Age',
        minimum: 18,
        maximum: 99,
      },
      email: { type: 'string', format: 'email' },
      phone: {
        type: 'string',
        pattern: '^[0-9()\\-\\.\\s]+$',
        description: 'Phone number',
      },
    },
  };
</script>
```

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute   | Description                                                                        | Type                         | Default     |
| ---------- | ----------- | ---------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `action`   | `action`    | The form action to be performed on submit. The method is always POST.              | `string`                     | `undefined` |
| `cssClass` | `css-class` | A CSS class (or several of them) to apply to the form.                             | `string`                     | `undefined` |
| `reset`    | `reset`     | Label for the "reset" button. If none is present, the button will not be shown.    | `string`                     | `undefined` |
| `schema`   | --          | The JSON Schema to build the form and apply validation. Accepted versions 7 and 6. | `JSONSchema6 \| JSONSchema7` | `undefined` |
| `submit`   | `submit`    | Label for the "submit" button. Defaults to "Submit"                                | `string`                     | `'Submit'`  |

---

_Built with [StencilJS](https://stenciljs.com/)_
