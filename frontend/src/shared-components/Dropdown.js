import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Dropdown.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class NativeSelects extends React.Component {
  state = {
    data: [],
    value: "",
    name: "hai",
    labelWidth: 0,
    prompt: ""
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      data: this.props.data,
      prompt: this.props.prompt
    });
  }

  handleChange = name => event => {
    this.props.onChange(event.target.value);
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    if (this.props.reset) {
      this.state.value = this.props.prompt;
    }
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          />
          <Select
            native
            value={this.state.value}
            onChange={this.handleChange("value")}
            inputProps={{
              name: "value",
              id: "age-native-simple"
            }}
          >
            <option value="">{this.state.prompt}</option>
            {this.state.data.map(obj => (
              <option value={obj}>{obj}</option>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NativeSelects);
