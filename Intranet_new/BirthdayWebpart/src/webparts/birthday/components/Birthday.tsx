// import * as React from 'react';
// import styles from './Birthday.module.scss';
// import { IBirthdayProps } from './IBirthdayProps';
// import { escape } from '@microsoft/sp-lodash-subset';
// import * as jquery from 'jquery';

// var month =(new Date().getMonth()+1).toString();
// var date = new Date().getDate().toString();


// export interface IBirthdayState{
//   items:
//   [
//     {
//       Title:string,
//       Birthdate: Date,
//       counter: number
      

//     }
//  ]
// }

// export default class Birthday extends React.Component<IBirthdayProps, IBirthdayState>{
//   public constructor(props:IBirthdayProps,state:IBirthdayState) {
//     super(props);
//     this.state = { 
//       items:[
//         {
//           Title:"No Birthday Today",
//           Birthdate: new Date(),
//           counter : 0

        
//         }
//       ]
            
//     };
   
//   }

//   public componentDidMount() {
  
//   this.GetItemsForBirthday();
  
//  }
 
//   public GetItemsForBirthday() {
       
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
//   public render(): React.ReactElement<IBirthdayProps> {
//     return (
//       <div className={ styles.birthday }>
//         <div className={ styles.container }>
//           <div className={ styles.row }>
//             <div className={ styles.column }>
//             <img  src={require('./content.jpg')}alt="test" />
//             <div className="ms-Grid-col ms-md12">
//                     <div className={styles.BirthdayHeader}>May all your wish come true</div>
                    
//                     {this.state.items.map(function(item,key){          
//                return (<div>
//                          <div className={styles.para}>{item.Title}</div>     
//                   </div>

//                 );
//                  }
//                )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


// import * as React from 'react';
// const data = ["Hitaxi","Hirvita","Bansi"]
//  //export default class TestDemo extends Component{
//   export default class Birthday extends React.Component<{}, { courrentUser: string, counter: number}>{
//     constructor(props) {
//         super(props)
//         this.state = {
//             courrentUser : "",
//             counter : 0,
//         }
//     }
//     componentDidMount(){
//         var timer = setInterval(() => {
//             this.renderUser();
//           }, 2000);
//     }
// renderUser = () => {
//     console.log('counter', this.state.counter)
//     this.setState({courrentUser : data[this.state.counter]}) 
// 			console.log('courrentUser', this.state.courrentUser)
// 			console.log(this.state.counter, data.length-1)
//     this.setState({
//         counter : (this.state.counter == data.length-1)?0:this.state.counter+1
//     })
// }
//     render(){
//         return(
            
//                   <div>{this.state.courrentUser}</div>  
                
//         )
//     }
// } 


import * as React from 'react';
import { IBirthdayProps } from './IBirthdayProps';
import * as jquery from 'jquery';
import styles from './Birthday.module.scss';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();

export  interface IBirthdayState { 
  items:[
    {
      Title: string,
      Birthdate: Date,
      counter: number,
      //BirthdayArray : Array<IBirthdayProps>
  }
]
}

//const data = ["Hitaxi","Hirvita","Bansi"]
 
  //export default class Birthday extends React.Component<{ IBirthdayProps }, { Title: string,Birthdate: Date, counter: number}>{
  
    export default class Birthday extends React.Component<IBirthdayProps, IBirthdayState>{
      public constructor(props:IBirthdayProps) {
        super(props)
        this.state = {
          items:[
            {
            Title : "No Birthday today",
            Birthdate:new Date(),
            counter : 0,
           // BirthdayArray :
        }
      ]
    };
  }
    componentDidMount(){
        var timer = setInterval(() => {
           this.GetItemsForBirthday();
            //this.renderUser();
          }, 5000);
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
           console.log('Result-data', resultData.d.results)
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


renderUser = () => {
    console.log('counter', this.state.items)
    {this.state.items.map(function(item,key){      
    this.setState({Title : item.Title[this.state.counter]}) 
			console.log('courrentUser', item.Title)
			console.log(this.state.counter, item.Title.length-1)
    this.setState({
        counter : (this.state.counter == item.Title.length-1)?0:this.state.counter+1
    })

   

  })}
}

// public render(): React.ReactElement<IBirthdayProps> {
//     //render(){
//       <img  src={require('./content.jpg')}alt="test" />
//       let timerId = setInterval(() => alert('tick'), 2000);
      
//       {this.state.items.map(function(item,key){  
//         return(
          
//                   <div>{this.state.items}timerId</div>  
                
//         )
//       })}
//     }

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
                   //    let timername = setTimeout(() => item.Title.length, 2000); 
                    this.setState({Title : item.Title[this.state.counter]})
                    this.setState({
                      counter : (this.state.counter == item.Title.length-1)?0:this.state.counter+1
                  })
             return (<div>
       
                          <div className={styles.para}>{this.state.item.Title}</div>    
                           
                                 
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






