(function() {
	angular.module("cyberapp.section")
			.controller("SectionController", SectionController);

		SectionController.$inject = ['$scope', '$state', '$rootScope', 'datafactory', 'dataservice', '$sessionStorage', '$localStorage', '$http', 'uiGridConstants'];

		function SectionController($scope, $state, $rootScope, datafactory, dataservice, $sessionStorage, $localStorage, $http, uiGridConstants){
			var sectionCtrl = this;			
			$scope.currentState = $state.current.name;			
			$scope.sectionNumber = $scope.currentState.match(/\d+$/)[0];//filter out non numberic characters ie "section"			
			$scope.firm = datafactory.firm;
			$scope.allsteps = [1,2,3,4,5,6,7,8,9,10,11];

			$scope.section1 = {}; $scope.section2 = {}; $scope.section3a = {}; 	$scope.section3b = {}; $scope.section4 = {}; 	$scope.section5 = {};
			$scope.section6 = {}; $scope.section7a = {};  $scope.section7b = {};  $scope.section7c = {}; $scope.section7d = {}; $scope.section8 = {}; 
			$scope.section9a = {}; $scope.section9b = {}; $scope.section10a = {}; $scope.section10b = {}; $scope.section10c = {}; $scope.section11 = {};

			$scope.yes_no = [{option: 'Yes'}, {option: 'No'}];
			$scope.device_owner = [{option: 'Firm'}, {option: 'Individual'}];
			$scope.levels = [{option: 'High'},{option: 'Medium'},{option: 'Low'}];
			$scope.remediationsteps = [{option: 'Not Started'},{option: 'In Process'},{option: 'Complete'},{option: 'Not Needed'}];
			$scope.sectionLast =  $scope.sectionNumber  == dataservice.getSectionLast();

			//get current section including its sub sections
			var getallsubs = dataservice.getSectionAssocArray($scope.currentState);
			
			

			angular.forEach(getallsubs, function(value, key) {			
				dataservice.asyncData(value).then(function(data){
						$scope[value].data = data;						
						
						//get values from section1 that needs to be prepopulated in other sections
						if($localStorage["section1"] != null)						
						dataservice.getScopeObjectsWithValue($localStorage["section1"].data, $scope[value].data, $scope[value], value);

				});
			});

     		$scope.addNewItem = function(section){
     			angular.forEach(arguments, function(value, key){
     				value.data.push({});	
     			})
		    	
		    	//dataservice.getSamePageScopeValue($scope["section7a"].data, $scope["section7b"].data);
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
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
				}],
	      		onRegisterApi: function(gridApi) {
		       		grid = gridApi.grid;	
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
							//cellTemplate : '<div>{{grid.renderContainers.body.visibleRowCache.indexOf(row)}}</div>'							
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					        headerCellTemplate: longHdrCellTxtTpl
					        
					},
					{	
							field: 'busobjwodatashared',
							displayName: new DisplayObject('Data Required to be output or shared?', 'Can your business objective be met without outputting or sharing the data –identify people or systems that do not require access to the data, and consider isolating the data.'),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'If data is not required to be stored or shared, you should consider removing or isolating the data.'),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					       	headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					}
				],
	      		onRegisterApi: function(gridApi) {
		       		 $scope.gridApi = gridApi;			       			       		 
		      	}
			};

			$scope.section3a = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:55,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
							field: 'nameof3rdparty',
							displayName:'Name of Third Party Organization'
					},
					{	
							field: 'piidatatransmit',
							displayName:new DisplayObject('PII or Firm Sensitive Data Transmitted', 'You can list data at a group level such as Customer Account Information, or at the granular level such as social security number, customer name, date of birth etc.'),
							headerCellTemplate: longHdrCellTxtTpl
					},
					{
							field:'risklevel',
							displayName: new DisplayObject('Risk Severity', 'Assign a risk severity classification to the data transmitted (low, medium or high).'),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.levels,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: '3rdpartyaccessneed',
							displayName: new DisplayObject('Does third party require data?', 'assess whether the third party requires the information it can access for a business purpose.'),
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					         headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'assess3rdparty',
							displayName: new DisplayObject('Third Party Security', 'assess the security of the third party’s systems'),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					         headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'ctrlstoisolate',
							displayName: new DisplayObject('Isolate critical assets', 'assess if the third party access to information is limited to information it requires for business reasons'),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					         headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'consider the risk severity level and your resources and make a risk assessment of whether any remediation is necessary'),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					         headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					}
				],
		      	onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};


			$scope.section3b = { 
				enableCellEditOnFocus: true, 
				enableSorting: false,
				rowHeight:92,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				columnDefs:[{
					 	field: 'activityaddress',
						displayName: '',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'malwareprotection',
							displayName: 'Malware/Anti-virus Protection',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'otherprotection',
							displayName: 'Other Protection'
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'conduct a risk assessment of the strength of the protections considered with the assigned risk severity level '),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'conduct a risk assessment of the strength of the protections considered with the assigned risk severity level '),
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					        headerCellTemplate: longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.levels,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'passwordprotection',
							displayName: 'Password Protection',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'malwareprotection',
							displayName: 'Malware/Anti-virus/Firewalls',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'scheduledbackups',
							displayName: 'Regularly Scheduled Backups',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: new DisplayObject('Remediate', 'conduct a risk assessment of the strength of the protections considered with the assigned risk of the system being inaccessible'),
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option',
					        headerCellTemplate:longHdrCellTxtTpl
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
			      	{
						field: 'dataencrypedtoint',
						displayName: new DisplayObject('Encrypted internally', 'Is it Encrypted when Shared Internally and at Rest within the System?'),
						headerCellTemplate:longHdrCellTxtTpl,
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
			        {
						field: 'dataencrypedtobkup',
						displayName:new DisplayObject('Encrypted at Backup', ' Is it Encrypted when Archived to Backup Media (e.g., tapes)'),
						headerCellTemplate:longHdrCellTxtTpl,
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'datamasked',
						displayName:new DisplayObject('Data masked when displayed?', 'Data such as social security numbers can be masked whenever displayed to a person accessing that data.'),
						headerCellTemplate:longHdrCellTxtTpl,
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},			      
					{	
						field: 'needtoremediate',
						displayName:new DisplayObject('Remediate', 'Consider Risk severity of data and resources and decide whether to encrypt or mask data.'),
						headerCellTemplate:longHdrCellTxtTpl,
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}
			


			$scope.nameemployee = function(){
				return $scope.section7a.data[0].nameemployee;
			}

			$scope.devicetype = function(){
				return $scope.section7a.data[0].devicetype;
			}

			$scope.deviceowner = function(){
				return $scope.section7a.data[0].deviceowner;
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
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.device_owner,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
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
						displayName: 'Device Type' 
					},
					{
						field:'nameemployee',
						displayName: 'Employee'
					},
					{
						field:'deviceowner',
						displayName:new DisplayObject('Device Owner', 'Does the Firm or Individual own the device?'),
						headerCellTemplate:longHdrCellTxtTpl
					},
					{
						field: 'accesstopii',
						displayName: 'Access to PII and Firm Sensitive Data?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'risklevel',
						displayName: 'Risk Severity Level',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'protected',
						displayName: 'Protected?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option' 
					},
					{	
						field: 'needtoremediate',
						displayName:new DisplayObject('Remediate', 'Consider the risk severity level of the PPI accessible to the devices, and make a risk assessment if you take remedial steps.'),
						headerCellTemplate:longHdrCellTxtTpl,
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'remediatesteps',
							displayName: 'Remediation Steps'
					},
					{	
							field: 'remediatestatus',
							displayName: 'Remediation Status',
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.remediationsteps,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'assettested',
						displayName:'Asset Tested?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
			      	{
						field: 'problemsidentified',
						displayName:'Problems / Vulnerabilities Identified?'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
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
						displayName:'Detect System'
					},
				    {
						field: 'yes_no',
						displayName:'Yes/No',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'risklevel',
						displayName:'Risk Severity Level',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section9b = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:135,
				columnDefs:[
					{
						field: 'idscontrols',
						displayName:'IDS Controls'
					},
				    {
						field: 'yes_no',
						displayName:'Yes/No',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section10a = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:92,
				columnDefs:[
					{
						field: 'incident',
						displayName:'Incident'
					},					
					{
						field: 'risklevel',
						displayName:'Risk Severity Level',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
				    {
						field: 'responseplan',
						displayName:'Response Plan in Place',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section10b = {
				enableCellEditOnFocus: true, 
				enableSorting: false,
				enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
        		enableVerticalScrollbar   : uiGridConstants.scrollbars.NEVER,
				rowHeight:55,
				columnDefs:[
					{
						field: 'incident',
						displayName:'Incident'
					},					
					{
						field: 'customers',
						displayName:'Customers',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
				    {
						field: 'regulators',
						displayName:'Regulators',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'lawenforcement',
						displayName: 'Law Enforcement',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'industry',
						displayName: 'Industry',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'thirdpartyinfoorg',
						displayName: 'Third Party Information Sharing Organizations',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
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
							editType: 'dropdown',
							enableCellEditOnFocus:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
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
						field: 'asset',
						displayName:'Asset',
						enableCellEdit:false
					},
				    {
						field: 'yes_no',
						displayName:'Yes/No',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'risklevel',
						displayName: 'Risk Severity Level',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'remediatesteps',
						displayName: 'Remediation Steps'
					},
					{	
						field: 'remediatestatus',
						displayName: 'Remediation Status',
						editType: 'dropdown',
						enableCellEditOnFocus:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}
		    
	      	
		}
})()
