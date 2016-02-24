(function() {
	angular.module("cyberapp.section")
			.controller("SectionController", SectionController);

		SectionController.$inject = ['$scope', '$state' , '$rootScope', 'datafactory', 'dataservice', '$sessionStorage', '$http'];

		function SectionController($scope, $state, $rootScope, datafactory, dataservice, $sessionStorage, $http){
			var sectionCtrl = this;
			$scope.currentState = $state.current.name;			
			$scope.sectionNumber = $scope.currentState.match(/\d+$/)[0];//filter out non numberic characters ie "section"
			$scope.total = dataservice.getSections();
			$scope.firm = datafactory.firm;
			$scope.allsteps = [1,2,3,4,5,6,7,8,9,10,11];	
			$scope.globalrows = [];
			$scope.sessionStorage = $sessionStorage;

			$scope.section1 = {}; $scope.section2 = {}; $scope.section3a = {}; 	$scope.section3b = {}; $scope.section4 = {}; 	$scope.section5 = {};
			$scope.section6 = {}; $scope.section7a = {};  $scope.section7b = {};  $scope.section7c = {}; $scope.section7d = {}; $scope.section8 = {}; 
			$scope.section9a = {}; $scope.section9b = {}; $scope.section10a = {}; $scope.section10b = {}; $scope.section10c = {}; $scope.section11 = {};

			$scope.yes_no = [{option: 'Yes'}, {option: 'No'}];
			$scope.device_owner = [{option: 'Firm'}, {option: 'Individual'}];
			$scope.levels = [{option: 'High'},{option: 'Medium'},{option: 'Low'}];
			$scope.remediationsteps = [{option: 'Not Started'},{option: 'In Process'},{option: 'Complete'},{option: 'Not Needed'}];


         	$scope.jsonstore = dataservice.getJsonStore();
         	//console.log($scope.jsonstore);

			//Loop through section json objects that represent the row data to be supplied to ui-grid
     		angular.forEach($scope.jsonstore, function(value, key) {
     			$http.get(value).success(function(response){     				
					$scope[key].data = response;
     			})			
			});     


			$scope.section1 = { 
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}],
		      		onRegisterApi: function(gridApi) {
			       		 grid = gridApi.grid;
			      }

			};

			$scope.section2 = { 
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
							field: 'piidata',
							displayName:'PII or Firm Sensitive Data'
					},
					{	
							field: 'location',
							displayName:'Location'
					},
					{
							field:'risklevel',
							displayName: 'Risk Severity Level',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.levels,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'busobjwodata',
							displayName: 'Business Objective can be met without data?',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'busobjwodatashared',
							displayName: 'Business Objective can be met without data being output or shared internally? ',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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


			$scope.section3a = { 
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
							field: 'nameof3rdparty',
							displayName:'Name of Third Party Organization'
					},
					{	
							field: 'piidatatransmit',
							displayName:'PII or Firm Sensitive Data Transmitted to Third Party Organization '
					},
					{
							field:'risklevel',
							displayName: 'Risk Severity Level',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.levels,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: '3rdpartyaccessneed',
							displayName: 'Is it Necessary for the Third Party Organization to Access the Data Transmitted?',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'assess3rdparty',
							displayName: 'Have you Assessed the Third Party Organization to Ensure that it has Effective Security Practices?',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'ctrlstoisolate',
							displayName: 'Are there Controls in Place to Isolate this Third Party Connection from your Critical Assets?',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
					 	field: 'activityaddress',
						displayName: '',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
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
							displayName: 'Risk Severity Level',	
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.levels,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'passwordprotection',
							displayName: 'Password Protection',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'malwareprotection',
							displayName: 'Malware/Anti-virus Protection',
							editType: 'dropdown',
							enableCellEdit:true,
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
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
					 	field: 'passwordpolicy',
						displayName: '',
						enableCellEdit:false
					}
					,{
							field: 'yes_no',
							displayName:'Yes/No',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
							field: 'systems',
							displayName:'Systems'
					},					
					{	
							field: 'risklevel',
							displayName: 'Risk to Firm if system is inoperable',	
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.levels,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'passwordprotection',
							displayName: 'Password Protection',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'malwareprotection',
							displayName: 'Malware/Anti-virus/Firewalls',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'scheduledbackups',
							displayName: 'Regularly Scheduled Backups',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
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
						displayName:'Is Data Encrypted  in Transit to External Sources?',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
			      	{
						field: 'dataencrypedtoint',
						displayName:'Is Data Encrypted when Shared Internally and at Rest within the System?',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
			        {
						field: 'dataencrypedtobkup',
						displayName:'Is Data Encrypted when archived to backup media?',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'datamasked',
						displayName:'Has Data been Masked when Displayed?',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},			      
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}
			
			$scope.section7a = {
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
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
						displayName: 'Device Owner'
					}
				]
			}

			$scope.section7b = {
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
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
						displayName: 'Device Owner'
					},
					{
						field: 'accesstopii',
						displayName: 'Access to PII and Firm Sensitive Data?',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'risklevel',
						displayName: 'Risk Severity Level',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'protected',
						displayName: 'Protected?' 
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}

				]
			}

			$scope.section7c = { 
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
					 	field: 'controls',
						displayName: 'Controls',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							editType: 'dropdown',
							enableCellEdit:true,
							editableCellTemplate: 'ui-grid/dropdownEditor',
					        editDropdownOptionsArray: $scope.yes_no,
					        editDropdownIdLabel: 'option',
					        editDropdownValueLabel: 'option'
					},
					{	
							field: 'needtoremediate',
							displayName: 'Do you need to Remediate?',
							editType: 'dropdown',
							enableCellEdit:true,
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
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
					 	field: 'stafftraining',
						displayName: '',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							editType: 'dropdown',
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[
					{
						field: 'techasset',
						displayName:'Technology Asset'
					},
				    {
						field: 'risklevel',
						displayName:'Risk Severity Level',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'assettested',
						displayName:'Asset Tested?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section9a = {
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[
					{
						field: 'detectsystem',
						displayName:'Detect System'
					},
				    {
						field: 'yes_no',
						displayName:'',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{
						field: 'risklevel',
						displayName:'Risk Severity Level',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section9b = {
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[
					{
						field: 'idscontrols',
						displayName:'IDS Controls'
					},
				    {
						field: 'yes_no',
						displayName:'',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section10a = {
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[
					{
						field: 'incident',
						displayName:'Incident'
					},					
					{
						field: 'risklevel',
						displayName:'Risk Severity Level',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
				    {
						field: 'responseplan',
						displayName:'Response Plan in Place',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section10b = {
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[
					{
						field: 'incident',
						displayName:'Incident'
					},					
					{
						field: 'customers',
						displayName:'Customers',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
				    {
						field: 'regulators',
						displayName:'Regulators',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'lawenforcement',
						displayName: 'Law Enforcement',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'industry',
						displayName: 'Industry',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'thirdpartyinfoorg',
						displayName: 'Third Party Information Sharing Organizations',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

			$scope.section10c = { 
				enableCellEditOnFocus: true, 
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[{
					 	field: 'activity',
						displayName: 'Activity/Governance',
						enableCellEdit:false
					},
					{
							field: 'yes_no',
							displayName:'Yes/No',
							editType: 'dropdown',
							enableCellEdit:true,
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
				enableCellEdit:true, 
				enableSorting: false,
				columnDefs:[
					{
						field: 'controls',
						displayName:'Controls',
						enableCellEdit:false
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.yes_no,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'risklevel',
						displayName: 'Risk Severity Level',
						editType: 'dropdown',
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.levels,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					},
					{	
						field: 'needtoremediate',
						displayName: 'Do you need to Remediate?',
						editType: 'dropdown',
						enableCellEdit:true,
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
						enableCellEdit:true,
						editableCellTemplate: 'ui-grid/dropdownEditor',
				        editDropdownOptionsArray: $scope.remediationsteps,
				        editDropdownIdLabel: 'option',
				        editDropdownValueLabel: 'option'
					}
			    ]
			}

		    $scope.addNewItem = function(section){
		    	section.data.push({});
		    };
			
			
			$scope.printDiv = function(divName) {
			  var printContents = document.getElementById(divName).innerHTML;
			  var popupWin = window.open('', '_blank', 'width=500,height=500');
			  popupWin.document.open();
			  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/min/compiled-styles.min.css" /><link rel="stylesheet" type="text/css" href="assets/css/min/widget-styles.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
			  popupWin.document.close();
			}

		}
})()
