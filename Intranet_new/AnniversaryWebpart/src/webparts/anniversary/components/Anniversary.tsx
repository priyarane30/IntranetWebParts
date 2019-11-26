import * as React from 'react';
import styles from './Anniversary.module.scss';
import { IAnniversaryProps } from './IAnniversaryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();
console.log("Date::: " +date);
console.log(month);

export interface IAnniversaryState{
  items:[
    {
      "Title":string,
      "DateOfJoining": Date

    }
  ]
}
export default class Anniversary extends React.Component<IAnniversaryProps, {}> {
  public constructor(props:IAnniversaryProps, state:IAnniversaryState) {
    super(props);
    this.state = { 
      items:[
              {
                "Title":"No Anniversary Today",
                "DateOfJoining": new Date()
                
              
              }
            ] 
    };
  }
  public componentDidMount() {
    this.GetItemsForAnniversary();
  
   
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
         var dataFiltered = resultData.d.results.filter(data =>
          data.Datejoin == date && data.Month == month
        );
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
            <img  src={require('./content.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>May all your wish come true</div>
            {/* {this.state.items.map(function(item,key){  */}
            {this.state.items.map(function(item,key){
               return (<div>
                   <div className={styles.para}>{item.Title}</div>   
                                   
                  </div>

                );
              }
              )}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}
