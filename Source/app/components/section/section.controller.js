(function() {
	angular.module("cyberapp.section")
			.controller("SectionController", SectionController);

		SectionController.$inject = ['$scope', '$state', '$q', '$interval', '$rootScope', 'datafactory', 'dataservice', '$sessionStorage', '$localStorage', '$http', 'uiGridConstants'];

		function SectionController($scope, $state, $q, $interval, $rootScope, datafactory, dataservice, $sessionStorage, $localStorage, $http, uiGridConstants){
			var sectionCtrl = this;
			var total = dataservice.getSections();
			$scope.goToState = 'section.'+total[0];	
			$state.go($scope.goToState);				
					
			$scope.firm = datafactory.firm;
			$scope.allsteps = [1,2,3,4,5,6,7,8,9,10,11];
			$scope.section1 = {}; $scope.section2 = {}; $scope.section3a = {}; 	$scope.section3b = {}; $scope.section4 = {}; 	$scope.section5 = {};
			$scope.section6 = {}; $scope.section7a = {};  $scope.section7b = {};  $scope.section7c = {}; $scope.section7d = {}; $scope.section8 = {}; 
			$scope.section9a = {}; $scope.section9b = {}; $scope.section10a = {}; $scope.section10b = {}; $scope.section10c = {}; $scope.section11 = {};
		
			$scope.yes_no = ['Yes', 'No'];
			$scope.device_owner = ['Firm', 'Individual'];		
			$scope.levels = ['High', 'Medium','Low'];
			$scope.remediationsteps = ['Not Started', 'In Process', 'Complete', 'Not Needed'];
	
			//get current section including its sub sections
			var getallsubs = dataservice.getJsonStore();	

			angular.forEach(getallsubs, function(value, key) {	
				dataservice.asyncData(value).then(function(data){
					$scope[key].data = data;
				});
			});

			//No Previous button on the first section
			$scope.sectionFirst =  total[0]  == dataservice.getSectionFirst();
			
			$scope.compareObjects = function (destObj, srcObj){
				if(destObj === srcObj)	//if both objects are truly equal, skip copying
				return;

				while(destObj.length != srcObj.length){
                    destObj.push({});
            	}

            	for(var i= 0; i< srcObj.length; i++){ 	//copying section1 values
                     for( var prop in srcObj[i] ){		//copying only matching object properties
                        destObj[i][prop] = srcObj[i][prop];                        
                     }
                }
			}
		
			$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options){ 					
				if(toState.parent != "section") return;
		 		var currState = toState.name.replace(".","");
		 		//if(!angular.isUndefined(toState.name) && toState.name.match(/\d+$/) != null)
				var sectionNumber = toState.name.match(/\d+$/)[0];//filter out non numberic characters ie "section"
				$scope.sectionFirst =  sectionNumber  == dataservice.getSectionFirst();
                //Finish button on the Last section
	           	$scope.sectionLast = sectionNumber  == dataservice.getSectionLast();

				var srcObj = $scope['section1'].data;
				var prepopulateArr = ['section1', 'section2', 'section4a', 'section6']; //Ideally this shouldnt exist

				var sectosavearr = dataservice.getSectionAssocArray(currState); //Pull all sections with subsections
                if(sectosavearr.length > 1){									//If more subsections, loop over each sub
                    angular.forEach(sectosavearr, function(key, value){
                    	var destObj = $scope[key].data;
                    	if(prepopulateArr.indexOf(key) > -1){//find scopes that needs to increase length
                    		$scope.compareObjects(destObj, srcObj);
                    	}
                    	
	                    $localStorage[key] = $scope[key]; //storing in local storage
                    });
                }else{															//If section contains only one section
                        var destObj = $scope[currState].data;
                        if(prepopulateArr.indexOf(currState) > -1){
                    		$scope.compareObjects(destObj, srcObj);
	                    } 

	                    $localStorage[currState] = $scope[currState]; //storing in local storage             
                }				   
		     });

     		$scope.addNewItem = function(sections){
     			angular.forEach(arguments, function(value, key){
     				value.data.push({});
     				$scope.gridApi.cellNav.scrollToFocus( value.data[1]);		
     			});


		    };
		  
			$scope.getTableHeight = function(section) {
		       var headerHeight = 110; // your header height
		       var calculatedHeight = (section.data.length * section.rowHeight + headerHeight) + "px";			       			       
		       return {
		          height: calculatedHeight
		       };
			};	

			$scope.section1 = { 
				enableCellEditOnFocus: true,
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
						field: 'piidata',
						displayName:'PII or Firm Sensitive Data'
						
				},
				{	
						field: 'location',
						displayName: 'Location'
				},
				{
						field:'risklevel',
						displayName: 'Risk Severity Level',
						cellTemplate: 'components/section/templates/dropdown.html',
						editDropdownOptionsArray:$scope.levels,
						enableCellEditOnFocus: false
				}],
	      		onRegisterApi: function(gridApi) {
		       		$scope.gridApi = gridApi;
			    }
			};

			function DisplayObject(name, tooltip) {
		    	// this refers to the new instance
			    this.name = name;
			    this.tooltip = tooltip;
			}

			var longHdrCellTxtTpl = '<div class="grid-tooltip" tooltip="{{ col.displayName.tooltip}}" tooltip-placement="top" tooltip-append-to-body="true">'
  +'<div class="ui-grid-cell-contents">{{ col.displayName.name }}</div></div>';
			
			$scope.section2 = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[
					{
							field: 'piidata',
							displayName:'PII or Firm Sensitive Data'						
					},
					{	
							field: 'location',
							displayName:'Location'
					},
					{
							field:'risklevel',
							displayName: 'Risk Severity Level'
					},
					{	
							field: 'busobjwodata',
							displayName:  new DisplayObject('Data Required?', 'Can your business objective be met without storing the PII or firm sensitive information?'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false, 
					        editDropdownOptionsArray: $scope.yes_no,					      
					        headerCellTemplate: longHdrCellTxtTpl
					        
					},
					{	
							field: 'busobjwodatashared',
							displayName: new DisplayObject('Data Required to be output or shared?', 'Can your business objective be met without outputting or sharing the data –identify people or systems that do not require access to the data, and consider isolating the data.'),
							cellTemplate: 'components/section/templates/dropdown.html',
							enableCellEditOnFocus: false, 	
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'If data is not required to be stored or shared, you should consider removing or isolating the data.'),
							cellTemplate: 'components/section/templates/dropdown.html',
							enableCellEditOnFocus: false, 	
					        editDropdownOptionsArray: $scope.yes_no,
					       	headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',
							enableCellEditOnFocus: false, 								
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
	      		onRegisterApi: function(gridApi) {
		       		 $scope.gridApi = gridApi;			       			       		 
		      	}
			};

			$scope.section3a = { 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
							field: 'nameof3rdparty',
							displayName:'Name of Third Party Organization',							
							enableCellEditOnFocus: true
					},
					{	
							field: 'piidatatransmit',
							displayName:new DisplayObject('PII or Firm Sensitive Data Transmitted', 'You can list data at a group level such as Customer Account Information, or at the granular level such as social security number, customer name, date of birth etc.'),
							headerCellTemplate: longHdrCellTxtTpl,
							enableCellEditOnFocus: true
					},
					{
							field:'risklevel',
							displayName: new DisplayObject('Risk Severity', 'Assign a risk severity classification to the data transmitted (low, medium or high).'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false, 
					        editDropdownOptionsArray: $scope.levels,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'partyaccessneed',
							displayName: new DisplayObject('Does third party require data?', 'assess whether the third party requires the information it can access for a business purpose.'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'assess3rdparty',
							displayName: new DisplayObject('Third Party Security', 'assess the security of the third party’s systems'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'ctrlstoisolate',
							displayName: new DisplayObject('Isolate critical assets', 'assess if the third party access to information is limited to information it requires for business reasons'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'needsremediate',
							displayName: new DisplayObject('Remediate', 'consider the risk severity level and your resources and make a risk assessment of whether any remediation is necessary'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps',
							enableCellEditOnFocus: true
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};


			$scope.section3b = { 				
				enableSorting: false,
				rowHeight:92,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
					 	field: 'activityaddress',
						displayName: 'Activity',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps',
							enableCellEditOnFocus: true
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};

			$scope.section3c = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:92,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
					 	field: 'contractaddress',
						displayName: 'Contract',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,							
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps',
							enableCellEditOnFocus: true
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEdit:false,						
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};

			$scope.section4a = { 
				enableCellEditOnFocus: true,
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
							field: 'piidata',
							displayName:'PII or Firm Sensitive Data'
					},
					{	
							field: 'location',
							displayName: 'Location'
					},
					{	
							field: 'risklevel',
							displayName: new DisplayObject('Risk Severity', 'Assign a risk severity classification to the data transmitted (low, medium or high).'),
							headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'passwordprotection',
							displayName: 'Password Protection',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'malwareprotection',
							displayName: 'Malware/Anti-virus Protection',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'otherprotection',
							displayName: 'Other Protection'
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'conduct a risk assessment of the strength of the protections considered with the assigned risk severity level '),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			    }

			};

			$scope.section4b = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
					 	field: 'passwordpolicy',
						displayName: '',
						enableCellEdit:false },
					{
							field: 'yes_no',
							displayName:'Yes/No',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'conduct a risk assessment of the strength of the protections considered with the assigned risk severity level '),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};


			$scope.section5 = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
							field: 'systems',
							displayName:'Systems'
					},					
					{	
							field: 'risklevel',
							displayName: 'Risk to Firm if system is inoperable',	
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.levels
					},
					{	
							field: 'passwordprotection',
							displayName: 'Password Protection',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'malwareprotection',
							displayName: 'Malware/Anti-virus/Firewalls',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'scheduledbackups',
							displayName: 'Regularly Scheduled Backups',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'conduct a risk assessment of the strength of the protections considered with the assigned risk of the system being inaccessible'),
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no,
					        headerCellTemplate:longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			    }

			};

			$scope.section6 = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
						field: 'piidata',
						displayName:'PII or Firm Sensitive Data'
					},
					{
						field: 'location',
						displayName:'Location'
					},
				    {
						field: 'risklevel',
						displayName:'Risk Severity Level'
					},
					{
						field: 'dataencrypedtoext',
						displayName: new DisplayObject('Encrypted in transit', 'Is it Encrypted  in Transit to External Sources (e.g., email  to non-firm addresses)'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
			      	{
						field: 'dataencrypedtoint',
						displayName: new DisplayObject('Encrypted internally', 'Is it Encrypted when Shared Internally and at Rest within the System?'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
			        {
						field: 'dataencrypedtobkup',
						displayName:new DisplayObject('Encrypted at Backup', ' Is it Encrypted when Archived to Backup Media (e.g., tapes)'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{
						field: 'datamasked',
						displayName:new DisplayObject('Data masked when displayed?', 'Data such as social security numbers can be masked whenever displayed to a person accessing that data.'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},			      
					{	
						field: 'needtoremediate',
						displayName:new DisplayObject('Remediate', 'Consider Risk severity of data and resources and decide whether to encrypt or mask data.'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}
			    ]
			}
			
			$scope.nameemployee = function(rowIndex){
				return $scope.section7a.data[rowIndex].nameemployee;
			}

			$scope.devicetype = function(rowIndex){
				return $scope.section7a.data[rowIndex].devicetype;
			}

			$scope.deviceowner = function(rowIndex){
				return $scope.section7a.data[rowIndex].deviceowner;
			}


			$scope.section7a = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[
					{
						field:'nameemployee',
						displayName: 'Name of Employee/IC'						        
					},
					{
						field:'devicetype',
						displayName: 'Device Type' 
					},
					{
						field:'deviceowner',
						displayName:new DisplayObject('Device Owner', 'Does the Firm or Individual own the device?'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.device_owner
					}
				]
			}

			$scope.section7b = {
				enableCellEditOnFocus: true,
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[					
					{
						field:'devicetype',
						displayName: 'Device Type',
						cellTemplate: '<div>{{ grid.appScope.devicetype(grid.renderContainers.body.visibleRowCache.indexOf(row)) }}</div>'
					},
					{
						field:'nameemployee',
						displayName: 'Employee',
						cellTemplate: '<div>{{ grid.appScope.nameemployee(grid.renderContainers.body.visibleRowCache.indexOf(row)) }}</div>'
					},
					{
						field:'deviceowner',
						displayName:new DisplayObject('Device Owner', 'Does the Firm or Individual own the device?'),
						cellTemplate: '<div>{{ grid.appScope.deviceowner(grid.renderContainers.body.visibleRowCache.indexOf(row)) }}</div>',
						headerCellTemplate:longHdrCellTxtTpl
					},
					{
						field: 'accesstopii',
						displayName: 'Access to PII and Firm Sensitive Data?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{
						field: 'risklevel',
						displayName: 'Risk Severity Level',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.levels
					},
					{
						field: 'protected',
						displayName: 'Protected?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'needtoremediate',
						displayName:new DisplayObject('Remediate', 'Consider the risk severity level of the PPI accessible to the devices, and make a risk assessment if you take remedial steps.'),
						headerCellTemplate:longHdrCellTxtTpl,
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}

				]
			}

			$scope.section7c = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:92,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
					 	field: 'controls',
						displayName: 'Controls',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.remediationsteps
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }
			};

			$scope.section7d = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:55,
				columnDefs:[{
					 	field: 'stafftraining',
						displayName: 'Staff training',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};

			$scope.section8 = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:55,
				columnDefs:[
					{
						field: 'techasset',
						displayName:'Technology Asset tested'
					},
				    {
						field: 'risklevel',
						displayName:'Risk Severity Level',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.levels
					},
					{
						field: 'assettested',
						displayName:'Asset Tested?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
			      	{
						field: 'problemsidentified',
						displayName:'Problems / Vulnerabilities Identified?'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}
			    ]
			}

			$scope.section9a = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:92,
				columnDefs:[
					{
						field: 'detectsystem',
						displayName:'Detect System',
						enableCellEdit: false
					},
				    {
						field: 'yes_no',
						displayName:'Yes/No',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{
						field: 'risklevel',
						displayName:'Risk Severity Level',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.levels
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}
			    ]
			}

			$scope.section9b = {
				enableCellEditOnFocus: false, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:135,
				columnDefs:[
					{
						field: 'idscontrols',
						displayName:'IDS Controls',
						enableCellEdit: false
					},
				    {
						field: 'yes_no',
						displayName:'Yes/No',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps',
						enableCellEditOnFocus: true
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}
			    ]
			}

			$scope.section10a = {
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:92,
				columnDefs:[
					{
						field: 'incident',
						displayName:'Incident',
						enableCellEdit:false
					},					
					{
						field: 'risklevel',
						displayName:'Risk Severity Level',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.levels
					},
				    {
						field: 'responseplan',
						displayName:'Response Plan in Place',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}
			    ]
			}

			$scope.section10b = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:92,
				columnDefs:[
					{
						field: 'incident',
						displayName:'Incident',
						enableCellEdit:false
					},					
					{
						field: 'customers',
						displayName:'Customers',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
				    {
						field: 'regulators',
						displayName:'Regulators',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'lawenforcement',
						displayName: 'Law Enforcement',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'industry',
						displayName: 'Industry',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'thirdpartyinfoorg',
						displayName: 'Third Party Information Sharing Organizations',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					}
			    ]
			}

			$scope.section10c = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:75,
				columnDefs:[{
					 	field: 'activity',
						displayName: 'Activity/Governance',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							cellTemplate: 'components/section/templates/dropdown.html',						
							enableCellEditOnFocus: false,	
					        editDropdownOptionsArray: $scope.yes_no
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};

			$scope.section11 = {
				enableCellEditOnFocus: true,
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:140,
				columnDefs:[
					{
						field: 'controls',
						displayName:'Controls',
						enableCellEdit:false,
						width:350
					},
				    {
						field: 'yes_no',
						displayName:'Yes/No',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'risklevel',
						displayName: 'Risk Severity Level',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.levels
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.yes_no
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						cellTemplate: 'components/section/templates/dropdown.html',						
						enableCellEditOnFocus: false,	
				        editDropdownOptionsArray: $scope.remediationsteps
					}
			    ]
			}     	
		}
})()
