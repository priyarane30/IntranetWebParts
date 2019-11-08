import * as React from "react";
import styles from "./TrainingCalendar.module.scss";
import { ITrainingCalendarProps } from "./ITrainingCalendarProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class TrainingCalendar extends React.Component<
  ITrainingCalendarProps,
  {}
> {
  public render(): React.ReactElement<ITrainingCalendarProps> {
    return (
      <div className={styles.trainingCalendar}>
        <div className={styles.container}>
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <div className={styles.Trainingheader}> Training Calendar </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm1"></div>
                <div className="ms-Grid-col ms-sm10">
                  <div className={styles.Containerbody}>
                    <div className={styles.trainingdayheader}>THURSDAY </div>
                    <div className={styles.trainingdateheader}> Nov 11,2019</div>
                  </div>
                <div className="ms-Grid-col ms-sm1"></div>
              </div>
              </div>
              <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm1">
                 
                </div>
                <div className="ms-Grid-col ms-sm10">
                <div className="ms-Grid-col ms-sm1"> <div className={styles.vl}></div></div>
                <div className="ms-Grid-col ms-sm9"> 
                    <div className={styles.Eventsname}>
                            Node JS Training<br/> L5 Conference Room
                    </div>
                </div>
                </div>
                <div className="ms-Grid-col ms-sm1"></div>
              </div>
            </div>
          </div>

          <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm1"></div>
                <div className="ms-Grid-col ms-sm10">
                  <div className={styles.Containerbody}>
                   <div className={styles.trainingdayheader}>MONDAY </div>
                    <div className={styles.trainingdateheader}> Dec 16,2019</div>
                </div>
                <div className="ms-Grid-col ms-sm1"></div>
              </div>
              </div>
              <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm1">                 
                </div>
                <div className="ms-Grid-col ms-sm10">
                <div className="ms-Grid-col ms-sm1"> <div className={styles.v2}></div></div>
                <div className="ms-Grid-col ms-sm9"> 
                    <div className={styles.Eventsname}>
                            SPFx Training<br/> L6 Conference Room
                    </div>
                </div>
                </div>
                <div className="ms-Grid-col ms-sm1"></div>
              </div>
            </div>
          </div>
          <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm1"></div>
                <div className="ms-Grid-col ms-sm10">
                  <div className={styles.Containerbody}>
                    <div className={styles.trainingdayheader}>FRIDAY </div>
                    <div className={styles.trainingdateheader}>Dec 26,2019</div>
                  </div>
                <div className="ms-Grid-col ms-sm1"></div>
              </div>
              </div>
              <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm1">                 
                </div>
                <div className="ms-Grid-col ms-sm10">
                <div className="ms-Grid-col ms-sm1"> <div className={styles.v3}></div></div>
                <div className="ms-Grid-col ms-sm9"> 
                    <div className={styles.Eventsname}>
                            IMS Training<br/> Basement
                    </div>
                </div>
                </div>
                <div className="ms-Grid-col ms-sm1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}






