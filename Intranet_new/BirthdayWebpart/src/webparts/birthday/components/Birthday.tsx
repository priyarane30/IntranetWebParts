
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
      FirstName: string;
      LastName:string;
      DateOfBirth: string;
      EmploymentStatus:string;

    }
  ];
  currentBirthdayuser: string;
  currentBirthdayuser1: string;
  counter: number;
  currentdate: number;
  
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
          FirstName: "No Birthday today",
          LastName:"",
          DateOfBirth: "",
          EmploymentStatus:""
      
        }
      ],
      currentBirthdayuser: "",
      currentBirthdayuser1: "",
      counter: 0,
      currentdate:  new Date().getFullYear()
      
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
      currentBirthdayuser: this.state.items[this.state.counter].FirstName,
      currentBirthdayuser1: this.state.items[this.state.counter].LastName,
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
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('EmployeeContact')/items?$top=1000`;
    jquery.ajax({
      url: anncurl,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function(resultData) {
        //filter Data
        console.log("Result-data", resultData.d.results);
        
        var dataFiltered = resultData.d.results.filter(
        data =>new Date(data.DateOfBirth).getDate()== new Date().getDate() && new Date(data.DateOfBirth).getMonth() == new Date().getMonth() && data.EmploymentStatus != 'Inactive', 
        );

         if (dataFiltered != undefined && dataFiltered != null && dataFiltered.length > 0) {

          //if dataFiltered has values
          BirthdayHandler.setState({
            items: dataFiltered
           //items: resultData.d.results
          });
       }
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
              <img src={require("./02.jpg")} alt="test" />
              <div className="ms-Grid-col ms-md12">
                <div className={styles.BirthdayHeader}>
                  May all your wish come true
                </div>
                
                {this.state.items.length > 1 ? (
                  <div>
                    <div className={styles.para}>
                      {this.state.currentBirthdayuser}{this.state.currentBirthdayuser1}
                    </div>
                   
                  </div>
                ) : (    
                  <div><div className={styles.para}>{this.state.items[0].FirstName}</div> 
                   
                       
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
