import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'NewjoineeWebpartWebPartStrings';
import NewjoineeWebpart from './components/NewjoineeWebpart';
import { INewjoineeWebpartProps } from './components/INewjoineeWebpartProps';

export interface INewjoineeWebpartWebPartProps {
  description: string;
}

export default class NewjoineeWebpartWebPart extends BaseClientSideWebPart<INewjoineeWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INewjoineeWebpartProps > = React.createElement(
      NewjoineeWebpart,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl
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
