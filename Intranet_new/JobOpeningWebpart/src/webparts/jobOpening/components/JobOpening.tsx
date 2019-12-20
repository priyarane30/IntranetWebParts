import * as React from 'react';
import styles from './JobOpening.module.scss';
import { IJobOpeningProps } from './IJobOpeningProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from "jquery";
import { Link } from'office-ui-fabric-react/lib/components/Link';

//const icon: string = require('../assets/icon.png');
const arrow: string = require('../assets/arrow.jpg')

export interface IJobopeningState {
  items: [
    {
      Title:string;
      Technology: string;
      Experience: string;
      //ExpiryDate: Date;

    }
  ];
  currentopening: string;
  counter: number;
}

export default class JobOpening extends React.Component<IJobOpeningProps,IJobopeningState > { 
  public constructor(props: IJobOpeningProps) {
    super(props);
   
    this.state = {
      items: [
        {
          Title: "",
          Technology: "Test",
          Experience: "Test description",
          //ExpiryDate: new Date()
      
        }
      ],
      currentopening: "",
      counter: 0
    };
  }
 

  public componentDidMount() {
    this.GetItemsForJobOpening();
   
  }
  // componentWillMount() {
  //   var timer = setInterval(() => {
  //     this.renderjobopening();
  //   }, 7000);
  // }

  // public renderjobopening() {
  //   this.setState({
  //     currentopening: this.state.items[this.state.counter].Title,
  //     //currentBirthdayuser1: this.state.items[this.state.counter].LastName,
  //   });
  //   this.setState({
  //     counter:
  //       this.state.counter == this.state.items.length - 1
  //         ? 0
  //         : this.state.counter + 1
  //   });
  // }

  public GetItemsForJobOpening() {
    var JobOpeningHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('OpenPostions')/items?$orderby=RaisedDate desc&$top=3`;
   // var anncurl = `http://portals.synovergetech.com/Interview/GetOpenPosition/items`;
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
    var redirectLink = `${this.props.siteurl}/SitePages/Open-Job-Positions.aspx`
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
                                      <div className= {styles.dot}>
                                        {item.Technology}
                                      </div>
                                  </div>
                                  <div className="ms-Grid-col  ms-md8 ">
                                          <div className={styles.subject}>
                                            {item.Title}
                                          </div>
                                          <div className={styles.subject1}>
                                            {item.Experience} Years
                                          </div>
                                          <div className={styles.subject2}>                                           
                                             <Link href={redirectLink} target='_blank' className={styles.subject2}>
                                          More Details &rarr;
                                            </Link>  
                                          </div>
                                  </div>
                                </div>
                                </div>
                                );
                    })}
                  
                   
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
