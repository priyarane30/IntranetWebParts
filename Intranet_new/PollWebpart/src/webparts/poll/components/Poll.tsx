import * as React from "react";
import styles from "./Poll.module.scss";
import { IPollProps } from "./IPollProps";
import * as jquery from "jquery";


export interface IPollState {
  ID: string;
  Title?: string;
  Description?: string;
  StaticName?: string;
  TypeAsString?: string;
  Choices?: string[];
  selectedValue?: string;
}
export interface State {
  value: Ivalue
}

export interface Ivalue {
  value: string;
}

export default class Poll extends React.Component<IPollProps, IPollState> {
  public constructor(props: IPollProps, state: IPollState) {
    super(props);
    this.state = {
      ID: "",
      Title: "",
      Description: "",
      StaticName: "",
      TypeAsString: "",
      Choices: [],
      selectedValue: "",
    };
    this.onVoteChanged = this.onVoteChanged.bind(this);
  }

  public componentDidMount() {
    this.GetItemsForPoll();
  }
  public GetItemsForPoll() {
    var PollHandler = this;
    var anncurl = `${this.props.siteurl}/_api/web/lists/getbytitle('Poll')/fields?$filter=(CanBeDeleted eq true)`;
    jquery.ajax({
      url: anncurl,
      type: "GET",
      headers: { Accept: "application/json; odata=verbose;" },
      success: function(resultData) {
        var responsedata = { value: [] };
        resultData.d.results.map((object: any, i: number) => {
          var spListItem: IPollState = {   
            ID: object["ID"],
            Title: object["Title"],
            StaticName: object["StaticName"],
            TypeAsString: object["TypeAsString"],
            Choices: object["Choices"]     
          };
          responsedata.value.push(spListItem);
          console.log("Response:----" + responsedata.value);
          PollHandler.setState({
            Title: responsedata.value[0].Title,
            Choices: responsedata.value[0].Choices.results
          });
        });
        
      },

      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  public render(): React.ReactElement<IPollProps> {
    return (
      <div className={styles.poll}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
             
              <div className={styles.pollquestion}>{this.state.Title}</div>
              {this.state.Choices.map((answer: string, i: number) => {
                  return (
                    <div className={styles.radiocolor}><input type='radio'  name="pollques" defaultChecked={answer == this.state.selectedValue ? true : false} aria-checked={answer == this.state.selectedValue ? true : false}   onChange={this.onVoteChanged} value={answer} /> {answer}</div>
                  );
                })}

                <input type='button'  style={{color: 'black'}} value="Submit" className='ms-Button ms-Button--primary'/>

            </div>
          </div>
        </div>
      </div>
    );
  }
  private onVoteChanged(elm?: any): void {
    this.state.selectedValue = elm.currentTarget.value;
    //this.setState(this.state);
  }



}


