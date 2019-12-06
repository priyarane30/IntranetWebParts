import * as React from 'react';
import styles from './Anniversary.module.scss';
import { IAnniversaryProps } from './IAnniversaryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();
var year = new Date().getFullYear().toString();
console.log("Date::: " +date);
console.log(month);
console.log(year);

export interface IAnniversaryState{
  items:[
    {
      "Title":string,
      "DateOfJoining": Date
    }
  ],
   "AnniversaryUser":string,
   "Counter":number
}
export default class Anniversary extends React.Component<IAnniversaryProps, IAnniversaryState> {
  public constructor(props:IAnniversaryProps, state:IAnniversaryState) {
    super(props);
    this.state = { 
      items:[
              {
                "Title":"No Anniversary Today",
                "DateOfJoining": new Date()         
              }
            ] ,
            "AnniversaryUser":"",
            "Counter":0
    };
  }
 public componentDidMount() {
    this.GetItemsForAnniversary();  
  }
 public  componentWillMount(){
    var timer = setInterval(() => {
       this.renderUser()
    },7000)
  }

  renderUser(){
    this.setState({
      AnniversaryUser:this.state.items[this.state.Counter].Title

    });
    this.setState({
      Counter:this.state.Counter == this.state.items.length - 1 ? 0 : this.state.Counter + 1
    })
  }
  
  public GetItemsForAnniversary() {
       
    var BirthdayHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('Anniversary')/items`;
    jquery.ajax({ 
         
      url: anncurl,
      type: "GET", 
      headers:{'Accept': 'application/json; odata=verbose;'}, 
      success: function(resultData) { 
         //filter Data
         var dataFiltered = resultData.d.results.filter(
         data => data.Status == 'Active' && new Date(data.DateOfJoining).getDate()== new Date().getDate() && new Date(data.DateOfJoining).getMonth() == new Date().getMonth() && new Date(data.DateOfJoining).getFullYear() != new Date().getFullYear(),
        
        );
        console.log(dataFiltered)
        if (dataFiltered != undefined && dataFiltered != null && dataFiltered.length > 0) {
          //if dataFiltered has values
          BirthdayHandler.setState({
            items: dataFiltered
          });
        }
      }, 
      error : function(jqXHR, textStatus, errorThrown) { 
        console.log(jqXHR);
      }
    
  }); 

}


  public render(): React.ReactElement<IAnniversaryProps> {
    return (
      <div className={ styles.anniversary }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <img  src={require('./02.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>Congratulations</div>
                    
              {this.state.items.length > 1 ? (
                 
                <div><div className={styles.para}>{this.state.AnniversaryUser}</div>
                
                </div>
              ):(<div className={styles.para}>{this.state.items[0].Title} </div>)
              }
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}
