import { DisplayMode } from '@microsoft/sp-client-preview';

export interface IConfigProps {
  displayMode: DisplayMode;
  configure: () => void;
}