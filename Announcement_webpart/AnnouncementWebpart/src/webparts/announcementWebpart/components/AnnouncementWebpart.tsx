import * as React from 'react';
import styles from './AnnouncementWebpart.module.scss';
import { IAnnouncementWebpartProps } from './IAnnouncementWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as jquery from 'jquery';


export interface IAnnouncementState{
  items:[
    {
      "Title":""
    }
  ]
}

export default class AnnouncementWebpart extends React.Component<IAnnouncementWebpartProps, IAnnouncementState> {
  public constructor(props:IAnnouncementWebpartProps, state:IAnnouncementState) {
    super(props);
    this.state = { 
      items:[
              {
                "Title":""
              
              }
            ] 
    };
  }
  componentDidMount() {
    var AnouncementHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle(' Announcement’)/items?$select=Title,Modified&$filter=ID eq 7`;
    jquery.ajax({ 
      //url: `${this.props.siteurl}/_api/web/lists/getbytitle('Birthday')/items?$Birthdate=10/18/2019`,
      //url: ` ${this.props.siteurl}/_api/web/lists/getbytitle('Announcement')/items?$select=Title&$filter=ID eq 7`,
      url: anncurl,
      type: "GET", 
      headers:{'Accept': 'application/json; odata=verbose;'}, 
      success: function(resultData) { 
        AnouncementHandler.setState({ 
          items: resultData.d.results 
        }); 
      }, 
      error : function(jqXHR, textStatus, errorThrown) { 
      } 
  }); 
}
public render(): React.ReactElement<IAnnouncementWebpartProps> {
  return (
    <div className={ styles.announcementWebpart }>
      <div className={styles.containerborder }>
              <div  className={styles.title}>Announcement
              </div>
              <div className ="ms-Grid-row"> 
                  {this.state.items.map(function(item,key){        
                      return (<div>
                                  <div className="ms-Grid-col ms-u-sm5" >
                                    <img src={require('./anncoucement.png')}alt="test" width="120" height="100" />
                                  </div>
                                  <div className="ms-Grid-col ms-u-sm7"><p className={styles.para}>
                                    
                                            {item.Title}
                                            </p>
                                           
                                  </div>
                              </div>
                            );
                    })}
              </div>
      </div>
    </div> 
              
    
   
  );
}
}
   
  




 

// const AnnouncementWebpart = (Props:IAnnouncementWebpartProps) =>{
 
//      return (
//       <div className={ styles.announcementWebpart }>
//              <div className={styles.containerborder }>
//               <div  className={styles.title}>Announcement</div>
//               <div className ="ms-Grid-row"> 
//               <div className="ms-Grid-col ms-u-sm5" >
//                <img src={require('./anncoucement.png')}alt="test" width="120" height="100" />
//                </div>
//               <div className="ms-Grid-col ms-u-sm7" ><p className={styles.para}>It's time for Diwali Bash and we cordially invite you with your families for Diwali Celebration Dinner Party.
//                         The date will be 20th October 2014 (Monday).
//                         To have understanding of exact count, we will pass on blank sheet in both offices. Request you to please suggest your availability and number of family members (beyond 5 years age) who will be joining us for the day.
//                         The venue will be finalized within few days’ time.
//                         </p>
//                         {Props.description}
//               </div>
//               </div>
//               </div> 
              
//       </div>
     
//     );
// }
