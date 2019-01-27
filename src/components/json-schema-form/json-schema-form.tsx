import { Component, Prop } from '@stencil/core';
import { JSONSchema7 } from 'json-schema';

@Component({
  tag: 'adc-forms-json-schema',
  // styleUrl: 'my-component.css',
  shadow: false,
})
export class JsonSchemaForm {
  /**
   * The JSON Schema to build the form and apply validation
   */
  @Prop() schema: JSONSchema7;
  @Prop() cssClass: string;
  @Prop() submit: string;
  @Prop() action: string;

  private get buildFields() {
    // for (const [key, value] of Object.entries(this.schema.properties)) {
    //   console.log(key, value);
    // }
    console.log(Object.entries(this.schema.properties));
    return Object.entries(this.schema.properties);
  }

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }

  render() {
    return (
      <form class={this.cssClass} action={this.action} method="post">
        {this.buildFields.map(field => {
          const [fieldId, details] = field;
          if (details['type'] === 'string') details['type'] = 'text';
          return (
            <div class="form-group">
              <label htmlFor={fieldId}>{fieldId}</label>
              <input
                id={fieldId}
                name={fieldId}
                type={details['type']}
                minLength={details['minLength']}
                maxLength={details['maxLength']}
                min={details['minimum']}
                max={details['maximum']}
                pattern={details['pattern']}
                required={this.schema.required.includes(fieldId)}
              />
            </div>
          );
        })}
        <div class="button">
          <button type="submit">{this.submit}</button>
        </div>
      </form>
    );
  }
}
