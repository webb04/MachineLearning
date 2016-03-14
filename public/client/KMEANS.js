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
      showSubmitButton: false
    };
  },
  checkJson: function() {
    var data = $("textarea").val();
    try {
      JSON.parse(data);
      this.setState({validJson : true});
      this.setState({showSubmitButton : true});
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
  },
  checkAlgotithmSelected: function() {

  },
  render: function() {
      var text = this.state.validJson ? '' : 'Please enter some training data';

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
             <div className="input-field col s12">
               <div className="hidden">
                 <input placeholder="" type="text" value={this.props.algorithm} name="algorithm"/>
               </div>
               <textarea id="textarea1" className="materialize-textarea" name="inputData" onKeyUp={this.checkJson}></textarea>
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
  <ReactApp algorithm="KMEANS" />,
  document.getElementById('react-main-mount')
);
