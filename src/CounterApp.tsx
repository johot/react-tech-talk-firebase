//tsrc
import * as React from "react";
import { Container, Button } from "semantic-ui-react";

export interface CounterAppState {
  count: number;
}

export default class CounterApp extends React.Component<{}, CounterAppState> {
  state = { count: 0 };

  _click = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <Container>
        <CounterDisplay count={this.state.count} />
        <Button onClick={this._click}>Räkna upp</Button>
      </Container>
    );
  }
}

export const CounterDisplay = (props: { count: number }) => (
  <div>
    Jag kan räkna till: <h1>{props.count}</h1>
  </div>
);

// const song = [
//   1,
//   2,
//   75,
//   6,
//   7,
//   75,
//   6,
//   7,
//   75,
//   6,
//   7,
//   1,
//   2,
//   75,
//   6,
//   7,
//   75,
//   6,
//   7,
//   73,
//   107,
//   103,
//   102,
//   107,
//   6,
//   19,
//   47,
//   17,
//   18,
//   16,
//   15,
//   13,
//   19,
//   14,
//   17,
//   19,
//   16,
//   15,
//   11,
//   9,
//   47,
//   "HEJ!"
// ];

// onClick={this._click}

//state = { count: 0 };

// _click = () => {
//   this.setState({ count: this.state.count + 1 });
// };
