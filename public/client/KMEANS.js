var ReactApp = React.createClass({
      componentDidMount: function () {
        console.log("Mounted!");
      },
      render: function () {
        return (
          <div>
            <Form algorithm={this.props.algorithm}/>
          </div>
        )
      }
  });

var Form = React.createClass({
  getInitialState: function() {
    return {
      validJson: false,
      featureAPresent: false,
      featureBPresent: false,
      showSubmitButton: false
    };
  },
  checkJson: function() {
    var data = $("textarea").val();
    try {
      JSON.parse(data);
      this.setState({validJson : true});
      if ((this.state.featureBPresent == true) && (this.state.featureAPresent == true)) this.setState({showSubmitButton : true});
    } catch (e) {
      this.setState({validJson : false, showSubmitButton: false});
      this.setState({showSubmitButton : false});
    }
  },
  checkFeatureAEntered: function() {
    var data = $("#featureA").val();
    if (!data) {
      this.setState({featureAPresent : false, showSubmitButton: false});
    } else {
      this.setState({featureAPresent : true});
      if ((this.state.featureBPresent == true) && (this.state.validJson == true)) this.setState({showSubmitButton : true});
    }
  },
  checkFeatureBEntered: function() {
    var data = $("#featureB").val();
    if (!data) {
      this.setState({featureBPresent : false, showSubmitButton: false});
    } else {
      this.setState({featureBPresent : true});
      if ((this.state.featureAPresent == true) && (this.state.validJson == true)) this.setState({showSubmitButton : true});
    }
  },
  checkAlgotithmSelected: function() {

  },
  render: function() {
      var text = this.state.validJson ? '' : 'Please enter some data';
      var featureA = this.state.featureAPresent ? '' : 'Please enter a first feature';
      var featureB = this.state.featureBPresent ? '' : 'Please enter a second feature';

      return (
        <form action="/submit" method="post">
          <div className="row">

            <div className="input-field col s12">
              <h4 id="algorithmTitle">
                {this.props.algorithm}
              </h4>
              <h6 id="help">Help</h6>
            </div>

         </div>
         <div className="row">
           <div className="input-field col s12">
             <div className="hidden">
               <input placeholder="" type="text" value={this.props.algorithm} name="algorithm"/>
             </div>
             <textarea id="textarea1" className="materialize-textarea" name="inputData" onBlur={this.checkJson}></textarea>
             <label for="textarea1">Training Data</label>
           </div>
         </div>
         <div className="row">
           <div className="input-field col s6">
             <input placeholder="" name="featureA" id="featureA" type="text" class="validate" onBlur={this.checkFeatureAEntered}/>
             <label for="first_name">Feature A</label>
           </div>
           <div className="input-field col s6">
             <input placeholder="" name="featureB" type="text" id="featureB" class="validate" onBlur={this.checkFeatureBEntered}/>
             <label for="first_name">Feature B</label>
           </div>
         </div>

         <div className="row shiftRight errorContainer">
           <p className="errorMessage">{text}</p>
           <p className="errorMessage">{featureA}</p>
           <p className="errorMessage">{featureB}</p>
         </div>

         <div className="row shiftRight">
           { this.state.showSubmitButton ? <input className="btn waves-effect waves-light" type="submit" value="Submit"/> : null }
         </div>
        </form>
      );
    }
});

ReactDOM.render(
  <ReactApp algorithm="KMEANS" />,
  document.getElementById('react-main-mount')
);
