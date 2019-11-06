import * as React from 'react';
import styles from './Trainingcalender.module.scss';
import { ITrainingcalenderProps } from './ITrainingcalenderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Calendar from 'react-calendar';
import * as jquery from 'jquery';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();
export interface ITrainingcalenderState {
 "date": Date,
 items: [
  {
    "Training_Detail": string,
    "DateOfTraining": Date
  }];
  }

export default class Trainingcalender extends React.Component<ITrainingcalenderProps, ITrainingcalenderState> {
  public constructor(props: ITrainingcalenderProps, state: ITrainingcalenderState) {
    super(props);
    this.state = {
      "date":new Date(),
      items: [
        {
          "Training_Detail": "No Training Today",
          "DateOfTraining": new Date()
        }
      ]
    };
  }
  onChange = date => this.setState({ date })
  public componentDidMount() {
    this.GetItemsForBirthday();
  }
  public GetItemsForBirthday() {
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteurl}/_api/web/lists/getbytitle('Training')/items?$select=Training_Detail,DateOfTraining,DateInText,Month`,//Get all item from List
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        //filter Data
        var dataFiltered = resultData.d.results.filter(data =>
          data.DateInText == date || data.Month == month
        );
        if (dataFiltered != undefined && dataFiltered != null && dataFiltered.length > 0) {
          //if dataFiltered has values
          reactHandler.setState({
            items: dataFiltered
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });

  }
  public render(): React.ReactElement<ITrainingcalenderProps> {
    return (
      <div className={ styles.trainingcalender }>
        <div className={ styles.container }> 
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12">
                <div className={styles.headingborder}>
              <h4 className={styles.marginleft}>Training Calender</h4></div>
              </div>
            </div>
            
            {/* <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md6">
              
                 <Calendar activeStartDate={new Date()}
                                //  onChange={this.onChange}
                                // value={this.state.date}
                                /> 
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md6">
               {this.state.items.map(function (item, key) {
               return (<ul>
                        <li> {item.DateOfTraining.toLocaleDateString()} on {item.Training_Detail}</li>
                        <hr/>  
                      </ul>);
                    })} 
            
              </div>
            </div> 
          </div>*/}
            <div className={styles.sectionbody}>
              <div className={styles.item}>
                <div className={styles.jobsection}>
                  <div className={styles.jobitem}>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm3 ms-md3">
                        <div className={styles.dateitem}>
                          <p className={styles.primarytext}>04</p>
                          <p className={styles.secondarytext}>Nov-2019</p>
                        </div>
                      </div>
                      <div className="ms-Grid-col ms-sm9 ms-md9">
                        <p className={styles.topictitle}><a href="#" title="Node JS" >Node JS</a></p>
                        <p className={styles.topicdesc}>
                          <span className="skill-info">very interstinng Topic and in future it's demand in market
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.jobitem}>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm3 ms-md3">
                        <div className={styles.dateitem}>
                          <p className={styles.primarytext}>04</p>
                          <p className={styles.secondarytext}>Nov-2019</p>
                        </div>
                      </div>
                      <div className="ms-Grid-col ms-sm9 ms-md9">
                        <p className={styles.topictitle}><a href="#" title="React Js" >React JS</a></p>
                        <p className={styles.topicdesc}>
                          <span className="skill-info">​very interstinng Topic and in future it's demand in market
                          </span>
                        </p>
                      </div>
                    </div>
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
