var ReactApp = React.createClass({
      componentDidMount: function() {
        $(document).ready(function() {
          $('select').material_select();
          $('.modal-trigger').leanModal();
        });
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
    var features = [];
    var parsedData = JSON.parse(data);
    parsedData = parsedData[0];
    for (var key in parsedData) {
      features.push(key);
    }
    var newFeatureA = features[0];
    var newFeatureB = features[1];
    $('#first_feature').text(newFeatureA);
    $('#second_feature').text(newFeatureB);
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
        <div>
          <div className="row">
            <div className="input-field col s12">
              <h4 id="algorithmTitle">
                {this.props.algorithm}
                <span>
                  <a id="help" className="modal-trigger" data-target="helpModal"><i className="small material-icons">info_outline</i></a>
                </span>
              </h4>
            </div>
         </div>
          <form action="/submit" method="post">
          <div className="row selectK">
            <div class="input-field col s12">
              <select id="numberOfNeighbours" name="numberOfNeighbours">
                <option value="0" disabled>Number of neighbours</option>
                <option value="3" selected >3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
              </select>
              <label>Number of clusters</label>
            </div>
          </div>
           <div className="row">
             <div className="input-field col s12">
               <div className="hidden">
                 <input placeholder="" type="text" value={this.props.algorithm} name="algorithm"/>
               </div>
               <textarea id="textarea1" className="materialize-textarea" name="inputData" onKeyUp={this.checkJson}></textarea>
               <label for="textarea1">Training Data</label>
             </div>
           </div>
           <div className="row">
             <div className="input-field col s6">
               <input placeholder="" name="featureA" id="featureA" type="text" class="validate" onKeyUp={this.checkFeatureAEntered}/>
               <label id="first_feature" for="first_name">Feature A</label>
             </div>
             <div className="input-field col s6">
               <input placeholder="" name="featureB" type="text" id="featureB" class="validate" onKeyUp={this.checkFeatureBEntered}/>
               <label id="second_feature" for="first_name">Feature B</label>
             </div>
           </div>

           <div className="row shiftRight errorContainer">
             <p className="errorMessage">{text}</p>
             <p className="errorMessage">{featureA}</p>
             <p className="errorMessage">{featureB}</p>
           </div>

           <div className="row shiftRight">
             { this.state.showSubmitButton ? <input className="btn waves-effect waves-light" type="submit" value="Submit"/> : <a className="btn waves-effect waves-light disabled">Submit</a> }
           </div>
          </form>
        </div>
      );
    }
});

ReactDOM.render(
  <ReactApp algorithm="KNN" />,
  document.getElementById('react-main-mount')
);
