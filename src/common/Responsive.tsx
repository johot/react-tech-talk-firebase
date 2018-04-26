import * as React from "react";
import MediaQuery from "react-responsive";

interface ResponsiveProps {
  desktopStyle?: any;
  mobileStyle?: any;
  children: (style: any) => JSX.Element;
}

export class Responsive extends React.Component<ResponsiveProps> {
  render() {
    return (
      <MediaQuery query="(max-width: 700px)">
        {matches => {
          const usedStyle = matches ? this.props.mobileStyle : this.props.desktopStyle;
          return this.props.children(usedStyle);
        }}
      </MediaQuery>
    );
  }
}
