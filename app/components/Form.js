/** @jsx React.DOM */

var React = require('react/addons');

var Form = React.createClass({
    getInitialState: function() {
      return {
        algorithmSelected: false,
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
        var selectAlgorithm = this.state.algorithmSelected ? '' : 'Please select an algorithm';
        var text = this.state.validJson ? '' : 'Incorrect JSON';
        var featureA = this.state.featureAPresent ? '' : 'Please enter a first feature';
        var featureB = this.state.featureBPresent ? '' : 'Please enter a second feature';

        return (
          <form action="/submit" method="post">
            <div className="row">
              <div className="input-field col s12">
               <select name="algorithm">
                 <option value="" disabled selected>Choose Algorithm</option>
                 <option value="1">K Means Clustering</option>
                 <option value="2">K Nearest Neighbours</option>
               </select>
               <label>Algorithm Select</label>
             </div>
           </div>
           <div className="row">
             <div className="input-field col s12">
               <textarea id="textarea1" className="materialize-textarea" name="inputData" onBlur={this.checkJson}></textarea>
               <label for="textarea1">Training Data</label>
             </div>
           </div>
           <div className="row">
             <div className="input-field col s6">
               <input placeholder="" id="featureA" type="text" class="validate" onBlur={this.checkFeatureAEntered}/>
               <label for="first_name">Feature A</label>
             </div>
             <div className="input-field col s6">
               <input placeholder="" id="featureB" type="text" class="validate" onBlur={this.checkFeatureBEntered}/>
               <label for="first_name">Feature B</label>
             </div>
           </div>

           <div className="row">
             <p className="errorMessage">{selectAlgorithm}</p>
             <p className="errorMessage">{text}</p>
             <p className="errorMessage">{featureA}</p>
             <p className="errorMessage">{featureB}</p>
           </div>


           <div className="row">
             { this.state.showSubmitButton ? <input className="btn waves-effect waves-light" type="submit" value="Submit"/> : null }
           </div>
          </form>
        );
      }

  });

/* Module.exports instead of normal dom mounting */
module.exports = Form;
