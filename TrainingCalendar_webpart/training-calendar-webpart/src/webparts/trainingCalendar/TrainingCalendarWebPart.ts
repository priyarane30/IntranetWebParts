import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TrainingCalendarWebPartStrings';
import TrainingCalendar from './components/TrainingCalendar';
import { ITrainingCalendarProps } from './components/ITrainingCalendarProps';

export interface ITrainingCalendarWebPartProps {
  description: string;
}

export default class TrainingCalendarWebPart extends BaseClientSideWebPart<ITrainingCalendarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITrainingCalendarProps > = React.createElement(
      TrainingCalendar,
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
