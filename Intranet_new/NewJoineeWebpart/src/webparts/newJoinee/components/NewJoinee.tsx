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
      
      FirstName: string;
      LastName:string;
      DateofJoining: string;
      EmploymentStatus:string;

    }
  ],
   "NewJoineeUser":string,
   "NewJoineeUser1":string,
   "counter":number
}

export default class NewJoinee extends React.Component<INewJoineeProps, INewJoineeState> {
  public constructor(props:INewJoineeProps, state:INewJoineeState) {
    super(props);
    this.state = { 
      items:[
              {
                "FirstName":"",
                "LastName":"",
                "DateofJoining":"",
                "EmploymentStatus":""
               
              }
            ] ,
            "NewJoineeUser":"",
            "NewJoineeUser1":"",
            "counter":0
    };
  }
 public componentDidMount() {
    this.GetItemsForNewJoinee();
  
  }
  public componentWillMount(){
    var timer = setInterval(() => {
      this.renderUser()
    },7000)
  }
  
  renderUser(){
    this.setState({
      NewJoineeUser:this.state.items[this.state.counter].FirstName,
      NewJoineeUser1:this.state.items[this.state.counter].LastName,
    });
    this.setState({
      counter:this.state.counter == this.state.items.length - 1 ? 0 : this.state.counter + 1
    })
  }

  public GetItemsForNewJoinee() {
       
    var BirthdayHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('EmployeeContact')/items?$top=5 &$orderby=ID desc`;
    //&$orderby= DateOfJoining desc
    jquery.ajax({ 
         
      url: anncurl,
      type: "GET", 
      headers:{'Accept': 'application/json; odata=verbose;'}, 
      success: function(resultData) { 
         //filter Data
         var dataFiltered = resultData.d.results.filter(data =>

          data.Status == 'Active' 
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
            <img  src={require('./03.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>Welcome Aboard</div>
              {this.state.items.length > 1 ? 
              ( <div className={styles.para}>{this.state.NewJoineeUser} {this.state.NewJoineeUser1}</div> )
              :
              ( <div className={styles.para}>{this.state.items[0].FirstName}</div>)
            }


            {/* {this.state.items.map(function(item,key){
               return (<div>
                   <div className={styles.para}>{item.Title}</div>   
                                   
                  </div>

                );
              }
              )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
