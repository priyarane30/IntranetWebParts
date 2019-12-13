import * as React from 'react';
import styles from './JobOpening.module.scss';
import { IJobOpeningProps } from './IJobOpeningProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from "jquery";

export interface IJobopeningState {
  items: [
    {
      Technology: string;
      Experience: string;
      //ExpiryDate: Date;

    }
  ];
 
}

export default class JobOpening extends React.Component<IJobOpeningProps,IJobopeningState > {
  public constructor(props: IJobOpeningProps) {
    super(props);
   
    this.state = {
      items: [
        {
          Technology: "Test",
          Experience: "Test description",
          //ExpiryDate: new Date()
      
        }
      ],
      
    };
  }
 public componentDidMount() {
    this.GetItemsForJobOpening();
   
  }

  public GetItemsForJobOpening() {
    var JobOpeningHandler = this;
   // var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('JobOpenings')/items`;
    var anncurl = `http://portals.synovergetech.com/Interview/GetOpenPosition/items`;
    jquery.ajax({
      url: anncurl,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function(resultData) {
        //filter Data
        // var dataFiltered = resultData.d.results.filter(
        //  data => new Date(data.ExpiryDate) >= new Date()
        
          
        // );
       // console.log(dataFiltered)
        // if (
        //   dataFiltered != undefined && dataFiltered != null &&  dataFiltered.length > 0) {
          //if dataFiltered has values
          JobOpeningHandler.setState({
          //  items: dataFiltered
           items: resultData.d.results
          });
      // }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  public render(): React.ReactElement<IJobOpeningProps> {
    return (
      <div className={ styles.jobOpening }>
        <div className={ styles.container }>
        
        <p className={styles.header}>Job Openings</p> 
            <div className="ms-Grid" dir="ltr" >
              <div className={styles.sectionbody}>
                <div className={styles.item}>
                  <div className={styles.jobsection}>
                    <div className={styles.jobitem}>
                    {this.state.items.map(function (item, key) {
                                 return (<div>
                                  <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-md4">
                                      <div className={styles.dot}>
                                        {/* <p className={styles.primarytext}> */}
                                        {item.Technology}
                                        {/* </p> */}
                                 
                                        
                                      </div>
                                    </div>
          
                                    <div className="ms-Grid-col ms-md8">
                                      <p className={styles.subject}>{item.Technology}</p>
                                      <p className={styles.subject1} >{item.Experience}</p>
                                    </div>
                                  </div>
                                  {/* <br /> */}
                                </div>
                                );
                    })}
                    <div><p className={styles.next}>&gt;</p></div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
            
          
              
           
        </div>
      </div>
    );
  }
}
