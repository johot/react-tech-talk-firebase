import * as React from "react";
import { Header } from "semantic-ui-react";

export interface JumbotronProps {}

export class Jumbotron extends React.Component<JumbotronProps> {
  render() {
    return (
      <Header
        style={{ fontSize: 65, marginTop: 10, marginBottom: 30 }}
        textAlign="center"
      >
        Connys Matkasse
        <Header.Subheader style={{ fontSize: 20, lineHeight: 2 }}>
          För dig som tröttnat på ständiga förändringar.<br />
          <b>Samma meny varje vecka - garanterat fiberfritt!</b>
        </Header.Subheader>
      </Header>
    );
  }
}
