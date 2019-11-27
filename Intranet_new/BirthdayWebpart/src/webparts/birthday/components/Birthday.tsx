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
  items:
  [
    {
      Title:string,
      Birthdate: Date,
      counter: number
      

    }
 ]
}

export default class Birthday extends React.Component<IBirthdayProps, IBirthdayState>{
  public constructor(props:IBirthdayProps,state:IBirthdayState) {
    super(props);
    this.state = { 
      items:[
        {
          Title:"No Birthday Today",
          Birthdate: new Date(),
          counter : 0

        
        }
      ]
            
    };
   
  }

  public componentDidMount() {
    
 
  //  {this.state.items.map(function(item,key){ 
  //   this.GetItemsForBirthday();
  //   debugger
  //   for (let i of item.Title) {
  //     setTimeout(() => {
  //       this.setState({ item: i  })
  //     }, 5000)
  //   }
  // })}
   
  this.GetItemsForBirthday();

  // var arr2 = Object.keys(this.state.items).map(function (i) {
  //   return this.state.items[i];
  // });


  
     
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





//     public GetItemsForBirthday() {
       
//     var BirthdayHandler = this;
//     var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('Birthday')/items`;
//     jquery.ajax({ 
         
//       url: anncurl,
//       type: "GET", 
//       headers:{'Accept': 'application/json; odata=verbose;'}, 
//       success: function(resultData) { 
//          //filter Data
//          var dataFiltered = resultData.d.results.filter(data =>
//           data.DateOfBirth == date && data.Month == month
//         );
//         if (dataFiltered != undefined && dataFiltered != null && dataFiltered.length > 0) {
//           //if dataFiltered has values
//           BirthdayHandler.setState({
//             items: dataFiltered
//           });
//         }
//       }, 
//       error : function(jqXHR, textStatus, errorThrown) { 
//         console.log(jqXHR);
//       }
    
//   }); 
// }


// CurrentBirthdayUser = ( ) => {
//   var counter = 0;
//   //console.log('counter1 = ', this.state.items)
//  // console.log('counter value', this.state.items[0].Title)
//   var lengthtitle = this.state.items.length;

//   console.log('Counter value ',this.state.items.length)
//   console.log('Length',lengthtitle-1)
//  // var con_val = (counter == lengthtitle - 1 )?0:counter + 1
//    var con_val = (lengthtitle == lengthtitle-1)?0:lengthtitle-1
//   console.log('con_val' ,con_val)
//   console.log('counter final value', counter)

//   {this.state.items.map(function(item,key){ 
//     this.setState({item : item.counter})
//     console.log('courrentUser', item.counter)
//     console.log(item.counter, item.counter-1)

//     //var counter = 0
//     //counter : (this.state.item.length == item.Title.length-1)?0:this.state.item.length+1
//   })}



// }



  public render(): React.ReactElement<IBirthdayProps> {
    return (
      <div className={ styles.birthday }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <img  src={require('./content.jpg')}alt="test" />
            <div className="ms-Grid-col ms-md12">
                    <div className={styles.BirthdayHeader}>May all your wish come true</div>
                    goToNext()
            {this.state.items.map(function(item,key){  
              var arr = [];
              
              // const intervalarray = setInterval(() => {
              //   arr.push( item.Title);
              // },1000)
              
              goToNext = () => {
                this.setState({ counter: item.Title + 1 })
              }
               console.log("Arrryvalue ",arr)
               
               return (<div>
                  
               
                  
                             <div className={styles.para}>{this.goToNext}</div>    
                                   
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



