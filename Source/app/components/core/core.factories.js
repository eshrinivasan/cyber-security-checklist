(function() {
    angular.module('cyberapp.core')
    		.factory('datafactory', datafactory);

    datafactory.inject = ['$rootScope', '$http'];

    function datafactory($rootScope, $http){
      var datafactory = { };

    	datafactory.questions = [
			   {id: 1, text: '1) Do you store, use or transmit personally identifiable information (e.g. social security numbers or date of birth) (PII) or firm sensitive information (e.g. financial records) electronically?', section:"1,2,4,6,8,9,10", answer:[1,2,4,6,8,9,10]},
		     {id: 2, text: '2)	Do you transmit PII or firm sensitive information to a third party, or otherwise allow access to your PII or firms sensitive information by a third party?', section:"3", answer:[3]},
		     {id: 3, text: '3)	Do your employees (or independent contractors) maintain devices that access PII or firm sensitive information? ', section:"7",answer:[7]},
		     {id: 4, text: '4)	Do you have assets that if lost or made inoperable would impact your firm’s operations (e.g., trading or order management systems)?', section:"5",answer:[5]},
			   {id: 5, text: '5)	If your systems, PII or firm sensitive information were made inoperable or stolen, would you need to recover them to conduct business?', section:"11",answer:[11]}
		  ];

      datafactory.firm = {
        firmname: "",
        rep: "",
        lastupdated : "",
        keyrep : ""
      }      
     

      return datafactory;
    }
})();
