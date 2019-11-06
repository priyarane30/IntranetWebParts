import * as React from 'react';
import styles from './AnniversaryWebpart.module.scss';
import { IAnniversaryWebpartProps } from './IAnniversaryWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import * as jquery from 'jquery';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();

export interface IAnniversaryState {
  items: [
    {
      "Title": string,
      "Birthdate": Date,
      "Designation":string
    }];
  }
export default class AnniversaryWebpart extends React.Component<IAnniversaryWebpartProps,IAnniversaryState> {
  
  public constructor(props: IAnniversaryWebpartProps, state: IAnniversaryState) {
    super(props);
    this.state = {
      items: [
        {
          "Title": "No Anniversary Today",
          "Birthdate": new Date(),
          "Designation":""
        }
      ]
    };
  }
  public GetItemsForAnniversary() {
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteurl}/_api/web/lists/getbytitle('Birthday')/items`,//Get all item from List
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        //filter Data
        var dataFiltered = resultData.d.results.filter(data =>
          data.DateOfBirth == date && data.Month == month
        );
        if (dataFiltered != undefined && dataFiltered != null && dataFiltered.length > 0) {
          //if dataFiltered has values
          reactHandler.setState({
            items: dataFiltered
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });

  }
  public componentDidMount() {
    this.GetItemsForAnniversary();
  }
  public render(): React.ReactElement<IAnniversaryWebpartProps> {
    const stackTokens: IStackTokens = { childrenGap: 20 };
    return (
      <Stack tokens={stackTokens} styles={{ root: { maxWidth: 700 } }}>
        <div className={styles.anniversaryWebpart}>
          <div className={styles.container}>
          <div className="ms-Grid" dir="ltr" >
              <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12">
              <img src={require('./balloons-and-fireworks-background.jpg')}
                        alt="Happy Anniversary"
                        // className={styles.circularImage}
                        // height={50}
                        style={{width:"100%"}}
                      />
                      </div>
              </div>
          </div>
           <h2 className={styles.alignment}>Happy Anniversary</h2>      
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                {this.state.items.map(function (item, key) {
                return (<div>
                          <div className="ms-Grid-col ms-sm2 ms-md2"></div>
                          <div className="ms-Grid-col ms-sm4 ms-md3" style={{paddingTop: "10px" }}>
                            <img className={styles.circularImage}
                                  src={require('./BirthDaycircle1.jpg')}
                                  alt="Happy BirthDay"
                                  height={70}/>
                          </div>
                          <div className="ms-Grid-col ms-sm4 ms-md5">
                            <h5>{item.Title}</h5>
                            <p>{item.Designation}</p>
                          </div>
                          <div className="ms-Grid-col ms-sm2 ms-md2"></div>
                        </div>
                        );
                         })}
              </div>
            </div>          
          </div>
        </div>         
      </Stack>
    );
  }
}
