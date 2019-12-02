import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TarangWebPartStrings';
import Tarang from './components/Tarang';
import { ITarangProps } from './components/ITarangProps';

export interface ITarangWebPartProps {
  description: string;
}

export default class TarangWebPart extends BaseClientSideWebPart<ITarangWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITarangProps > = React.createElement(
      Tarang,
      {
        siteurl: this.context.pageContext.web.absoluteUrl
        //siteurl: "https://synoverge.sharepoint.com/"
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
                PropertyPaneTextField('siteurl', {
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
