import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AnnouncementWebPartStrings';
import Announcement from './components/Announcement';
import { IAnnouncementProps } from './components/IAnnouncementProps';

export interface IAnnouncementWebPartProps {
  listName: string;
}

export default class AnnouncementWebPart extends BaseClientSideWebPart<IAnnouncementWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnnouncementProps > = React.createElement(
      Announcement,
      {
        siteurl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName
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
                PropertyPaneTextField('listName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
