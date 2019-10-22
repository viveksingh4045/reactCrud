const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let INC = new Schema({
  INC_Subject: {
    type: String
  },
  INC_Description: {
    type: String
  },
   INC_RaisedOn: {
    type: Date
  }, 
  INC_ImpactedApplications: {
    type: String
  },

  INC_Type: {
    type: String
  },
  INC_Priority: {
    type: String
  },
  INC_Status: {
    type: String
  },
  INC_AssignedTo: {
    type: String
},
INC_ResolverGroup: {
  type: String
},
INC_RouteCause: {
  type: String
}
});
module.exports = mongoose.model('INC_Details_MGMT_Trial', INC);