import * as React from 'react';
import styles from './Leavebalance.module.scss';
import { ILeavebalanceProps } from './ILeavebalanceProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Leavebalance extends React.Component<ILeavebalanceProps, {}> {
  public render(): React.ReactElement<ILeavebalanceProps> {
    return (
      <div className={ styles.leavebalance }>
        <div className={ styles.container }>
        
        </div>
      </div>
    );
  }
}
