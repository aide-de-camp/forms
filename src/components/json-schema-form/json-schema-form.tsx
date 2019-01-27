import { Component, Prop } from '@stencil/core';
import { JSONSchema7 } from 'json-schema';

@Component({
  tag: 'adc-forms-json-schema',
  shadow: false,
})
export class JsonSchemaForm {
  /**
   * The JSON Schema to build the form and apply validation.
   */
  @Prop() schema: JSONSchema7;

  /**
   * A CSS class (or several of them) to apply to the form.
   */
  @Prop() cssClass: string;

  /**
   * The form action to be performed on submit. The method is always POST.
   */
  @Prop() action: string;

  /**
   * Label for the "submit" button.
   * Defaults to "Submit"
   */
  @Prop() submit: string = 'Submit';

  /**
   * Label for the "reset" button.
   * If none is present, the button will not be shown.
   */
  @Prop() reset: string;

  private typeMap = new Map([
    ['string', 'text'],
    ['number', 'number'],
    ['integer', 'number'],
  ]);

  private get schemaProperties() {
    return Object.entries(this.schema.properties).map(([k, v]) => {
      const name = k;
      const details = v as JSONSchema7;
      return {
        ...details,
        name,
        type:
          details.format === 'email'
            ? details.format
            : this.typeMap.get(details.type as string),
        required: this.schema.required.includes(name),
      };
    });
  }

  render() {
    return (
      <form class={this.cssClass} action={this.action} method="post">
        {this.schemaProperties.map(field => {
          return (
            <div class="form-group">
              <label htmlFor={field.name}>
                {field.description || field.name}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                min={field.minimum}
                max={field.maximum}
                pattern={field.pattern}
              />
            </div>
          );
        })}
        <div class="buttons">
          <button type="submit">{this.submit}</button>
          {this.reset && <button type="reset">{this.reset}</button>}
        </div>
      </form>
    );
  }
}
