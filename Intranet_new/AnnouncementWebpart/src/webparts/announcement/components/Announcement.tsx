import * as React from 'react';
import styles from './Announcement.module.scss';
import { IAnnouncementProps } from './IAnnouncementProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from "jquery";
import { Link } from'office-ui-fabric-react/lib/components/Link';



//const icon: string = require('/AnnouncementWebPart/src/assets/icon.png');
//const arrow: string = require('/AnnouncementWebPart/src/assets/arrow.jpg')
const icon: string = require('../assets/icon.png');
const arrow: string = require('../assets/arrow.jpg')



export interface IAnnouncementState {
  items: [
    {
      Title: string;
      Description: string;
      ExpiryDate: Date;

    }
  ];
 
}


export default class Announcement extends React.Component<IAnnouncementProps,IAnnouncementState > {
  public constructor(props: IAnnouncementProps) {
    super(props);
   
    this.state = {
      items: [
        {
          Title: "Test",
          Description: "Test description",
          ExpiryDate: new Date()
      
        }
      ],
      
    };
  }
 public componentDidMount() {
    this.GetItemsForAnnouncement();
   
  }

  public GetItemsForAnnouncement() {
    var BirthdayHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('${this.props.listName}')/items`;
    jquery.ajax({
      url: anncurl,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function(resultData) {
        //filter Data
        console.log("Result-data", resultData.d.results);
        
        var dataFiltered = resultData.d.results.filter(
         data => new Date(data.ExpiryDate) >= new Date()
        
          
        );
        console.log(dataFiltered)
        if (
          dataFiltered != undefined && dataFiltered != null &&  dataFiltered.length > 0) {
          //if dataFiltered has values
          BirthdayHandler.setState({
            items: dataFiltered
           //items: resultData.d.results
          });
       }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  public render(): React.ReactElement<IAnnouncementProps> {
    return (
      <div className={ styles.announcement }>
          <div className={ styles.container }>
            <img src={`${icon}`} className={styles.rightalig} />
              
                <p className={styles.header}>Announcement</p> 
                <div className="ms-Grid" dir="ltr" >
                  <div className={styles.sectionbody}>
                    <div className={styles.item}>
                      <div className={styles.jobsection}>
                        <div className={styles.jobitem}>
                        {this.state.items.map(function (item, key) {
                                    return (<div>
                                      <div className="ms-Grid-row">
                                        <div className="ms-Grid-col ms-md4">
                                          <div className={styles.dateitem}>
                                            {/* <p className={styles.primarytext}> */}
                                            <img src={require("./Ann1.png")} alt="test" />
                                            {/* </p> */}
                                          </div>
                                        </div>
                                        <div className="ms-Grid-col ms-md8">
                                          <p className={styles.subject}>{item.Title}</p>
                                          <p className={styles.subject1} >{item.Description}</p>
                                        </div>
                                      </div>
                                      {/* <br /> */}
                                    </div>
                                    );
                        })}
                        {/* <div><p className={styles.viewall}><img src={require("./arrow.jpg")} alt="test" /></p></div> */}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            
            <Link href={`${this.props.siteurl}/Lists/${this.props.listName}/AllItems.aspx`} target='_blank' className={styles.viewAll}>
            <img src={`${arrow}`} className={styles.viewAll} />
            </Link> 
          </div>
           
          </div>
        
    );
  }
}
