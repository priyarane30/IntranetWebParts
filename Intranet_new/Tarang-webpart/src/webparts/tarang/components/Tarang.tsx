import * as React from 'react';
import styles from './Tarang.module.scss';
import { ITarangProps } from './ITarangProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';


var month =(new Date().getMonth()+1).toString();
console.log("Hirvita ",month)
var date = new Date().getDate().toString();
console.log(date)

export interface IBirthdayState{
  items:
  [
    {
      Title:string,
      Birthdate: Date
      

    }
 ],
 courrentUser : string,
 counter : number
}


export default class Birthday extends React.Component<ITarangProps, IBirthdayState>{
  public constructor(props:ITarangProps,state:IBirthdayState) {
    super(props);
    this.state = { 
      items:[
        {
          Title:"No birthdays Today",
          Birthdate: new Date(),
        }
      ],
      courrentUser : "",
      counter : 0
      
            
    };
   
  }

  public componentWillMount() {
    this.GetItemsForBirthday(); 
  }

  public componentDidMount() {
    console.log("Tarang =====> ")
    var timer = setInterval(() => {
      this.renderUser();
    }, 5000);
 }

 public renderUser() {

  this.setState({courrentUser : this.state.items[this.state.counter].Title})
  this.setState({
    counter : (this.state.counter == this.state.items.length-1)?0:this.state.counter+1
})
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


  public render(): React.ReactElement<ITarangProps> {
    debugger
    console.log("data =====> ",this.state.items)
    return (
      <div className={ styles.tarang}>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <img  src={require('./content.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>May all your wish come true</div>
                         
                    {
                      (this.state.items.length > 1)?
                    // this.state.items.map((item,key) =>(          
                <div>
                         <div  className={styles.para}>{this.state.courrentUser}</div>     
                  </div>

                
              //       )
              //  )
               :
               <div>
               <div className={styles.para}>{this.state.items[0].Title}</div>     
        </div>
              
               }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




// export default class Tarang extends React.Component<ITarangProps, {}> {
//   public render(): React.ReactElement<ITarangProps> {
//     return (
//       <div className={ styles.tarang }>
//         <div className={ styles.container }>
//           <div className={ styles.row }>
//             <div className={ styles.column }>
//               <span className={ styles.title }>Welcome to SharePoint!</span>
//               <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
//               <p className={ styles.description }>{escape(this.props.description)}</p>
//               <a href="https://aka.ms/spfx" className={ styles.button }>
//                 <span className={ styles.label }>Learn more</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
