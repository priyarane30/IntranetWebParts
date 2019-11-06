import * as React from 'react';
import styles from './NewjoineeWebpart.module.scss';
import { INewjoineeWebpartProps } from './INewjoineeWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import * as jquery from 'jquery';

export interface INewjoineeState {
 
    joinee:[{
      "Title":string,
      "JoiningDate":Date,
      "Designation":string
    }];
}
export default class NewjoineeWebpart extends React.Component<INewjoineeWebpartProps, INewjoineeState> {
  public constructor(props: INewjoineeWebpartProps, state: INewjoineeState) {
    super(props);
    this.state = {
      
      joinee:[
        {
          "Title":"",
          "JoiningDate":new Date(),
          "Designation":""
        }
      ]
    };
  }
  public GetItemsForJoinee(){
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteurl}/_api/web/lists/getbytitle('Employee')/items?$top=2`,//Get all item from List
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
   
    this.GetItemsForJoinee();//Fetch items From List for New Joinee
  }
  public render(): React.ReactElement<INewjoineeWebpartProps> {
    const stackTokens: IStackTokens = { childrenGap: 20 };
    return (
      <Stack tokens={stackTokens} styles={{ root: { maxWidth: 700 } }}>
        <div className={styles.newjoineeWebpart}>
          <div className={styles.container}>
          <div className="ms-Grid" dir="ltr" >
              <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12">
              <img src={require('./balloons-and-fireworks-background.jpg')}
                        alt="New Joinee"
                        // className={styles.circularImage}
                        // height={50}
                        style={{width:"100%"}}
                      />
                      </div>
              </div>
          </div>
           <h2 className={styles.alignment}>New Joinee</h2>      
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                {this.state.joinee.map(function (item, key) {
                return (<div>
                          <div className="ms-Grid-col ms-sm2 ms-md2"></div>
                          <div className="ms-Grid-col ms-sm4 ms-md3" style={{paddingTop: "10px" }}>
                            <img className={styles.circularImage}
                                  src={require('./BirthDaycircle1.jpg')}
                                  alt="New Joinee"
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
