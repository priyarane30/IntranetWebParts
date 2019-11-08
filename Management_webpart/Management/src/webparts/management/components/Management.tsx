import * as React from 'react';
import styles from './Management.module.scss';
import { IManagementProps } from './IManagementProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';


// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    width: 300
  }
};
const stackItemStyles: IStackItemStyles = {
  root: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: 5
  }
};  

// Tokens definition
const containerStackTokens: IStackTokens = { childrenGap: 5 };
const verticalGapStackTokens: IStackTokens = {
  childrenGap: 10,

};
const itemAlignmentsStackTokens: IStackTokens = {
  childrenGap: 5,

};


export default class Management extends React.Component<IManagementProps, {}> {
  public render(): React.ReactElement<IManagementProps> {
    return (
      <div className={ styles.management }>
        <div className={styles.containerborder }>
          <div className="ms-Grid"> 
               {/* <div className={styles.gridback}>             */}
                    <div className ="ms-Grid-row"> 
                        <div className="ms-Grid-col ms-sm6" >
                              <div className={styles.mgnttitle}>Management Speak
                              </div>
                        </div>
                        <div className="ms-Grid-col ms-sm4" ></div>
                        <div className="ms-Grid-col ms-sm2" >
                          <div className={styles.imgclass}>
                            {/* <img src={require('./msg.jpg')}alt="test"/> */}
                            <img className={styles.imgphoto} src={require('./Prashant.jpg')}alt="test" /> </div>
                        </div>
                    </div> 
          </div>
          <div className="ms-Grid">
              <div className ="ms-Grid-row"> 
                <div className="ms-Grid-col ms-sm12" >
                <img className={styles.exec} src={require('./images1.png')}alt="test"/>
                    <div className={styles.para}>Dear Synovergians,<br/> 
                              Synoverge turns 8 today! Every bit of where we stand today goes to the fabulous team of Synoverge. As many of you may be aware, we started with a small office (smaller than our  5th floor conference room to put it in perspective) on 1st of April, 2010.     
                </div>
                </div> 
              </div>
          </div>

          <div className="ms-Grid">
              <div className ="ms-Grid-row"> 
                <div className="ms-Grid-col ms-sm8" >
                    <p className={styles.ceonameclass}>Prashant Halari | CEO</p>
                </div>
                <div className="ms-Grid-col ms-sm4" >
                <img className={styles.exec} src={require('./images2.png')}alt="test"/>
                </div>
              </div>                
          </div>
          



        </div>
      </div>   
           
     
    );
  }
}


