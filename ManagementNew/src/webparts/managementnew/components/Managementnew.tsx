import * as React from 'react';
import styles from './Managementnew.module.scss';
import { IManagementnewProps } from './IManagementnewProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Managementnew extends React.Component<IManagementnewProps, {}> {
  public render(): React.ReactElement<IManagementnewProps> {
    return (
      <div className={ styles.managementnew }>
       <div className={styles.container}>
        <div className={styles.containerbody}>
          <span className={styles.title}>Management Speak</span>
          <div className={styles.headertitle}>Dear Synovergians,
          </div>
          <div className={styles.content}>Synoverge turns 8 today! 
          Every bit of where we stand today goes to the fabulous team of Synoverge.....      
          </div>
          <div className={styles.contentspacing}>Continue reading <span className={styles.arrow}>&#8594;</span>
          </div>

        </div>
       </div>
      </div>
    );
  }
}
