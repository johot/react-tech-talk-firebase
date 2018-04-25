import * as React from "react";
import { Header } from "semantic-ui-react";
import { Responsive } from "../common/Responsive";

export interface JumbotronProps {}

export class Jumbotron extends React.Component<JumbotronProps> {
  render() {
    return (
      <Responsive mobileStyle={{ fontSize: 50, marginBottom: 10 }}>
        {style => (
          <Header style={{ fontSize: 65, marginTop: 10, marginBottom: 20, ...style }} textAlign="center">
            Connys Matkasse
            <Responsive mobileStyle={{ fontSize: 16 }}>
              {style => (
                <Header.Subheader style={{ fontSize: 20, lineHeight: 2, ...style }}>
                  För dig som tröttnat på ständiga förändringar.<br />
                  <b>Samma meny varje vecka - garanterat fiberfritt!</b>
                </Header.Subheader>
              )}
            </Responsive>
          </Header>
        )}
      </Responsive>
    );
  }
}
