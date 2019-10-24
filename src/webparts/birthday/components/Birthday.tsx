import * as React from 'react';
import styles from './Birthday.module.scss';
import { IBirthdayProps } from './IBirthdayProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import * as jquery from 'jquery';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';

var month =(new Date().getMonth()+1).toString();
var date = new Date().getDate().toString();

export interface IBirthdayState {
  items: [
    {
      "Title": string,
      "Birthdate": Date,
      "Designation":string
    }];
    joinee:[{
      "Title":string,
      "JoiningDate":Date,
      "Designation":string
    }];
}

export default class Birthday extends React.Component<IBirthdayProps, IBirthdayState> {

  public constructor(props: IBirthdayProps, state: IBirthdayState) {
    super(props);
    this.state = {
      items: [
        {
          "Title": "No Birthday Today",
          "Birthdate": new Date(),
          "Designation":""
        }
      ],
      joinee:[
        {
          "Title":"",
          "JoiningDate":new Date(),
          "Designation":""
        }
      ]
    };
  }
  public GetItemsForBirthday() {
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
 
  public GetItemsForJoinee(){
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteurl}/_api/web/lists/getbytitle('${this,this.props.description}')/items?$top=5`,//Get all item from List
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
            reactHandler.setState({
            joinee: resultData.d.results
          });       
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
      }
    });
  }
  public componentDidMount() {
    this.GetItemsForBirthday();//Fetch items From List for Birthday
    this.GetItemsForJoinee();//Fetch items From List for Anniversary
  }

  public render(): React.ReactElement<IBirthdayProps> {
    const stackTokens: IStackTokens = { childrenGap: 20 };

    return (
      <Stack tokens={stackTokens} styles={{ root: { maxWidth: 700 } }}>
        <div className="ms-depth-8">
        <div className={styles.birthday}>
          <Pivot linkSize={PivotLinkSize.large}>
            <PivotItem headerText="BirthDay">
              <div>
                {/* birthdaywebpart */}
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 ms-md2">
                      <img src={require('./images.jpg')}
                        alt="Happy BirthDay"
                        height={200}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm8 ms-md10">
                      <h1>Birthday</h1>
                      <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                          {this.state.items.map(function (item, key) {
                            return (<div>
                              <div className="ms-Grid-col ms-sm4 ms-md2" style={{ width: "13%", paddingTop: "10px" }}>
                                <img className={styles.circularImage}
                                  src={require('./BirthDaycircle1.jpg')}
                                  alt="Happy BirthDay"
                                  height={70}
                                />
                              </div>
                              <div className="ms-Grid-col ms-sm4 ms-md4">
                                <h4>{item.Title}</h4>
                                <p>{item.Designation}</p>
                              </div>
                            </div>);
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>

            <PivotItem headerText="Anniversary">
              <div>
                {/* Anniversary */}
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 ms-md2">
                      <img src={require('./images.jpg')}
                        alt="Happy BirthDay"
                        height={200}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm8 ms-md10">
                      <h1>Anniversary</h1>
                      <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                        {this.state.items.map(function (item, key) {
                          return (<div>
                            <div className="ms-Grid-col ms-sm4 ms-md2" style={{ width: "13%", paddingTop: "10px" }}>
                              <img className={styles.circularImage}
                                src={require('./BirthDaycircle1.jpg')}
                                alt="Happy BirthDay"
                                height={70}
                              />
                            </div>
                            <div className="ms-Grid-col ms-sm4 ms-md4">
                              <h4>{item.Title}</h4>
                              <p>{item.Designation}</p>
                            </div>
                          </div>);
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PivotItem>

            <PivotItem headerText="New Joinees">
            <div>
                {/* Anniversary */}
                <div className="ms-Grid" dir="ltr">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4 ms-md2">
                      <img src={require('./images.jpg')}
                        alt="Happy BirthDay"
                        height={200}
                      />
                    </div>
                    <div className="ms-Grid-col ms-sm8 ms-md10">
                      <h1>New Joinee</h1>
                      <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                        {this.state.joinee.map(function (item, key) {
                          return (<div>
                            <div className="ms-Grid-col ms-sm4 ms-md2" style={{ width: "13%", paddingTop: "10px" }}>
                              <img className={styles.circularImage}
                                src={require('./BirthDaycircle1.jpg')}
                                alt="Happy BirthDay"
                                height={70}
                              />
                            </div>
                            <div className="ms-Grid-col ms-sm4 ms-md4">
                              <h4>{item.Title}</h4>
                              <p>{item.Designation}</p>
                            </div>
                          </div>);
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </PivotItem>

          </Pivot>
        </div></div>
      </Stack>

    );
  }
}
