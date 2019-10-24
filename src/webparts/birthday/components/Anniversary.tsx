import * as React from 'react';
import styles from './Birthday.module.scss';
import { IBirthdayProps } from './IBirthdayProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
  
export default class Anniversary extends React.Component<IBirthdayProps, {}> {

  public constructor(props: IBirthdayProps,{}){ 
    super(props); 

  } 
  
  public render(): React.ReactElement<IBirthdayProps> {
    const stackTokens: IStackTokens = { childrenGap: 20 };
    return (
    <Stack tokens={stackTokens} styles={{ root: { maxWidth: 700 } }}>
      <div className={ styles.birthday }>
          <div>          
           {/* Anniversary */}
           <div className="ms-Grid" dir="ltr">
             <div className="ms-Grid-row">
               <div className="ms-Grid-col ms-sm4 ms-md2">
                 <img  src={require('./images.jpg')}
                       alt="Happy BirthDay"
                       height={200}
                         />
               </div>
               <div className="ms-Grid-col ms-sm8 ms-md10">
               <h1>Anniversary</h1>
                 <div className="ms-Grid" dir="ltr">
                   <div className="ms-Grid-row">
                     <div className="ms-Grid-col ms-sm4 ms-md2" style={{width:"13%",paddingTop:"10px"}}>
                       <img className={styles.circularImage}
                           src={require('./BirthDaycircle1.jpg')}
                           alt="Happy BirthDay"
                           height={70}
                         />
                     </div>
                     <div className="ms-Grid-col ms-sm4 ms-md4">
                       <h4>Hitaxi Kachhadiya</h4>
                       <p>Assoicate sofware engineer</p>
                     </div>
                     <div className="ms-Grid-col ms-sm4 ms-md2"style={{width:"13%",paddingTop:"10px"}}>
                       <img className={styles.circularImage}
                           src={require('./BirthDaycircle1.jpg')}
                           alt="Happy BirthDay"
                           height={70}
                         />
                     </div>
                     <div className="ms-Grid-col ms-sm4 ms-md4">
                       <h4>Bansi Hadvani</h4>
                       <p>Sofware engineer</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>         
        </div>
        </div>
      </Stack>     
    );
  }
}
