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
      // if ((this.state.featureBPresent == true) && (this.state.featureAPresent == true))this.setState({showSubmitButton : true});
      this.setState({showSubmitButton : true});
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

         <div className="row">

           <div className="row">
             <div className="input-field col s12">
               <input placeholder="" name="title" id="title" type="text" class="validate" />
               <label id="title"  for="Title">Title</label>
             </div>
           </div>

           <div className="input-field col s12">
             <div className="hidden">
               <input placeholder="" type="text" value={this.props.algorithm} name="algorithm"/>
             </div>
             <textarea id="textarea1" placeholder="" className="materialize-textarea" name="inputData" onkeyup={this.checkJson}></textarea>
             <label for="textarea1">Training Data</label>
           </div>
         </div>

         <div className="row shiftRight errorContainer">
           <p className="errorMessage">{text}</p>
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
  <ReactApp algorithm="OLS" />,
  document.getElementById('react-main-mount')
);
