import * as React from 'react';
import styles from './Birthday.module.scss';
import { IBirthdayProps } from './IBirthdayProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';


var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();
console.log("Date::: " +date);
console.log(month);

export interface IBirthdayState{
  items:[
    {
      "Title":string,
      "Birthdate": Date

    }
  ]
}

export default class Birthday extends React.Component<IBirthdayProps, IBirthdayState>{
  public constructor(props:IBirthdayProps, state:IBirthdayState) {
    super(props);
    this.state = { 
      items:[
              {
                "Title":"No Birthday Today",
                "Birthdate": new Date()
                
              
              }
            ] 
    };
  }
  
 

  public componentDidMount() {
    this.GetItemsForBirthday();
  
   
  }
  
   

    public GetItemsForBirthday() {
       
    var BirthdayHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('Birthday')/items`;
    jquery.ajax({ 
         
      url: anncurl,
      type: "GET", 
      headers:{'Accept': 'application/json; odata=verbose;'}, 
      success: function(resultData) { 
         //filter Data
         var dataFiltered = resultData.d.results.filter(data =>
          data.DateOfBirth == date && data.Month == month
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

  public render(): React.ReactElement<IBirthdayProps> {
    return (
      <div className={ styles.birthday }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <img  src={require('./content.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>May all your wish come true</div>
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

