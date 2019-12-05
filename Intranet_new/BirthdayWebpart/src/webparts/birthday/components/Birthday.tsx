
import * as React from "react";
import { IBirthdayProps } from "./IBirthdayProps";
import * as jquery from "jquery";
import styles from "./Birthday.module.scss";

var month = (new Date().getMonth() + 1).toString();
var date = new Date().getDate().toString();
var m_names = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];

var todaydate = new Date();
var current_month = m_names[todaydate.getMonth()]; 



export interface IBirthdayState {
  items: [
    {
      Title: string;
      Birthdate: Date;

    }
  ];
  currentBirthdayuser: string;
  counter: number;
  
}

export default class Birthday extends React.Component<
  IBirthdayProps,
  IBirthdayState
> {
  public constructor(props: IBirthdayProps) {
    super(props);
   
    this.state = {
      items: [
        {
          Title: "No Birthday today",
          Birthdate: new Date()
      
        }
      ],
      currentBirthdayuser: "",
      counter: 0
      
    };
  }
  // componentWillMount() {
  //   this.GetItemsForBirthday();
  // }
  // componentDidMount() {
  //   var timer = setInterval(() => {
  //     this.renderUser();
  //   }, 5000);
  // }

  componentDidMount() {
    this.GetItemsForBirthday();
   
  }
  componentWillMount() {
    var timer = setInterval(() => {
      this.renderUser();
    }, 7000);
  }
  


  public renderUser() {
    this.setState({
      currentBirthdayuser: this.state.items[this.state.counter].Title
    });
    this.setState({
      counter:
        this.state.counter == this.state.items.length - 1
          ? 0
          : this.state.counter + 1
    });
  }

  public GetItemsForBirthday() {
    var BirthdayHandler = this;
    var d = new Date().toISOString().substring(0,10) + "T00:00:00";
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('Birthday')/items$filter=Birthdate eq datetime'" + d.toISOString() + "'`;
    jquery.ajax({
      url: anncurl,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function(resultData) {
        //filter Data
        console.log("Result-data", resultData.d.results);
        
        // var dataFiltered = resultData.d.results.filter(
        //   data => data.Birthdate == date ,
          
        // );
        // if (
        //   dataFiltered != undefined &&
        //   dataFiltered != null &&
        //   dataFiltered.length > 0
        // ) {
          //if dataFiltered has values
          BirthdayHandler.setState({
           // items: dataFiltered
           items: resultData.d.results
          });
      //  }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });
  }
  public render(): React.ReactElement<IBirthdayProps> {
    return (
      <div className={styles.birthday}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <img src={require("./01.jpg")} alt="test" />
              <div className="ms-Grid-col ms-md12">
                <div className={styles.BirthdayHeader}>
                  May all your wish come true
                </div>
                
                {this.state.items.length > 1 ? (
                  <div>
                    <div className={styles.para}>
                      {this.state.currentBirthdayuser}
                    </div>
                  </div>
                ) : (    
                  <div><div className={styles.para}>{this.state.items[0].Title}</div>   
                        {/* <div className={styles.para1}>
                        
                      {this.state.items[0].Birthdate.getDate()}
                      {this.state.items[0].Birthdate.getMonth()}
                    </div> */}
                  </div>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
