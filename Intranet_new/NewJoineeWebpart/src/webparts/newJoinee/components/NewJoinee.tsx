import * as React from 'react';
import styles from './NewJoinee.module.scss';
import { INewJoineeProps } from './INewJoineeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();
var year = new Date().getFullYear().toString();
console.log("Date::: " +date);
console.log(month);
console.log(year);

export interface INewJoineeState{
  items:[
    {
      "Title":string,
      "DateOfJoining": Date

    }
  ]
}

export default class NewJoinee extends React.Component<INewJoineeProps, INewJoineeState> {
  public constructor(props:INewJoineeProps, state:INewJoineeState) {
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
    this.GetItemsForNewJoinee();
  
  }

  public GetItemsForNewJoinee() {
       
    var BirthdayHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('Anniversary')/items?$top=5&$orderby= DateOfJoining desc`;
    jquery.ajax({ 
         
      url: anncurl,
      type: "GET", 
      headers:{'Accept': 'application/json; odata=verbose;'}, 
      success: function(resultData) { 
         //filter Data
         var dataFiltered = resultData.d.results.filter(data =>
          
            data.JoinYear == year 
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
  public render(): React.ReactElement<INewJoineeProps> {
    return (
      <div className={ styles.newJoinee }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <img  src={require('./content.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>Welcome Aboard</div>
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
