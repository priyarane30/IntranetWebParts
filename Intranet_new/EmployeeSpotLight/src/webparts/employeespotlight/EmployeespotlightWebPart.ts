import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EmployeespotlightWebPartStrings';
import Employeespotlight from './components/Employeespotlight';
import { IEmployeespotlightProps } from './components/IEmployeespotlightProps';

export interface IEmployeespotlightWebPartProps {
  description: string;
}

export default class EmployeespotlightWebPart extends BaseClientSideWebPart<IEmployeespotlightWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEmployeespotlightProps > = React.createElement(
      Employeespotlight,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
