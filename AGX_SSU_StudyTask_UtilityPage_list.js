/**
 * Module Description
 * 
 * Version Date Author Remarks 1.00 20 Nov 2014 AlexanderHS
 * 
 */

var GREETING = 'Click button to roll down the pricing of the Master Pricing to the Study Specific Pricing records';

/**
 * Starting Point Function
 */

var lmregularfields = [];
var lmrecordfields = {
	'custpage_batchid_line': 'custevent_study_task_batch_id',
	'custpage_purpose_line': 'custevent_purpose',
	'custpage_billable_quantity_line': 'custevent_itemquantity',
	'custpage_dateperformed_line': 'custevent_study_task_performed_date',
	'custpage_task_type_linemanager_line': 'custevent_study_task_line_mgr_approved',
	'custpage_pf_line': 'custevent_pass_fail',
	'custpage_freason_line': 'custevent_study_task_reason',
	'custpage_other_line': 'custevent_other_reason_description',
	'custpage_task_type_nonbillable_line': 'custevent_study_task_nonbillable',
	'custpage_notes_line': 'custevent_comments'
};


var filterFields = ['custpage_customer',
                  'custpage_serviceline',
                  'custpage_study', 'custpage_fromdate', 'custpage_todate', 'custpage_lmapproved', 'custpage_invoiced', 
                  'custpage_pi', 'custpage_financestatus', 'custpage_view', 'custpage_studyparameter', 'custpage_index','custpage_revrecfromdate','custpage_revrectodate'];

var regularfields = [];


var regularinfields = [];

var financerecordfields = {
	'custpage_study_task_rev_rec_date_line': 'custevent_study_task_rev_rec_date',
	'custpage_rev_rec_approved_line': 'custevent_rev_rec_approved',
	'custpage_study_task_finance_status_line': 'custevent_study_task_finance_status',
	'custpage_study_task_invoice_notes_line': 'custevent_study_task_invoice_notes',
	'custpage_itemdescription_line': 'custevent_study_task_item_description',
	'custpage_itempricing_line': 'custevent_itempricing',
	'custpage_po_line': 'custevent_po_number',
	'custpage_task_type_linemanager_line': 'custevent_study_task_line_mgr_approved',
	'custpage_task_type_nonbillable_line': 'custevent_study_task_nonbillable'
};

var recordLMFields = {
	'internalid': 'custpage_internalid_line',
	'internalid': 'custpage_internalid2_line',
	'custentity_master_study': 'custpage_masterstudyid_line',
	'custevent_study_task_client': 'custpage_customer_line',
	'company': 'custpage_company_line',
	'custevent_study_task_service_line': 'custpage_serviceline_line',
	'title': 'custpage_study_line',
	'custevent_study_task_batch_id': 'custpage_batchid_line',
	'custevent_study_task_compound': 'custpage_associatedcompoundinline_line',
	'custevent_purpose': 'custpage_purpose_line',
	'custevent_comments': 'custpage_notes_line',
	'custevent_study_task_item_description': 'custpage_itemdescription_line',
	'custevent_itemquantity': 'custpage_billable_quantity_line',
	'custevent_pass_fail': 'custpage_pf_line',
	'custevent_study_task_nonbillable': 'custpage_task_type_nonbillable_line',
	'custevent_study_task_performed_date': 'custpage_dateperformed_line',
	'custevent_study_task_line_mgr_approved': 'custpage_task_type_linemanager_line',
	'custevent_itemname': 'custpage_itemname_line',
	'custevent_itempricing': 'custpage_itempricing_line',
	'custevent_study_task_sales_unit_type': 'custpage_salesunit_line',
	'custevent_item_unit_price': 'custpage_itemunitprice_line',
	'custevent_ss_unit_description': 'custpage_salesunitdescription_line',
	'custevent_study_task_priced_from_quote': 'custpage_pricefromquote_line',
	'custevent_study_task_reason': ' custpage_freason_line',
	'custevent_other_reason_description': 'custpage_other_line',
	'company': 'custpage_company_line2',
	'custevent_study_task_rev_rec_date': 'custpage_study_task_rev_rec_date_line'


};

var columnFields = ['internalid',
                  'custevent_study_task_client',
                  'company',
                  'custevent_study_task_service_line',
                  'title',
                  'status',
                  'custevent_study_task_performed_date',
                  'custevent_study_task_nonbillable',
                  'custevent_study_task_line_mgr_approved',
                  'custevent_itemname',
                  'custevent_study_task_priced_from_quote',
                  'custevent_itempricing',
                  'custevent_item_unit_price',
                  'custevent_study_task_item_description',
                  'custevent_study_task_sales_unit_type',
                  'custevent_ss_unit_description',
                  'custevent_purpose',
                  'custevent_itemquantity',
                  'custevent_po_number',
                  'custevent_pass_fail',
                  'custevent_study_task_reason',
                  'custevent_other_reason_description',
                  'custevent_po_number',
                  'custevent_sort_order',
                  'custevent_study_task_rev_rec_date',
                  'custevent_rev_rec_approved',
                  'custevent_study_task_invoice_notes',
                  'custevent_study_task_finance_status',
                  'custevent_study_task_invoiced',
                  'custevent_study_task_invoice_number',
                  'custevent_study_task_rebill_invoice_num',
                  'custevent_study_task_compound',
                  'custevent_study_task_batch_id',
                  'custevent_study_task_task_type',
                  'custevent_study_task_billing_notes',
                  'custevent_comments',
                  'custentity_master_study'];


function main_invoiceStudying(request, response) {
	if (request.getMethod() == 'GET') {



		var form = nlapiCreateForm('Study Task Utility');

		var linemanagerrole = nlapiGetContext().getSetting('SCRIPT', 'custscript_linemanager_role');
		var billingrole = nlapiGetContext().getSetting('SCRIPT', 'custscript_billing_role');
		var currentfinancestatus = nlapiGetContext().getSetting('SCRIPT', 'custscript_finance_status');




		//nlapiLogExecution('Debug',linemanagerrole, linemanagerrole);


		if (nlapiGetContext().getEnvironment() == 'SANDBOX') {

			form.setScript(374);

			//form.setScript(362);//add ing the client script id AGX_CUE_Study_task_Utility_list
		} else {
			// var linemanagerrole=nlapiGetContext().getSetting('SCRIPT', 'custscript_linemanager_list');
			//	var billingrole=nlapiGetContext().getSetting('SCRIPT', 'custscript_billingrole_list');
			//	var currentfinancestatus=nlapiGetContext().getSetting('SCRIPT', 'custscript_finance_status_list');


			form.setScript(374); //add ing the client script id AGX_CUE_Study_task_Utility_list

		}
		// form.setScript(198);

		// form.addFieldGroup('header_grp', ' ');
		//	 form.addFieldGroup('filter_grp', 'Filters');
		//form.addFieldGroup('filter2_grp', 'Filters','main');

		form.addFieldGroup('list_grp', ' ');


		var tempfinancestatus = form.addField('custpage_tempfinancestatus', 'text', 'Finance Status', null);
		tempfinancestatus.setDisplayType('hidden');
		tempfinancestatus.setDefaultValue(currentfinancestatus);

		var templmRole = form.addField('custpage_lmrole', 'text', 'LMRole', null);
		templmRole.setDisplayType('hidden');
		templmRole.setDefaultValue(linemanagerrole);

		var tempBillingRole = form.addField('custpage_billingrole', 'text', 'Billing Role', null);
		tempBillingRole.setDisplayType('hidden');
		tempBillingRole.setDefaultValue(billingrole);


		var tempregularfields = form.addField('custpage_regularfieldslm', 'text', 'regularfields', null);
		tempregularfields.setDisplayType('hidden');
		tempregularfields.setDefaultValue('');

		var tempregularfrfields = form.addField('custpage_regularfieldsfr', 'text', 'regularfieldsfr', null);
		tempregularfrfields.setDisplayType('hidden');
		tempregularfrfields.setDefaultValue('');

		var tempregularinfields = form.addField('custpage_regularfieldsin', 'text', 'regularfieldsin', null);
		tempregularinfields.setDisplayType('hidden');
		tempregularinfields.setDefaultValue('');

		var tempregularcifields = form.addField('custpage_regularfieldsci', 'text', 'regularfieldsci', null);
		tempregularcifields.setDisplayType('hidden');
		tempregularcifields.setDefaultValue('');


		var tempstudyparameter = form.addField('custpage_studyparameter', 'text', 'StudyParameter', null);
		tempstudyparameter.setDisplayType('hidden');
		if (request.getParameter('custpage_studyparameter') != null && request.getParameter('custpage_studyparameter') != '') {
			tempstudyparameter.setDefaultValue(request.getParameter('custpage_studyparameter'));
		}

		var tempindex = form.addField('custpage_index', 'text', 'pageindex', null);
		tempindex.setDisplayType('hidden');
		if (request.getParameter('custpage_index') != null && request.getParameter('custpage_index') != '') {
			tempindex.setDefaultValue(request.getParameter('custpage_index'));
		}



		var role = nlapiGetRole().toString();
		linemanagerrole = (linemanagerrole.indexOf(",") > 0) ? linemanagerrole.split(",") : linemanagerrole;
		billingrole = (billingrole.indexOf(",") > 0) ? billingrole.split(",") : billingrole;




		// sets a client script
		// form.setScript('customscript128');
		var specialTab = form.addTab('custpage_study', 'Study');
		//thirdTab.setColumnWidth="500px";
		var specialSubTab = form.addSubTab('custpage_studysubtab', 'Study', 'custpage_study');


		var thirdTab = form.addTab('custpage_lm', 'LineManger to Approve');
		//thirdTab.setColumnWidth="500px";
		var linemanagertoapproveSubTab = form.addSubTab('custpage_lm_subtab', 'LineManager to Approve', 'custpage_lm');


		var secondTab = form.addTab('custpage_finance', 'Finance to Review');
		var financeSubTab = form.addSubTab('custpage_finance_subtab', 'Finance to Review', 'custpage_finance');

		var firstTab = form.addTab('custpage_readytoinvoice', 'Ready to Invoice');
		var readytoInvoiceSubTab = form.addSubTab('custpage_readytoinvoice_subtab', 'Ready to Invoice',
			'custpage_readtoinvoice');

		var fourthTab = form.addTab('custpage_ci', 'Ready for Consolidated Invoice');
		var consolidatedInvoiceSubTab = form.addSubTab('custpage_ci_subtab', 'Ready for Consolidated Invoice', 'custpage_ci');

		var fifthTab = form.addTab('custpage_all', 'Study Tasks');
		var allSubTab = form.addSubTab('custpage_all_subtab', 'Study Tasks', 'custpage_all');

		var seventhTab = form.addTab('custpage_ready', 'Ready to Send');
		var readySubTab = form.addSubTab('custpage_ready_subtab', 'Ready to Send', 'custpage_ready');


		var sixthTab = form.addTab('custpage_email', 'Send Email');
		var emailSubTab = form.addSubTab('custpage_email_subtab', 'Send Email', 'custpage_email');

		//form.addButton('custpage_sendemail', 'Send Email', 'sendEmail()', 'custpage_email');

		var datefield = form.addField('custpage_date_line', 'date', 'Enter the Invoice Date', null, 'custpage_readytoinvoice');
		datefield.setDisplaySize(5);

		var cidatefield = form.addField('custpage_cidate_line', 'date', 'Enter the Invoice Date', null, 'custpage_ci');
		cidatefield.setDisplaySize(5);

		//var tempStudyView = form.addField('custpage_studyview', 'text', 'StudyID:', null,'custpage_finance').setDisplayType('inline');
		if (request.getParameter('custpage_studyparameter') != null) {
			if (nlapiLookupField("job", request.getParameter('custpage_studyparameter'), "entityid") != null) {
				var studyid = getStudyId(nlapiLookupField("job", request.getParameter('custpage_studyparameter'), "entityid"));
				//	tempStudyView.setDefaultValue(studyid);
			}
		}

		var index;
		if (request.getParameter('custpage_index') != null) {
			index = request.getParameter('custpage_index');
		}

		var inlinenewField = form.addField('custpage_studyview', 'inlinehtml', '', null, 'custpage_finance');
		var linknewText = '<style> .prevbutton{ height:50px; width:50px; border:0px; \
				 background: url("https://checkout.na1.netsuite.com/core/media/media.nl?id=245101&c=3921476&h=d31d4929734c56f1dff4") no-repeat center center;} \
				.nextbutton{  height:50px; width:50px; border:0px; background: url("https://checkout.na1.netsuite.com/core/media/media.nl?id=245100&c=3921476&h=9dbee8af4e61f77ee2e7") no-repeat center center;}\
				.data{font-family:arial;color:#14396A!important;font-size:14px;text-shadow:1px \
				1px 0 #7CACDE;font-weight:bold; box-shadow:1px 1px 1px #BEE2F9;padding:10px 25px;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;\
				border:2px solid #3866A3;}</style>\
				<table cellpadding="0" cellspacing="0" border="0"><tr><td>\
				<button type="button" class="prevbutton" onclick=previous("finance");></button></td><td><p class="data"> ' + studyid + '</p></td>\
				<td><button type="button" class="nextbutton" onclick=next("finance");></button></td></tr></table>';

		inlinenewField.setDefaultValue(linknewText);

		var inlinenewlmField = form.addField('custpage_studyviewlm', 'inlinehtml', '', null, 'custpage_lm');
		var linknewlmText = '<table cellpadding="0" cellspacing="0" border="0"><tr><td>\
				<button type="button" id="prevlm" class="prevbutton" onclick=previous("linemanager");></button></td><td><p class="data"> ' + studyid + '</p></td>\
				<td><button type="button" id="nextlm" class="nextbutton" onclick=next("linemanager");></button></td></tr></table>';

		inlinenewlmField.setDefaultValue(linknewlmText);



		var subliststudy = form.addSubList('custpage_studylist', 'list', 'Study', 'custpage_study');

		var inlinesortField = form.addField('custpage_btnsort', 'inlinehtml', '', null, null);
		var linksortText = '<div class="modal"></div> ';
		inlinesortField.setDefaultValue(linksortText);

		form.addField('custpage_customer', 'select', 'Client', 'customer');
		form.addField('custpage_serviceline', 'select', 'SERVICE LINE', 'classification');
		var studyfield = form.addField('custpage_study', 'select', 'Study Name', 'job');


		var tempView = form.addField('custpage_view', 'text', 'view', null);
		tempView.setDisplayType('hidden');
		tempView.setDefaultValue(request.getParameter('custpage_view'));


		var lmfield = form.addField('custpage_lmapproved', 'select', 'Line Manager Approved', null);
		lmfield.addSelectOption(0, '');
		lmfield.addSelectOption('T', 'Yes');
		lmfield.addSelectOption('F', 'No');


		form.addField('custpage_revrecfromdate', 'date', 'RevRec Date From:').setDisplaySize(5);
		form.addField('custpage_revrectodate', 'date', 'RevRec Date To:', null).setDisplaySize(5);


		var infield = form.addField('custpage_invoiced', 'select', 'Invoiced?', null);
		infield.addSelectOption(0, '');
		infield.addSelectOption('T', 'Yes');
		infield.addSelectOption('F', 'No');


		//form.addButton('custbtn_clear', 'Clear', "clearAll()");
		form.addField('custpage_fromdate', 'date', 'Date Performed From:').setDisplaySize(5);
		form.addField('custpage_todate', 'date', 'Date Performed To:', null).setDisplaySize(5);
		var pifield = form.addField('custpage_pi', 'select', 'PI', 'employee');



		var financefield = form.addField('custpage_financestatus', 'select', 'FinanceStatus', null, null);

		var financecolumns = [new nlobjSearchColumn('name'), new nlobjSearchColumn('internalid')];
		var financesearch = nlapiSearchRecord('customlist_study_task_finance_status', null, null, financecolumns);
		financefield.addSelectOption(-1, '-All-');
		financefield.addSelectOption(0, '');

		for (result in financesearch) {
			financefield.addSelectOption(parseInt(financesearch[result].id), financesearch[result].getValue('name'));
		}

		if (request.getParameter('custpage_financestatus') != '') {
			financefield.setDefaultValue(request.getParameter('custpage_financestatus'));
		}



		//combine the search and clear field
		var inlinenewField = form.addField('custpage_search', 'inlinehtml', '', null);
		var linknewText = '<style>.testbutton{font-family:arial;color:#14396A!important;font-size:14px;text-shadow:1px \
				1px 0 #7CACDE;box-shadow:1px 1px 1px #BEE2F9;padding:10px 25px;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;\
				border:2px solid #3866A3;}\
				.testbutton:hover{color:#14396A!important;}</style> \
				<div id="div" ><br/>\
				<button type="button" id="custpage_searchbtn" class="testbutton" onclick=refreshSublist(this);>Search</button>\
				<button type="button" class="testbutton" onclick=clearAll();>Clear</button>\
				</div>';



		inlinenewField.setDefaultValue(linknewText);





		var linkField = form.addField('custpage_searchfield', 'inlinehtml', '', null);
		//var url= nlapiResolveURL('Search','job',studyTask[i].getValue('company'));
		if (nlapiGetContext().getEnvironment() == 'SANDBOX') {
			var url = "https://system.sandbox.netsuite.com/app/common/search/searchresults.nl?searchid=277";	
		}
		else if (nlapiGetContext().getEnvironment() == 'BETA') {
			var url = "https://system.beta.netsuite.com/app/common/search/searchresults.nl?searchid=277";	
		}
		else{
			var url = "https://system.na1.netsuite.com/app/common/search/searchresults.nl?searchid=277";
		}
		
		var linkText1 = '<a target="_blank" href="' + url + '">' + 'Search' + "</a>";
		linkField.setDefaultValue(linkText1);




		/* search study tasks and create sublist */

		//Add tabs to the Utility form.



		var sublistlm = form.addSubList('custpage_studytasklm', 'list', 'Study Tasks:Line Manager to Approve', 'custpage_lm');

		// add fields to the sublist
		sublistlm.addField('custpage_company_line', 'text', 'Study', 'job');
		sublistlm.addField('custpage_updatecheckbox_line', 'checkbox', 'Update').setDisplayType("hidden");
		sublistlm.addField('custpage_internalid_line', 'text', 'ID');
		sublistlm.addField('custpage_internalid2_line', 'text', 'ID').setDisplayType("hidden");
		sublistlm.addField('custpage_customer_line', 'text', 'Client');
		sublistlm.addField('custpage_serviceline_line', 'text', 'Service Line');
		sublistlm.addField('custpage_study_line', 'text', 'Title');
		sublistlm.addField('custpage_batchid_line', 'Text', 'BatchID').setDisplayType("entry").setDisplaySize(2);
		// Search for matching items; in this example we are looking for Items with department ID = 11; add these Items to Item Select Field
		//sublist.addField('custpage_tasktype_line', 'select', 'Task Type', 'customrecord_task_type').setDisplayType("entry");
		sublistlm.addField('custpage_associatedcompoundinline_line', 'textarea', 'Compound').setDisplaySize(5);
		sublistlm.addField('custpage_purpose_line', 'Textarea', 'Purpose').setDisplayType("entry").setDisplaySize(7, 1);
		sublistlm.addField('custpage_notes_line', 'textarea', 'Comments').setDisplayType("entry").setDisplaySize(20, 2);
		sublistlm.addField('custpage_itemdescription_line', 'textarea', 'Item Description').setDisplaySize(2);
		sublistlm.addField('custpage_billable_quantity_line', 'text', 'Quantity').setDisplayType("entry").setDisplaySize(1);

		var pffield = sublistlm.addField('custpage_pf_line', 'select', 'P/F');
		pffield.addSelectOption(0, '');
		pffield.addSelectOption(1, 'Pass');
		pffield.addSelectOption(2, 'Fail');
		//	billingrole=(billingrole.indexOf(",")>0) ? billingrole.split(","): billingrole;

		/*if(jQuery.inArray( role, linemanagerrole ) >=0 || jQuery.inArray( role, billingrolerrole ) >=0){
		pffield.setDisplayType("entry");
				
		}
		else{
			pffield.setDisplayType("disabled");
		}
		*/

		sublistlm.addField('custpage_task_type_nonbillable_line', 'checkbox', 'NON-Billable').setDisplayType("entry");

		sublistlm.addField('custpage_dateperformed_line', 'date', 'DtPerformed').setDisplayType("entry").setDisplaySize(1);

		var revrecdatefield = sublistlm.addField('custpage_study_task_rev_rec_date_line', 'select', 'Rev Rec Period');
		var revreccolumns = [new nlobjSearchColumn('periodName'), new nlobjSearchColumn('internalid').setSort(false)];
		var revrecdatesearch = nlapiSearchRecord('accountingperiod', null, null, revreccolumns);


		for (result in revrecdatesearch) {
			//	nlapiLogExecution('Debug','posearch[result].getValue(name)', posearch[result].getValue('name'));
			revrecdatefield.addSelectOption(revrecdatesearch[result].id, revrecdatesearch[result].getValue('periodName'));
		}




		sublistlm.addField('custpage_task_type_linemanager_line', 'checkbox', 'Line Manager Approved').setDisplayType("entry");


		sublistlm.addField('custpage_itemname_line', 'Text', 'Item Name').setDisplaySize(2);
		sublistlm.addField('custpage_itempricing_line', 'currency', 'Item Pricing').setDisplaySize(2);
		sublistlm.addField('custpage_salesunit_line', 'Text', 'Sales Unit').setDisplaySize(2);
		sublistlm.addField('custpage_itemunitprice_line', 'currency', 'Item unit price').setDisplaySize(2);
		sublistlm.addField('custpage_salesunitdescription_line', 'textarea', 'Sales Unit Description').setDisplaySize(2);
		sublistlm.addField('custpage_pricefromquote_line', 'Text', 'Priced from Quote').setDisplaySize(2);
		sublistlm.addField('custpage_masterstudyid_line', 'Text', 'Master Study', 'job').setDisplaySize(2);

		var reasonfield = sublistlm.addField('custpage_freason_line', 'select', 'Reason').setDisplayType("disabled");
		sublistlm.addField('custpage_other_line', 'text', 'Other').setDisplayType("entry").setDisplaySize(5);

		//sublist.addButton('custpage_addcmpdbtn_line', 'update compound', "buttonPress_updatecompound('T')");


		sublistlm.addField('custpage_company_line2', 'text', 'Study').setDisplaySize(8);

		var fsearch = nlapiSearchRecord('customrecord_batch_reason', null, null, [new nlobjSearchColumn('name')]);
		reasonfield.addSelectOption(0, '');
		for (result in fsearch) {
			reasonfield.addSelectOption(fsearch[result].id, fsearch[result].getValue('name'));
		}



		// subList.addField('status', 'text', 'Status');

		// Set all the parameters
		var parameters = setAllParameters(request, form, 'linemangertoapprove');

		var studyTasklm = getStudyTaskSearch(parameters, 'linemangertoapprove');


		var totallm = getStudyTaskTotal(parameters, 'linemangertoapprove');
		if (totallm != undefined && totallm != null && totallm != '') {
			if (totallm.length > 0) {

				var totallmfield = form.addField('custpage_totallm_line', 'text', 'Total($):', null, 'custpage_lm');
				totallmfield.setDisplaySize(50);
				totallmfield.setDefaultValue(totallm[0].getValue('custevent_itempricing', null, 'sum'));
				totallmfield.setDisplayType('inline');
				var countlmfield = form.addField('custpage_totalcountlm_line', 'text', '#Line Count:', null, 'custpage_lm');
				countlmfield.setDisplaySize(50);
				countlmfield.setDefaultValue(totallm[0].getValue('internalid', null, 'count'));
				countlmfield.setDisplayType('inline');

			}
		}


		if (studyTasklm != null && studyTasklm != '') {
			var studyTaskLengthlm = studyTasklm.length;
			for (var i = 0; i < studyTaskLengthlm; i++) {

				for (var j = 0; j < columnFields.length; j++) {
					//nlapiLogExecution('Debug',columnFields[j], studyTasklm[i].getValue(columnFields[j]));

					if (columnFields[j] == 'custevent_study_task_service_line' ||
						columnFields[j] == 'custevent_study_task_compound' ||
						columnFields[j] == 'custevent_study_task_priced_from_quote' ||
						columnFields[j] == 'custevent_study_task_client' ||
						columnFields[j] == 'custevent_itemname'
					) {
						sublistlm.setLineItemValue(recordLMFields[columnFields[j]], i + 1, studyTasklm[i].getText(columnFields[j]));
					} //	columnFields[j]=='custrecord_ss_sales_unit_type'||
					else if (columnFields[j] == 'internalid') {
						var urlTask = nlapiResolveURL('Record', 'projecttask', studyTasklm[i].getValue('internalid'), 'EDIT');
						var linkTextTask = '<a target="_blank" href="' + urlTask + '">' + studyTasklm[i].getValue('internalid') + "</a>";

						sublistlm.setLineItemValue('custpage_internalid_line', i + 1, linkTextTask);
						sublistlm.setLineItemValue('custpage_internalid2_line', i + 1, studyTasklm[i].getValue('internalid'));
					} else if (columnFields[j] == 'company') {
						var urlregularStudy = nlapiResolveURL('Record', 'job', studyTasklm[i].getValue('company'), 'EDIT');
						var linkTextStudy = '<a target="_blank" href="' + urlregularStudy + '">' + getStudyId(studyTasklm[i].getText('company')) + "</a>";

						sublistlm.setLineItemValue('custpage_company_line', i + 1, linkTextStudy);

					} else if (columnFields[j] == 'custentity_master_study') {
						var urlMasterStudy = nlapiResolveURL('Record', 'job', studyTasklm[i].getValue(nlobjSearchColumn('custentity_master_study', 'job')), 'EDIT');
						var linkTextMasterStudy = '<a target="_blank" href="' + urlMasterStudy + '">' + studyTasklm[i].getText(nlobjSearchColumn('custentity_master_study', 'job')) + "</a>";

						sublistlm.setLineItemValue('custpage_masterstudyid_line', i + 1, linkTextMasterStudy);

					} else {
						sublistlm.setLineItemValue(recordLMFields[columnFields[j]], i + 1, studyTasklm[i].getValue(columnFields[j]));
					}

				}




			}
		}
		//}

		//Finance Tab


		//sublistlm.addButton('custpage_update_study_task',"Update Study Tasks","buttonPress_updatelinemanager('"+ form +"')");




		var sublistfr = form.addSubList('custpage_studytaskfr', 'list', 'Finance to Review', 'custpage_finance');

		// add fields to the sublist
		sublistfr.addField('custpage_updatecheckbox_line', 'checkbox', 'Update');
		sublistfr.addField('custpage_internalid_line', 'text', 'ID');
		sublistfr.addField('custpage_internalid2_line', 'text', 'ID').setDisplayType("hidden");
		sublistfr.addField('custpage_customer_line', 'text', 'Client');
		sublistfr.addField('custpage_company_line', 'text', 'Study').setDisplaySize(8);
		sublistfr.addField('custpage_serviceline_line', 'textarea', 'Service Line').setDisplaySize(8);
		sublistfr.addField('custpage_study_line', 'textarea', 'Title').setDisplaySize(8);
		sublistfr.addField('custpage_batchid_line', 'Text', 'BatchID').setDisplaySize(2);
		sublistfr.addField('custpage_associatedcompoundinline_line', 'textarea', 'Compound').setDisplaySize(5);

		// Search for matching items; in this example we are looking for Items with department ID = 11; add these Items to Item Select Field
		//sublist.addField('custpage_tasktype_line', 'select', 'Task Type', 'customrecord_task_type').setDisplayType("entry");
		sublistfr.addField('custpage_purpose_line', 'Textarea', 'Purpose').setDisplaySize(7, 1);

		sublistfr.addField('custpage_billable_quantity_line', 'text', 'Quantity').setDisplaySize(1);
		var pffield = sublistfr.addField('custpage_pf_line', 'text', 'P/F').setDisplayType("disabled");
		sublistfr.addField('custpage_task_type_nonbillable_line', 'checkbox', 'NON-Billable').setDisplayType("disabled");
		sublistfr.addField('custpage_dateperformed_line', 'date', 'DtPerformed').setDisplaySize(1);

		sublistfr.addField('custpage_task_type_linemanager_line', 'checkbox', 'Line Manager Approved').setDisplayType("entry");
		//sublist.addField('custpage_dateplanned_line', 'date', 'Planned Date').setDisplayType("entry");

		sublistfr.addField('custpage_itemname_line', 'Text', 'Item Name').setDisplaySize(2);
		sublistfr.addField('custpage_itempricing_line', 'currency', 'Item Pricing').setDisplayType("entry");
		sublistfr.addField('custpage_salesunit_line', 'Text', 'Sales Unit').setDisplaySize(2);
		sublistfr.addField('custpage_itemunitprice_line', 'currency', 'Item unit price').setDisplaySize(2);
		sublistfr.addField('custpage_salesunitdescription_line', 'textarea', 'Sales Unit Description').setDisplaySize(2);
		sublistfr.addField('custpage_pricefromquote_line', 'Text', 'Priced from Quote').setDisplaySize(2);
		sublistfr.addField('custpage_masterstudyid_line', 'Text', 'Master Study', 'job').setDisplaySize(2);
		sublistfr.addField('custpage_study_task_invoice_notes_line', 'textarea', 'Invoice Notes').setDisplayType("entry").setDisplaySize(20, 2);
		sublistfr.addField('custpage_study_task_billing_notes_line', 'textarea', 'Billing Notes').setDisplayType("entry").setDisplaySize(20, 2);
		sublistfr.addField('custpage_notes_line', 'textarea', 'Comments').setDisplaySize(20, 2);
		sublistfr.addField('custpage_manualpricing_line', 'checkbox', 'ManualPricing').setDisplayType("disabled").setDisplaySize(2);
		sublistfr.addField('custpage_company_line2', 'text', 'Study').setDisplaySize(8);
		sublistfr.addField('custpage_itemdescription_line', 'textarea', 'Service Description').setDisplayType("entry").setDisplaySize(20, 2);
		sublistfr.addField('custpage_rev_rec_approved_line', 'checkbox', 'Rev Rec Approved');
		sublistfr.addField('custpage_study_task_rev_rec_date_line', 'select', 'Rev Rec Period', 'accountingperiod').setDisplayType("disabled");
		var pofield = sublistfr.addField('custpage_po_line', 'select', 'PONumber').setDisplayType("disabled");
		pofield.addSelectOption(0, '');
		pofield.addSelectOption(1, 'N/A');


		//if(jQuery.inArray( role, billingrolerrole ) >=0){
		//pofield.setDisplayType("entry");
		//financefield.setDisplayType("entry");
		var columns = [new nlobjSearchColumn('name'), new nlobjSearchColumn('internalid')];

		if (request.getParameter('custpage_customer') != null && request.getParameter('custpage_customer') != '') {
			var filters = [new nlobjSearchFilter('custrecord_client_po_code', null, 'is', request.getParameter('custpage_customer'))];
			var posearch = nlapiSearchRecord('customrecord_client_po', null, filters, columns);
		} else {
			var posearch = nlapiSearchRecord('customrecord_client_po', null, null, columns);
		}

		for (result in posearch) {
			//	nlapiLogExecution('Debug','posearch[result].getValue(name)', posearch[result].getValue('name'));
			pofield.addSelectOption(posearch[result].id, posearch[result].getValue('name'));
		}

		var financefield = sublistfr.addField('custpage_study_task_finance_status_line', 'select', 'Finance Status', 'customlist_study_task_finance_status').setDisplayType("disabled");

		sublistfr.addField('custpage_invoiced_line', 'checkbox', 'Invoiced');
		sublistfr.addField('custpage_invoicenumber_line', 'Text', 'Invoice Number').setDisplayType("entry");

		sublistfr.addButton('custpage_updatepricing', "Update Pricing", "buttonPress_updatePricing('" + form + "')");



		// display the search results on the Custom Contact sublist
		var studyTaskfr = getStudyTaskSearch(parameters, 'financetoreview');
		var totalfr = getStudyTaskTotal(parameters, 'financetoreview');
		if (totalfr != undefined && totalfr != null && totalfr != '') {
			if (totalfr.length > 0) {

				var totalfield = form.addField('custpage_total_line', 'text', 'Total($):', null, 'custpage_finance');
				totalfield.setDisplaySize(50);
				totalfield.setDefaultValue(totalfr[0].getValue('custevent_itempricing', null, 'sum'));
				totalfield.setDisplayType('inline');
				var countfield = form.addField('custpage_totalcount_line', 'text', '#Line Count:', null, 'custpage_finance');
				countfield.setDisplaySize(50);
				countfield.setDefaultValue(totalfr[0].getValue('internalid', null, 'count'));
				countfield.setDisplayType('inline');

			}
		}

		if (studyTaskfr != null && studyTaskfr != '') {
			var studyTaskLengthfr = studyTaskfr.length;
			//countfield.setDefaultValue( studyTaskLengthfr);
			//countfield.setDisplayType('disabled');

			for (var i = 0; i < studyTaskLengthfr; i++) {
				//sublistfr.setLineItemValue('custpage_internalid_line', i + 1, studyTaskfr[i].getValue('internalid'));

				var urlTask = nlapiResolveURL('Record', 'projecttask', studyTaskfr[i].getValue('internalid'), 'EDIT');
				var linkTextTask = '<a target="_blank" href="' + urlTask + '">' + studyTaskfr[i].getValue('internalid') + "</a>";
				sublistfr.setLineItemValue('custpage_internalid_line', i + 1, linkTextTask);
				sublistfr.setLineItemValue('custpage_internalid2_line', i + 1, studyTaskfr[i].getValue('internalid'));

				sublistfr.setLineItemValue('custpage_customer_line', i + 1, studyTaskfr[i].getText('custevent_study_task_client'));

				var url = nlapiResolveURL('Record', 'job', studyTaskfr[i].getValue('company'));
				var linkText = '<a target="_blank" href="' + url + '">' + getStudyId(studyTaskfr[i].getText('company')) + "</a>";
				sublistfr.setLineItemValue('custpage_company_line', i + 1, linkText);
				sublistfr.setLineItemValue('custpage_serviceline_line', i + 1, studyTaskfr[i].getText('custevent_study_task_service_line'));
				sublistfr.setLineItemValue('custpage_study_line', i + 1, studyTaskfr[i].getValue('title'));

				sublistfr.setLineItemValue('custpage_purpose_line', i + 1, studyTaskfr[i].getValue('custevent_purpose'));
				sublistfr.setLineItemValue('custpage_batchid_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_batch_id'));

				sublistfr.setLineItemValue('custpage_billable_quantity_line', i + 1, studyTaskfr[i].getValue('custevent_itemquantity'));
				sublistfr.setLineItemValue('custpage_dateperformed_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_performed_date'));
				sublistfr.setLineItemValue('custpage_task_type_nonbillable_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_nonbillable'));
				sublistfr.setLineItemValue('custpage_task_type_linemanager_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_line_mgr_approved'));
				sublistfr.setLineItemValue('custpage_notes_line', i + 1, studyTaskfr[i].getValue('custevent_comments'));
				sublistfr.setLineItemValue('custpage_pf_line', i + 1, studyTaskfr[i].getText('custevent_pass_fail'));
				sublistfr.setLineItemValue('custpage_company_line2', i + 1, linkText);
				var strCompound = '';

				sublistfr.setLineItemValue('custpage_associatedcompoundinline_line', i + 1, studyTaskfr[i].getText('custevent_study_task_compound'));


				sublistfr.setLineItemValue('custpage_itemname_line', i + 1, studyTaskfr[i].getText('custevent_itemname'));
				sublistfr.setLineItemValue('custpage_itempricing_line', i + 1, studyTaskfr[i].getValue('custevent_itempricing'));

				//sublistfr.setLineItemValue('custpage_manualpricing_line',i+1,  studyTaskfr[i].getValue( 'custrecord_manual_price'));

				//nlapiLogExecution("debug","studyTaskfr[i].getValue('custevent_study_task_task_type') ",studyTaskfr[i].getValue('custevent_study_task_task_type') );

				if (studyTaskfr[i].getValue('custevent_study_task_task_type') != null) {
					var manualPricing = nlapiLookupField('customrecord_task_type', studyTaskfr[i].getValue('custevent_study_task_task_type'), 'custrecord_manual_price');
					sublistfr.setLineItemValue('custpage_manualpricing_line', i + 1, manualPricing);
					//	nlapiLogExecution("debug","manual Pricing",manualPricing);
				}
				sublistfr.setLineItemValue('custpage_itemunitprice_line', i + 1, studyTaskfr[i].getValue('custevent_item_unit_price'));
				sublistfr.setLineItemValue('custpage_pricefromquote_line', i + 1, studyTaskfr[i].getText('custevent_study_task_priced_from_quote'));
				sublistfr.setLineItemValue('custpage_salesunit_line', i + 1, studyTaskfr[i].getText('custevent_study_task_sales_unit_type'));
				sublistfr.setLineItemValue('custpage_itemdescription_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_item_description'));
				sublistfr.setLineItemValue('custpage_salesunitdescription_line', i + 1, studyTaskfr[i].getValue('custevent_ss_unit_description'));
				//sublistfr.setLineItemValue('custpage_masterstudyid_line', i+1, studyTaskfr[i].getText('custentity_master_study','job'));	


				sublistfr.setLineItemValue('custpage_study_task_rev_rec_date_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_rev_rec_date'));
				sublistfr.setLineItemValue('custpage_rev_rec_approved_line', i + 1, studyTaskfr[i].getValue('custevent_rev_rec_approved'));
				sublistfr.setLineItemValue('custpage_study_task_finance_status_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_finance_status'));
				sublistfr.setLineItemValue('custpage_study_task_invoice_notes_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_invoice_notes'));
				sublistfr.setLineItemValue('custpage_study_task_billing_notes_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_billing_notes'));
				sublistfr.setLineItemValue('custpage_po_line', i + 1, studyTaskfr[i].getValue('custevent_po_number'));

				sublistfr.setLineItemValue('custpage_invoicenumber_line', i + 1, studyTaskfr[i].getText('custevent_study_task_invoice_number').replace("Invoice #", ""));

				sublistfr.setLineItemValue('custpage_invoiced_line', i + 1, studyTaskfr[i].getValue('custevent_study_task_invoiced'));
				nlapiLogExecution("debug", "Invoice Number", studyTaskfr[i].getValue('custevent_study_task_invoice_number'));

				var urlms = nlapiResolveURL('Record', 'job', studyTaskfr[i].getValue('custentity_master_study', 'job'), 'EDIT');
				var linkTextms = '<a target="_blank" href="' + urlms + '">' + getStudyId(studyTaskfr[i].getText(nlobjSearchColumn('custentity_master_study', 'job'))) + "</a>";
				sublistfr.setLineItemValue('custpage_masterstudyid_line', i + 1, linkTextms);



			}
		}

		/**/



		var sublist = form.addSubList('custpage_studytask', 'list', 'Ready to  Invoice (Individual)', 'custpage_readytoinvoice');

		// add fields to the sublist

		sublist.addField('custpage_markcheckbox_line', 'checkbox', 'Mark');
		sublist.addField('custpage_update_line', 'text', 'Update').setDisplayType("entry").setDisplayType("hidden");
		sublist.addField('custpage_invoicenumber_line', 'text', 'Invoice');
		sublist.addField('custpage_invoiceorder_line', 'text', 'Invoice Order').setDisplayType("entry");
		sublist.addField('custpage_internalid_line', 'text', 'ID');
		sublist.addField('custpage_internalid2_line', 'text', 'ID').setDisplayType("hidden");
		sublist.addField('custpage_customer_line', 'text', 'Client');
		sublist.addField('custpage_company_line', 'text', 'Study', 'job');
		sublist.addField('custpage_serviceline_line', 'text', 'Service Line');
		sublist.addField('custpage_study_line', 'text', 'Title');
		sublist.addField('custpage_batchid_line', 'Text', 'BatchID').setDisplaySize(2);

		sublist.addField('custpage_associatedcompoundinline_line', 'textarea', 'Compound').setDisplaySize(5);
		sublist.addField('custpage_itemdescription_line', 'textarea', 'Service Description').setDisplayType("entry").setDisplaySize(40, 2);
		sublist.addField('custpage_billable_quantity_line', 'text', 'Quantity').setDisplaySize(1);
		sublist.addField('custpage_dateperformed_line', 'date', 'DtPerformed').setDisplaySize(1);
		//sublist.addField('custpage_study_task_rev_rec_date_line', 'select','Rev Rec Period', 'accountingperiod');
		sublist.addField('custpage_study_task_rev_rec_date_line', 'text', 'Rev Rec Period');
		sublist.addField('custpage_rev_rec_approved_line', 'checkbox', 'Rev Rec Approved').setDisplayType("disabled");
		//sublist.addField('custpage_study_task_finance_status_line', 'select','Finance Status','customlist_study_task_finance_status');
		sublist.addField('custpage_study_task_invoice_notes_line', 'textarea', 'Invoice Notes').setDisplayType("entry").setDisplaySize(20, 2);
		sublist.addField('custpage_study_task_billing_notes_line', 'textarea', 'Billing Notes').setDisplayType("entry").setDisplaySize(20, 2);

		//var pofieldinv = sublist.addField('custpage_po_line', 'select', 'PONumber');
		sublist.addField('custpage_masterstudyid_line', 'Text', 'Master Study').setDisplaySize(2);
		sublist.addField('custpage_study_task_finance_status_line', 'text', 'Finance Status');
		sublist.addField('custpage_po_line', 'text', 'PONumber');

		sublist.addField('custpage_itemname_line', 'Text', 'Item Name').setDisplaySize(2);
		sublist.addField('custpage_itempricing_line', 'currency', 'Item Pricing').setDisplaySize(2);
		sublist.addField('custpage_itemunitprice_line', 'currency', 'Item unit price').setDisplaySize(2);
		sublist.addField('custpage_salesunit_line', 'Text', 'Sales Unit').setDisplaySize(2);
		sublist.addField('custpage_salesunitdescription_line', 'textarea', 'Sales Unit Description').setDisplaySize(2);
		sublist.addField('custpage_pricefromquote_line', 'Text', 'Priced from Quote').setDisplaySize(2);
		sublist.addField('custpage_notes_line', 'textarea', 'Comments').setDisplaySize(20, 2);


		sublist.addField('custpage_company_line2', 'text', 'Study').setDisplaySize(8);



		// Set all the parameters
		//var parameters = setAllParameters(request, form,'readytoinvoice');

		// display the search results on the Custom Contact sublist
		var studyTask = getStudyTaskSearch(parameters, 'readytoinvoice');
		if (studyTask != null && studyTask != '') {
			var studyTaskLength = studyTask.length;
			for (var i = 0; i < studyTaskLength; i++) {
				//sublist.setLineItemValue('custpage_internalid_line', i + 1, studyTask[i].getValue('internalid'));
				var urlTask = nlapiResolveURL('Record', 'projecttask', studyTask[i].getValue('internalid'), 'EDIT');
				var linkTextTask = '<a target="_blank" href="' + urlTask + '">' + studyTask[i].getValue('internalid') + "</a>";
				sublist.setLineItemValue('custpage_internalid_line', i + 1, linkTextTask);
				sublist.setLineItemValue('custpage_internalid2_line', i + 1, studyTask[i].getValue('internalid'));

				sublist.setLineItemValue('custpage_invoicenumber_line', i + 1, 'Invoice: ' + studyTask[i].getValue("formulatext").toString());
				sublist.setLineItemValue('custpage_invoiceorder_line', i + 1, studyTask[i].getValue("formulanumeric"));
				sublist.setLineItemValue('custpage_customer_line', i + 1, studyTask[i].getText('custevent_study_task_client'));
				var url = nlapiResolveURL('Record', 'job', studyTask[i].getValue('company'), 'EDIT');
				var linkText = '<a target="_blank" href="' + url + '">' + getStudyId(studyTask[i].getText('company')) + "</a>";
				sublist.setLineItemValue('custpage_company_line', i + 1, linkText);
				sublist.setLineItemValue('custpage_serviceline_line', i + 1, studyTask[i].getText('custevent_study_task_service_line'));
				sublist.setLineItemValue('custpage_study_line', i + 1, studyTask[i].getValue('title'));
				//sublist.setLineItemValue('custpage_masterstudyid_line', i+1, studyTask[i].getText('custentity_master_study','job'));	

				sublist.setLineItemValue('custpage_itemname_line', i + 1, studyTask[i].getText('custevent_itemname'));
				sublist.setLineItemValue('custpage_itempricing_line', i + 1, studyTask[i].getValue('custevent_itempricing'));
				sublist.setLineItemValue('custpage_itemunitprice_line', i + 1, studyTask[i].getValue('custevent_item_unit_price'));
				sublist.setLineItemValue('custpage_pricefromquote_line', i + 1, studyTask[i].getText('custevent_study_task_priced_from_quote'));
				sublist.setLineItemValue('custpage_salesunit_line', i + 1, studyTask[i].getText('custevent_study_task_sales_unit_type'));
				sublist.setLineItemValue('custpage_itemdescription_line', i + 1, studyTask[i].getValue('custevent_study_task_item_description'));
				sublist.setLineItemValue('custpage_salesunitdescription_line', i + 1, studyTask[i].getValue('custevent_ss_unit_description'));
				sublist.setLineItemValue('custpage_study_task_rev_rec_date_line', i + 1, studyTask[i].getText('custevent_study_task_rev_rec_date'));
				sublist.setLineItemValue('custpage_rev_rec_approved_line', i + 1, studyTask[i].getValue('custevent_rev_rec_approved'));
				sublist.setLineItemValue('custpage_study_task_finance_status_line', i + 1, studyTask[i].getText('custevent_study_task_finance_status'));
				sublist.setLineItemValue('custpage_study_task_invoice_notes_line', i + 1, studyTask[i].getValue('custevent_study_task_invoice_notes'));
				sublist.setLineItemValue('custpage_po_line', i + 1, studyTask[i].getText('custevent_po_number'));

				var urlms = nlapiResolveURL('Record', 'job', studyTask[i].getValue('custentity_master_study', 'job'), 'EDIT');
				var linkTextms = '<a target="_blank" href="' + urlms + '">' + getStudyId(studyTask[i].getText('custentity_master_study', 'job')) + "</a>";
				sublist.setLineItemValue('custpage_masterstudyid_line', i + 1, linkTextms);

				sublist.setLineItemValue('custpage_batchid_line', i + 1, studyTask[i].getValue('custevent_study_task_batch_id'));
				sublist.setLineItemValue('custpage_dateperformed_line', i + 1, studyTask[i].getValue('custevent_study_task_performed_date'));
				sublist.setLineItemValue('custpage_billable_quantity_line', i + 1, studyTask[i].getValue('custevent_itemquantity'));
				sublist.setLineItemValue('custpage_study_task_billing_notes_line', i + 1, studyTask[i].getValue('custevent_study_task_billing_notes'));

			}
		}



		sublist.addMarkAllButtons();
		sublist.addButton('custpage_update_study_task', "Generate Invoice(s)", "buttonPress_generateInvoice('" + form + "');");





		var sublistci = form.addSubList('custpage_studytaskci', 'list', 'Consolidated Invoice', 'custpage_ci');

		// add fields to the sublist
		sublistci.addField('custpage_markcheckbox_line', 'checkbox', 'Mark');
		sublistci.addField('custpage_invoicenumber_line', 'text', 'Invoice');
		sublistci.addField('custpage_invoiceorder_line', 'text', 'Invoice Order').setDisplayType("entry");

		sublistci.addField('custpage_cosolidateorder_line', 'text', 'Consolidate Invoice Order').setDisplayType("entry");

		sublistci.addField('custpage_internalid_line', 'text', 'ID');
		sublistci.addField('custpage_internalid2_line', 'text', 'ID').setDisplayType("hidden");
		sublistci.addField('custpage_customer_line', 'text', 'Client');
		sublistci.addField('custpage_company_line', 'text', 'Study', 'job');
		sublistci.addField('custpage_serviceline_line', 'text', 'Service Line');
		sublistci.addField('custpage_study_line', 'text', 'Title');

		sublistci.addField('custpage_study_task_rev_rec_date_line', 'select', 'Rev Rec Period', 'accountingperiod');
		sublistci.addField('custpage_rev_rec_approved_line', 'checkbox', 'Rev Rec Approved');
		sublistci.addField('custpage_study_task_finance_status_line', 'select', 'Finance Status', 'customlist_study_task_finance_status');
		sublistci.addField('custpage_study_task_invoice_notes_line', 'textarea', 'Invoice Notes').setDisplaySize(20, 2);
		sublistci.addField('custpage_study_task_billing_notes_line', 'textarea', 'Billing Notes').setDisplayType("entry").setDisplaySize(20, 2);
		sublistci.addField('custpage_masterstudyid_line', 'Text', 'Master Study').setDisplaySize(2);
		var pofieldinv = sublistci.addField('custpage_po_line', 'select', 'PONumber');
		sublistci.addField('custpage_itemdescription_line', 'textarea', 'Service Description').setDisplayType("entry").setDisplaySize(40, 2);
		sublistci.addField('custpage_itemname_line', 'Text', 'Item Name').setDisplaySize(2);
		sublistci.addField('custpage_itempricing_line', 'currency', 'Item Pricing').setDisplaySize(2);
		sublistci.addField('custpage_itemunitprice_line', 'currency', 'Item unit price').setDisplaySize(2);
		sublistci.addField('custpage_salesunit_line', 'Text', 'Sales Unit').setDisplaySize(2);
		sublistci.addField('custpage_salesunitdescription_line', 'textarea', 'Sales Unit Description').setDisplaySize(2);
		sublistci.addField('custpage_pricefromquote_line', 'Text', 'Priced from Quote').setDisplaySize(2);

		sublistci.addField('custpage_associatedcompoundinline_line', 'textarea', 'Compound').setDisplaySize(5);
		sublistci.addField('custpage_notes_line', 'textarea', 'Comments').setDisplaySize(20, 2);
		sublistci.addField('custpage_company_line2', 'text', 'Study').setDisplaySize(8);


		// Set PoNumber
		var posearchinv = nlapiSearchRecord('customrecord_client_po', null, null, columns);
		// pofieldinv.addSelectOption(0, '');
		for (result in posearchinv) {
			pofieldinv.addSelectOption(posearchinv[result].id, posearchinv[result].getValue('name'));
		}

		//PO Number Ends here 


		// Set all the parameters
		//var parameters = setAllParameters(request, form,'consolidateinvoice');

		// display the search results on the Custom Contact sublistci
		var studyTask = getStudyTaskSearch(parameters, 'consolidateinvoice');
		if (studyTask != null && studyTask != '') {
			var studyTaskLength = studyTask.length;
			for (var i = 0; i < studyTaskLength; i++) {
				var urlTask = nlapiResolveURL('Record', 'projecttask', studyTask[i].getValue('internalid'), 'EDIT');
				var linkTextTask = '<a target="_blank" href="' + urlTask + '">' + studyTask[i].getValue('internalid') + "</a>";
				sublistci.setLineItemValue('custpage_internalid_line', i + 1, linkTextTask);
				sublistci.setLineItemValue('custpage_internalid2_line', i + 1, studyTask[i].getValue('internalid'));

				sublistci.setLineItemValue('custpage_cosolidateorder_line', i + 1, 1);
				sublistci.setLineItemValue('custpage_invoicenumber_line', i + 1, 'Invoice: ' + studyTask[i].getValue("formulatext").toString());
				sublistci.setLineItemValue('custpage_invoiceorder_line', i + 1, studyTask[i].getValue("formulanumeric"));

				sublistci.setLineItemValue('custpage_customer_line', i + 1, studyTask[i].getText('custevent_study_task_client'));
				var url = nlapiResolveURL('Record', 'job', studyTask[i].getValue('company'), 'EDIT');
				var linkText = '<a target="_blank" href="' + url + '">' + getStudyId(studyTask[i].getText('company')) + "</a>";
				sublistci.setLineItemValue('custpage_company_line', i + 1, linkText);
				sublistci.setLineItemValue('custpage_serviceline_line', i + 1, studyTask[i].getText('custevent_study_task_service_line'));
				sublistci.setLineItemValue('custpage_study_line', i + 1, studyTask[i].getValue('title'));

				sublistci.setLineItemValue('custpage_itemname_line', i + 1, studyTask[i].getText('custevent_itemname'));
				sublistci.setLineItemValue('custpage_itempricing_line', i + 1, studyTask[i].getValue('custevent_itempricing'));
				sublistci.setLineItemValue('custpage_itemunitprice_line', i + 1, studyTask[i].getValue('custevent_item_unit_price'));
				sublistci.setLineItemValue('custpage_pricefromquote_line', i + 1, studyTask[i].getText('custevent_study_task_priced_from_quote'));
				sublistci.setLineItemValue('custpage_salesunit_line', i + 1, studyTask[i].getText('custevent_study_task_sales_unit_type'));
				sublistci.setLineItemValue('custpage_itemdescription_line', i + 1, studyTask[i].getValue('custevent_study_task_item_description'));
				sublistci.setLineItemValue('custpage_salesunitdescription_line', i + 1, studyTask[i].getValue('custevent_ss_unit_description'));
				sublistci.setLineItemValue('custpage_study_task_rev_rec_date_line', i + 1, studyTask[i].getValue('custevent_study_task_rev_rec_date'));
				sublistci.setLineItemValue('custpage_rev_rec_approved_line', i + 1, studyTask[i].getValue('custevent_rev_rec_approved'));
				sublistci.setLineItemValue('custpage_study_task_finance_status_line', i + 1, studyTask[i].getValue('custevent_study_task_finance_status'));
				sublistci.setLineItemValue('custpage_study_task_invoice_notes_line', i + 1, studyTask[i].getValue('custevent_study_task_invoice_notes'));
				sublistci.setLineItemValue('custpage_po_line', i + 1, studyTask[i].getValue('custevent_po_number'));
				//sublistci.setLineItemValue('custpage_masterstudyid_line', i+1, studyTask[i].getText('custentity_master_study','job'));	
				var urlms = nlapiResolveURL('Record', 'job', studyTask[i].getValue('custentity_master_study', 'job'), 'EDIT');
				var linkTextms = '<a target="_blank" href="' + urlms + '">' + getStudyId(studyTask[i].getText('custentity_master_study', 'job')) + "</a>";
				sublistci.setLineItemValue('custpage_masterstudyid_line', i + 1, linkTextms);
				sublistci.setLineItemValue('custpage_study_task_billing_notes_line', i + 1, studyTask[i].getValue('custevent_study_task_billing_notes'));





			}
		}

		sublistci.addMarkAllButtons();
		sublistci.addButton('custpage_update_study_task', "Generate Consolidated Invoice", "buttonPress_generateConsolidateInvoice('" + form + "');");


		var sublistall = form.addSubList('custpage_studytaskall', 'list', 'Study Tasks', 'custpage_all');

		var inlinkField = form.addField('custpage_invsearchfield', 'inlinehtml', '', null, "custpage_ready");
		if (nlapiGetContext().getEnvironment() == 'SANDBOX') {
			var url = 'https://system.sandbox.netsuite.com/app/accounting/print/printform.nl?printtype=transaction&trantype=custinvc&method=print&title=Invoices&whence=';
		}
		else if (nlapiGetContext().getEnvironment() == 'BETA') {
			var url = 'https://system.beta.netsuite.com/app/accounting/print/printform.nl?printtype=transaction&trantype=custinvc&method=print&title=Invoices&whence=';
		} 
		else {
			var url = 'https://system.na1.netsuite.com/app/accounting/print/printform.nl?printtype=transaction&trantype=custinvc&method=print&title=Invoices&whence=';
		}

		var inlinkText1 = '<font size="5"><a target="_blank" style="font-weight:bold"  href="' + url + '">' + 'Invoice to Print' + "</a></font>";
		inlinkField.setDefaultValue(inlinkText1);

		var sublistreadytosend = form.addSubList('custpage_invoice', 'list', 'Invoice Ready to Send', 'custpage_ready');



		form.addSubmitButton('Update Study Task(s)');
		response.writePage(form);

	} else {

		var recId = request.getParameter('custpage_temp_recid');
		var recType = request.getParameter('custpage_temp_rectype');
		var setTrue = null;

		var url2 = refreshSublist(request);

		//Based on the view do the process
		var view = request.getParameter('custpage_view');

		//nlapiLogExecution("Debug", "view",view);

		if (view == 'linemanager' || view == '' || view == null || view == undefined) {
			//update
			var value = 'custpage_studytasklm';
			var taskTypeIDs = [];
			var taskTypeCount = request.getLineItemCount(value);

			var j = 0;

			for (var i = 1; i <= taskTypeCount; i++) {
				// Only if the checkbox is marked
				if (request.getLineItemValue(value, 'custpage_updatecheckbox_line', i) == 'T') {
					taskTypeIDs[j] = request.getLineItemValue(value, 'custpage_internalid2_line', i); //internalid
					j += 1;

				}
			}
			if (taskTypeIDs.length > 0) {

				lmregularfields = JSON.parse(request.getParameter('custpage_regularfieldslm'));
				nlapiLogExecution("debug", "lmregularfields", JSON.stringify(lmregularfields));
				rollDownTask(taskTypeIDs);
				var setTrue = updatePricing(taskTypeIDs);
			}

		} else if (view == 'finance') {
			var value = 'custpage_studytaskfr';

			var taskTypeIDs = [];
			var taskTypeCount = request.getLineItemCount(value);
			nlapiLogExecution("Debug", "taskTypeCount", taskTypeCount);

			var j = 0;

			for (var i = 1; i <= taskTypeCount; i++) {
				// Only if the checkbox is marked
				if (request.getLineItemValue(value, 'custpage_updatecheckbox_line', i) == 'T') {
					taskTypeIDs[j] = request.getLineItemValue(value, 'custpage_internalid2_line', i); //internalid
					j += 1;

				}
			}
			if (taskTypeIDs.length > 0) {
				if (request.getParameter('custpage_regularfieldsfr') != null) { //update the modified fields
					regularfields = JSON.parse(request.getParameter('custpage_regularfieldsfr'));

					rollDownFinanceTask(taskTypeIDs);
					var setTrue = updatePricing(taskTypeIDs);

				}
				//update Pricing


				//var setTrue= true;

			}


		} else if (view == 'invoice') {

			response.setContentType('HTMLDOC');
			response.write('<html><head><script language="javascript">{self.close(); }</script></head><body></body></html>'); // 

		} else if (view == 'consolidated') {
			response.setContentType('HTMLDOC');
			response.write('<html><head><script language="javascript">{self.close(); }</script></head><body></body></html>'); // 

		} else if (view == 'all') {
			//delete
			nlapiLogExecution("Debug", "Delete Pricing");
			var priceBookItems = [];
			var pricingCount = request.getLineItemCount('custpage_pricingdelete');

			var j = 0;

			for (var i = 1; i <= pricingCount; i++) {
				// Only if the checkbox is marked
				if (request.getLineItemValue('custpage_pricingdelete', 'custpage_updatecheckbox_line', i) == 'T') {
					//priceBookItems[j]=[];
					priceBookItems[j] = request.getLineItemValue('custpage_pricingdelete', 'custpage_internalid_line', i);
					j += 1;

				}
			}
			if (priceBookItems.length > 0) {
				setTrue = deletePricing(request, priceBookItems);
			}

		} else if (view == 'close') {
			response.setContentType('HTMLDOC');
			response.write('<html><head><script language="javascript">{self.close(); }</script></head><body></body></html>'); // 
		}

		if (setTrue) {

			var url;

			if (nlapiGetContext().getEnvironment() == 'SANDBOX') {

				url = "https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=361&deploy=1&custscripttasktypeids=" + JSON.stringify(taskTypeIDs);
			}
			
			else if (nlapiGetContext().getEnvironment() == 'BETA') {

				url = "https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=361&deploy=1&custscripttasktypeids=" + JSON.stringify(taskTypeIDs);
			}
			else {
				url = "https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=361&deploy=1&custscripttasktypeids=" + JSON.stringify(taskTypeIDs);

			}


			response.setContentType('HTMLDOC');
			response.write('<html><head><script language="javascript">{ window.location.href="' + url2 + '";  }</script></head><body></body></html>'); // 



		}


	}

}


function handleResponse(response) {
	//var url2=refreshSublist(request);








	response.setContentType('HTMLDOC');
	response.write('<html><head><script language="javascript">{ window.location.href= window.location.href;  }</script></head><body></body></html>'); // 
}


/**
 * Initialize the form.
 */
function rollDownFinanceTask(taskTypeIDs) {

	try {



		if (taskTypeIDs[0] != undefined && taskTypeIDs[0] != '' && taskTypeIDs[0] != null) {
			var taskTypeLength = taskTypeIDs.length;
			if (taskTypeLength > 0) { // Update StudyTasks
				for (var i = 0; i < taskTypeLength; i++) {

					var fields = [];
					var values = [];

					var fieldsinv = [];
					var valuesinv = [];

					for (var j = 0; j < regularfields.length; j++) {
						if (regularfields[j]["id"] == taskTypeIDs[i]) {
							if (regularfields[j]["fieldname"] == 'custevent_study_task_invoiced') {
								fieldsinv.push('custevent_study_task_invoiced');
								valuesinv.push(regularfields[j]["value"]);
							} //regularfields[j]["fieldname"]=='custevent_study_task_invoiced'
							else if (regularfields[j]["fieldname"] == 'custevent_study_task_invoice_number') {
								var invoiceid = getInternalid(regularfields[j]["value"].trim());
								if (invoiceid != '' && invoiceid != 0) {
									nlapiLogExecution("Debug", "invoice internalid", invoiceid);
									fields.push('custevent_study_task_invoice_number');
									values.push(invoiceid);
								}

							} else {
								fields.push(regularfields[j]["fieldname"]);
								values.push(regularfields[j]["value"]);
//								if (regularfields[j]["fieldname"] == 'custevent_itempricing') {
//									//Either Manual Pricing Matched or No Match
//									//Determine the Status
//									var pricedfro
//									fields.push('custevent_study_task_priced_from_quote');
//									values.push(5);
//								}
							} //else	 

						} //if(regularfields[j]["id"]==taskTypeIDs[i] 
					} //for var j=0;

					nlapiSubmitField('projecttask', taskTypeIDs[i], fields, values);

					if (fieldsinv[0] != '') {
						nlapiSubmitField('projecttask', taskTypeIDs[i], fieldsinv, valuesinv); //update invoice checkbox after all the fields are updated
					}


				}
			}

		}

	} catch (err) {

		nlapiLogExecution('DEBUG', 'err', err.message);
	}
	return true;
}



function refreshSublist(request) {

	var url;
	var bool = false;
	if (nlapiGetContext().getEnvironment() == 'SANDBOX') {
		//	alert(JSON.stringify(tasktypefields) );
		url = 'https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=24&deploy=1';
	} 
	else if (nlapiGetContext().getEnvironment() == 'BETA') {
		//	alert(JSON.stringify(tasktypefields) );
		url = 'https://system.beta.netsuite.com/app/site/hosting/scriptlet.nl?script=24&deploy=1';
	}else {
		url = 'https://system.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=24&deploy=1';

	}

	for (var j = 0; j < filterFields.length; j++) {
		var fieldValue = request.getParameter(filterFields[j]);
		if (fieldValue != '' && fieldValue != null && fieldValue != 0) {
			url += '&' + filterFields[j] + '=' + fieldValue;

		}

	}


	return url;

}

function updatePricing(taskTypeIDs) {


	//nlapiLogExecution('DEBUG', 'regularfield',lmregularfields);
	var financestatus = nlapiGetContext().getSetting('SCRIPT', 'custscript_finance_status');

	financestatus = (financestatus.indexOf(",") > 0) ? financestatus.split(",") : financestatus;

	if (taskTypeIDs[0] != undefined && taskTypeIDs[0] != '' && taskTypeIDs[0] != null) {
		var taskTypeLength = taskTypeIDs.length;
		if (taskTypeLength > 0) { // Update StudyTasks
			for (var i = 0; i < taskTypeLength; i++) {

				try {
					var companyId = nlapiLookupField('projecttask', parseInt(taskTypeIDs[i]), 'company');
					var taskType = nlapiLookupField('projecttask', parseInt(taskTypeIDs[i]), 'custevent_study_task_task_type');
					var currentfinancestatus = nlapiLookupField('projecttask', parseInt(taskTypeIDs[i]), 'custevent_study_task_finance_status');

					if (financestatus.indexOf(currentfinancestatus) > -1) {
						nlapiLogExecution('DEBUG', 'taskTypeIDs[i]', taskTypeIDs[i]);
					} else {
						if (companyId != null) {

							var masterStudyID = nlapiLookupField('job', companyId, 'custentity_master_study');

							//var manualPricing = nlapiLookupField("customrecord_task_type", taskType, 'custrecord_manual_price');
							//if (manualPricing != 'T') {
								//	if(masterStudyID !=null){
								//nlapiLogExecution('DEBUG', 'taskTypeIDs[i]',taskTypeIDs[i]);
								setStudyTaskPricing(parseInt(taskTypeIDs[i].toString()), masterStudyID);

								//	}//masterStudyid != null
							//} //manualPricing !=T

						} //companyId != null
					} //else


				} catch (err) {

					nlapiLogExecution('DEBUG', 'err', err.message);
				}




			}

			return true;
		}

	}

}




function updateStudyTask(taskTypeIDs) {


	if (taskTypeIDs[0] != undefined && taskTypeIDs[0] != '' && taskTypeIDs[0] != null) {
		var taskTypeLength = taskTypeIDs.length;
		if (taskTypeLength > 0) { // Update StudyTasks
			for (var i = 0; i < taskTypeLength; i++) {
				var fields = [];
				var values = [];
				for (var j = 0; j < regularinfields.length; j++) {
					if (regularinfields[j]["id"] == taskTypeIDs[i]) {

						fields.push(regularinfields[j]["fieldname"]);
						values.push(regularinfields[j]["value"]);
						
					}
				}

				try {

					nlapiSubmitField('projecttask', taskTypeIDs[i], fields, values);

				} catch (err) {
					alert(err.message);
					nlapiLogExecution('DEBUG', 'err', err);
				}


			}

		}
	}
	return true;
}


function rollDownTask(taskTypeIDs) {


	if (taskTypeIDs[0] != undefined && taskTypeIDs[0] != '' && taskTypeIDs[0] != null) {
		var taskTypeLength = taskTypeIDs.length;
		if (taskTypeLength > 0) { // Update StudyTasks
			for (var i = 0; i < taskTypeLength; i++) {
				var fields = [];
				var values = [];

				var revrecdate = nlapiLookupField('projecttask', taskTypeIDs[i], 'custevent_study_task_rev_rec_date');

				for (var j = 0; j < lmregularfields.length; j++) {
					if (lmregularfields[j]["id"] == taskTypeIDs[i]) {
						if (lmregularfields[j]["fieldname"] == 'custevent_pass_fail' || lmregularfields[j]["fieldname"] == 'custevent_study_task_reason') {
							if (lmregularfields[j]["value"] != 0) {

								fields.push(lmregularfields[j]["fieldname"]);
								values.push(lmregularfields[j]["value"]);

							}
						} else {
							fields.push(lmregularfields[j]["fieldname"]);
							values.push(lmregularfields[j]["value"]);
						}

						if (lmregularfields[j]["fieldname"] == 'custpage_dateperformed_line' && lmregularfields[j]["value"] != 0 && lmregularfields[j]["value"] != null && (revrecdate == '' || revrecdate == 107)) {
							var revRecResult = getRevRecId(lmregularfields[j]["value"]);
							if (revRecResult != undefined) {
								fields.push('custevent_study_task_rev_rec_date');
								values.push(revRecResult);
							}
							fields.push(lmregularfields[j]["fieldname"]);
							values.push(lmregularfields[j]["value"]);
						}
						/*else if(lmregularfields[j]["fieldname"]=='custpage_task_type_linemanager_line' && lmregularfields[j]["value"] =='T'	){
							//Price the task entry
							
						} */

					}
				}

				try {

					nlapiSubmitField('projecttask', taskTypeIDs[i], fields, values);

				} catch (err) {

					nlapiLogExecution('DEBUG', 'err', err.message);
				}

			}
		}

	}
	return true;
}

function getStudyId(studyId) {
	if (studyId != null & studyId != '' && studyId != undefined) {
		var splitdata = studyId.split(":");
		if (splitdata.length > 0) {
			return splitdata[splitdata.length - 1].replace(" ", "");
		} else {
			return studyId;
		}
	}
}

/**
 * 
 * @param request
 */
function setAllParameters(request, form, option) {
	var parameters = [];
	if (request.getParameter('custpage_customer') != null && request.getParameter('custpage_customer') != '') {
		form.setFieldValues({
			custpage_customer: request.getParameter('custpage_customer')
		});
		parameters[0] = request.getParameter('custpage_customer');
	} else {
		parameters[0] = '';
	}
	if (request.getParameter('custpage_study') != null && request.getParameter('custpage_study') != '') {
		form.setFieldValues({
			custpage_study: request.getParameter('custpage_study')
		});
		parameters[1] = request.getParameter('custpage_study');
	} else {
		parameters[1] = '';
	}
	if (request.getParameter('custpage_serviceline') != null && request.getParameter('custpage_serviceline') != '') {
		form.setFieldValues({
			custpage_serviceline: request.getParameter('custpage_serviceline')
		});
		parameters[2] = request.getParameter('custpage_serviceline');
	} else {
		parameters[2] = '';
	}
	if (request.getParameter('custpage_pi') != null && request.getParameter('custpage_pi') != '') {
		form.setFieldValues({
			custpage_pi: request.getParameter('custpage_pi')
		});
		parameters[3] = request.getParameter('custpage_pi');
	} else {
		parameters[3] = '';
	}

	if (request.getParameter('custpage_fromdate') != null && request.getParameter('custpage_fromdate') != '') {
		form.setFieldValues({
			custpage_fromdate: request.getParameter('custpage_fromdate')
		});
		parameters[4] = request.getParameter('custpage_fromdate');
	} else {
		parameters[4] = '';
	}

	if (request.getParameter('custpage_todate') != null && request.getParameter('custpage_todate') != '') {
		form.setFieldValues({
			custpage_todate: request.getParameter('custpage_todate')
		});
		parameters[5] = request.getParameter('custpage_todate');
	} else {
		parameters[5] = '';
	}

	if (request.getParameter('custpage_lmapproved') != null && request.getParameter('custpage_lmapproved') != '') {
		form.setFieldValues({
			custpage_lmapproved: request.getParameter('custpage_lmapproved')
		});
		parameters[6] = request.getParameter('custpage_lmapproved');
	} else {
		parameters[6] = '';
	}
	if (request.getParameter('custpage_invoiced') != null && request.getParameter('custpage_invoiced') != '') {
		form.setFieldValues({
			custpage_invoiced: request.getParameter('custpage_invoiced')
		});
		parameters[7] = request.getParameter('custpage_invoiced');
	} else {
		parameters[7] = '';
	}
	if (request.getParameter('custpage_view') != null && request.getParameter('custpage_view') != '') {
		form.setFieldValues({
			custpage_view: request.getParameter('custpage_view')
		});
		parameters[8] = request.getParameter('custpage_view');
	} else {
		parameters[8] = '';
	}

	if (request.getParameter('custpage_financestatus') != null && request.getParameter('custpage_financestatus') != '') {
		form.setFieldValues({
			custpage_financestatus: request.getParameter('custpage_financestatus')
		});
		parameters[9] = request.getParameter('custpage_financestatus');
	} else {
		parameters[9] = '';
	}
	if (request.getParameter('custpage_lmrole') != null && request.getParameter('custpage_lmrole') != '') {
		form.setFieldValues({
			custpage_lmrole: request.getParameter('custpage_lmrole')
		});
		parameters[10] = request.getParameter('custpage_lmrole');
	} else {
		parameters[10] = '';
	}

	if (request.getParameter('custpage_billingrole') != null && request.getParameter('custpage_billingrole') != '') {
		form.setFieldValues({
			custpage_billingrole: request.getParameter('custpage_billingrole')
		});
		parameters[10] = request.getParameter('custpage_billingrole');
	} else {
		parameters[10] = '';
	}

	if (request.getParameter('custpage_total_line') != null && request.getParameter('custpage_total_line') != '') {
		form.setFieldValues({
			custpage_total_line: request.getParameter('custpage_total_line')
		});
		parameters[11] = request.getParameter('custpage_total_line');
	} else {
		parameters[11] = '';
	}
	if (request.getParameter('custpage_studyparameter') != null && request.getParameter('custpage_studyparameter') != '') {
		form.setFieldValues({
			custpage_studyparameter: request.getParameter('custpage_studyparameter')
		});
		parameters[12] = request.getParameter('custpage_studyparameter');
	} else {
		parameters[12] = '';
	}
	if (request.getParameter('custpage_revrecfromdate') != null && request.getParameter('custpage_revrecfromdate') != '') {
		form.setFieldValues({
			custpage_revrecfromdate: request.getParameter('custpage_revrecfromdate')
		});
		parameters[13] = request.getParameter('custpage_revrecfromdate');
	} else {
		parameters[13] = '';
	}

	if (request.getParameter('custpage_revrectodate') != null && request.getParameter('custpage_revrectodate') != '') {
		form.setFieldValues({
			custpage_revrectodate: request.getParameter('custpage_revrectodate')
		});
		parameters[14] = request.getParameter('custpage_revrectodate');
	} else {
		parameters[14] = '';
	}

	return parameters;
}
/**
 * 
 * @returns results
 */
function getStudyTaskSearch(parameters, type) {


	var bool = false;

	var filters = [];
	if (parameters[0] != '') {
		filters.push(new nlobjSearchFilter('customer', 'job', 'is', parameters[0]));
	}
	if (parameters[1] != '') {
		filters.push(new nlobjSearchFilter('company', null, 'is', parameters[1]));
	}
	if (parameters[2] != '') {
		filters.push(new nlobjSearchFilter('custevent_study_task_service_line', null, 'is', parameters[2]));
	}
	if (parameters[3] != '') {
		filters.push(new nlobjSearchFilter('custentity_study_pi', 'job', 'is', parameters[3]));
	}


	if (parameters[6] != '') {
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', parameters[6]));
	}

	if (parameters[7] != '') {
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', parameters[7]));
	}





	if (type == 'linemangertoapprove') {
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', 'F'));
		if (parameters[12] != '') {
			filters.push(new nlobjSearchFilter('company', null, 'is', parameters[12]));
		}
	}

	if (type == 'readytoinvoice') {
		filters.push(new nlobjSearchFilter('nonbillabletask', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_nonbillable', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('status', null, 'is', 'COMPLETE'));
		filters.push(new nlobjSearchFilter('custevent_rev_rec_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'is', 2));
	}
	if (type == 'consolidateinvoice') {
		filters.push(new nlobjSearchFilter('nonbillabletask', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_nonbillable', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('status', null, 'is', 'COMPLETE'));
		filters.push(new nlobjSearchFilter('custevent_rev_rec_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'is', 5));
	}
	if (type == 'financetoreview') {
		//	filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved',null, 'is', 'T')); //might be changing this logic later	
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));

		if (parameters[9] != '') {
			//	nlapiLogExecution("debug", "Finance Status", parameters[9]);
			bool = true;
			if (parameters[9] > 0) {
				filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'is', parameters[9]));
			} else if (parameters[9] == 0) {
				filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'anyof', '@NONE@'));
			}
		}

		if (parameters[12] != '') {
			filters.push(new nlobjSearchFilter('company', null, 'is', parameters[12]));
		}



	}



	if (parameters[4] != '' && parameters[5] != '') {
		//	nlapiLogExecution("debug", parameters[4], parameters[5]);
		filters.push(new nlobjSearchFilter('custevent_study_task_performed_date', null, 'notbefore', new Date(parameters[4])));
		filters.push(new nlobjSearchFilter('custevent_study_task_performed_date', null, 'notafter', new Date(parameters[5])));
		filters.push(new nlobjSearchFilter('custevent_study_task_performed_date', null, 'isnotempty', null));
		bool = true;
		nlapiLogExecution("debug", 'filter', JSON.stringify(filters[0]));

	}


	if (parameters[13] != '' && parameters[14] != '') {
		filters.push(new nlobjSearchFilter('startdate', 'custevent_study_task_rev_rec_date', 'notbefore', new Date(parameters[13])));
		filters.push(new nlobjSearchFilter('enddate', "custevent_study_task_rev_rec_date", 'notafter', parameters[14]));
		filters.push(new nlobjSearchFilter('startdate', "custevent_study_task_rev_rec_date", 'isnotempty', null));
		bool = true;
	}





	for (i = 0; i < 7; i++) {
		if (parameters[i] != '' && parameters[i] != null && parameters[i] != undefined) {
			bool = true;
			break;
		}
	}

	if (bool == true) {
		//nlapiLogExecution("debug", 'bool', bool);
		var columns = [];

		for (var i = 0; i < columnFields.length; i++) {
			if (columnFields[i] == 'custevent_sort_order' || columnFields[i] == 'custevent_po_number' || columnFields[i] == 'company') {
				columns.push(new nlobjSearchColumn(columnFields[i], null, null).setSort(false));
			} else if (columnFields[i] == 'custrecord_manual_price') {
				columns.push(new nlobjSearchColumn('custrecord_manual_price', 'customrecord_task_type', null));
			} else if (columnFields[i] == 'custentity_master_study') {
				columns.push(new nlobjSearchColumn('custentity_master_study', 'job', null));
			} else {
				columns.push(new nlobjSearchColumn(columnFields[i], null, null));
			}

		}


		var formula = new nlobjSearchColumn('formulanumeric').setFormula("ROW_NUMBER() OVER(PARTITION BY  {project},{custevent_po_number} ORDER BY  {project},{custevent_po_number}  ,{custevent_sort_order}) ").setSort(false);
		columns.push(formula);

		var formula2 = new nlobjSearchColumn('formulatext').setFormula("DENSE_RANK() OVER(PARTITION BY 1 ORDER BY  {project},{custevent_po_number}  ) ").setSort(false);
		columns.push(formula2);

		nlapiLogExecution("debug", "filter", JSON.stringify(filters));
		var results = nlapiSearchRecord('projecttask', null, filters, columns);

		return results;
	}

}

function getStudyTaskTotal(parameters, type) {
	var bool = false;

	var filters = [];
	if (parameters[0] != '') {
		filters.push(new nlobjSearchFilter('customer', 'job', 'is', parameters[0]));
	}
	if (parameters[1] != '') {
		filters.push(new nlobjSearchFilter('company', null, 'is', parameters[1]));
	}
	if (parameters[2] != '') {
		filters.push(new nlobjSearchFilter('custevent_study_task_service_line', null, 'is', parameters[2]));
	}
	if (parameters[3] != '') {
		filters.push(new nlobjSearchFilter('custentity_study_pi', 'job', 'is', parameters[3]));
	}


	if (parameters[6] != '') {
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', parameters[6]));
	}

	if (parameters[7] != '') {
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', parameters[7]));
	}





	if (type == 'linemangertoapprove') {
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', 'F'));
		if (parameters[12] != '') {
			filters.push(new nlobjSearchFilter('company', null, 'is', parameters[12]));
		}
	}

	if (type == 'readytoinvoice') {
		filters.push(new nlobjSearchFilter('nonbillabletask', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_nonbillable', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('status', null, 'is', 'COMPLETE'));
		filters.push(new nlobjSearchFilter('custevent_rev_rec_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'is', 2));
	}
	if (type == 'consolidateinvoice') {
		filters.push(new nlobjSearchFilter('nonbillabletask', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_nonbillable', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('status', null, 'is', 'COMPLETE'));
		filters.push(new nlobjSearchFilter('custevent_rev_rec_approved', null, 'is', 'T'));
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));
		filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'is', 5));

	}
	if (type == 'financetoreview') {
		//	filters.push(new nlobjSearchFilter('custevent_study_task_line_mgr_approved',null, 'is', 'T')); //might be changing this logic later	
		filters.push(new nlobjSearchFilter('custevent_study_task_invoiced', null, 'is', 'F'));

		if (parameters[9] != '') {
			//	nlapiLogExecution("debug", "Finance Status", parameters[9]);
			bool = true;
			if (parameters[9] > 0) {
				filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'is', parameters[9]));
			} else if (parameters[9] == 0) {
				filters.push(new nlobjSearchFilter('custevent_study_task_finance_status', null, 'anyof', '@NONE@'));
			}
		}
		if (parameters[12] != '') {
			filters.push(new nlobjSearchFilter('company', null, 'is', parameters[12]));
		}



	}



	if (parameters[4] != '' && parameters[5] != '') {
		//	nlapiLogExecution("debug", parameters[4], parameters[5]);
		filters.push(new nlobjSearchFilter('custevent_study_task_performed_date', null, 'notbefore', new Date(parameters[4])));
		filters.push(new nlobjSearchFilter('custevent_study_task_performed_date', null, 'notafter', new Date(parameters[5])));
		filters.push(new nlobjSearchFilter('custevent_study_task_performed_date', null, 'isnotempty', null));
		bool = true;
		nlapiLogExecution("debug", 'filter', JSON.stringify(filters[0]));

	}



	if (parameters[13] != '' && parameters[14] != '') {
		filters.push(new nlobjSearchFilter('startdate', 'custevent_study_task_rev_rec_date', 'notbefore', new Date(parameters[13])));
		filters.push(new nlobjSearchFilter('enddate', "custevent_study_task_rev_rec_date", 'notafter', parameters[14]));
		filters.push(new nlobjSearchFilter('startdate', "custevent_study_task_rev_rec_date", 'isnotempty', null));
		bool = true;
	}




	for (i = 0; i < 7; i++) {
		if (parameters[i] != '' && parameters[i] != null && parameters[i] != undefined) {
			bool = true;
			break;
		}
	}


	if (bool == true) {

		var columns = [];

		columns.push(new nlobjSearchColumn('custevent_itempricing', null, "sum"));
		columns.push(new nlobjSearchColumn('internalid', null, "count"));
		var results = nlapiSearchRecord('projecttask', null, filters, columns);

		return results;
	}

}




//ADDING the individual Pricing

/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       27 May 2015     rjayaraman
 *
 */

var sucolumnFields = [
                  'custevent_study_task_task_type',
                  'custevent_study_task_service_line',
                  'company',
                  'custevent_itemquantity',
                  'custevent_study_task_nonbillable',
                  'custevent_study_task_batch_id',
                  'internalid',
                  'custevent_study_task_line_mgr_approved'
];




function setStudyTaskPricing(taskId, masterStudy) {
	var results = [];

	var columnFields = [
		                  'custevent_study_task_task_type',
		                  'custevent_study_task_service_line',
		                  'company',
		                  'custevent_itemquantity',
		                  'custevent_study_task_nonbillable',
		                  'custevent_study_task_batch_id',
		                  'internalid',
		                  'custevent_study_task_line_mgr_approved'
		];


	results = nlapiLookupField('projecttask', taskId, columnFields);

	var taskColumns = new Array();
	taskColumns[0] = new nlobjSearchColumn('custevent_study_task_batch_id');
	taskColumns[1] = new nlobjSearchColumn('company');
	taskColumns[2] = new nlobjSearchColumn('internalid');
	taskColumns[3] = new nlobjSearchColumn('custevent_study_task_task_type');
	taskColumns[4] = new nlobjSearchColumn('custevent_itemquantity');
	taskColumns[5] = new nlobjSearchColumn('custevent_study_task_service_line');
	taskColumns[6] = new nlobjSearchColumn('custevent_study_task_nonbillable');


	var studySpecificPricingColumns = new Array();

	studySpecificPricingColumns[0] = new nlobjSearchColumn('custrecord_ss_pricing_item');
	studySpecificPricingColumns[1] = new nlobjSearchColumn('custrecord_ss_price');
	studySpecificPricingColumns[2] = new nlobjSearchColumn('custrecord_ss_sales_unit_type');
	studySpecificPricingColumns[3] = new nlobjSearchColumn('custrecord_ss_service_description');
	studySpecificPricingColumns[4] = new nlobjSearchColumn('custrecord_ss_sales_unit_type');
	studySpecificPricingColumns[5] = new nlobjSearchColumn('custrecord_ss_unit_description');



	if (results['custevent_study_task_task_type'] != null && results['custevent_itemquantity'] != 0) {
		var loadStudyTaskRecord = nlapiLoadRecord('projecttask', results['internalid']);
		var isManual = nlapiLookupField('customrecord_task_type', results['custevent_study_task_task_type'], 'custrecord_manual_price');

		var pricingResult = new Array();
		//Master Study Exists Get Partnumber and List Price from Master Study 

		pricingResult = searchStudyTaskItem(results['custevent_study_task_task_type'],
			results['custevent_study_task_service_line'], results['custevent_itemquantity'],
			results['custevent_study_task_nonbillable'], masterStudy);

		if (pricingResult != null) {

			if (results['custevent_study_task_nonbillable'] != 'T') {


				if (pricingResult[0].getValue(studySpecificPricingColumns[0]) != null && pricingResult[0].getValue(studySpecificPricingColumns[0]) != undefined) {
					loadStudyTaskRecord.setFieldValue('custevent_itemname', pricingResult[0].getValue(studySpecificPricingColumns[0]));


					var pricingAmount;
					var listPricingAmount;
					var quantity = loadStudyTaskRecord.getFieldValue('custevent_itemquantity');

					var unitPricing = pricingResult[0].getValue(studySpecificPricingColumns[1]);

					var listPrice = getListPrice(pricingResult[0].getValue(studySpecificPricingColumns[0]));

					if (pricingResult[0].getValue(studySpecificPricingColumns[2]) == 2) {
						pricingAmount = pricingResult[0].getValue(studySpecificPricingColumns[1]) * quantity;

						listPricingAmount = listPrice * quantity;
					} else {
						pricingAmount = pricingResult[0].getValue(studySpecificPricingColumns[1]);
						listPricingAmount = listPrice;
					}



					if (isManual == 'T') {
						//Manual Pricing
						loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote',7);
						if (loadStudyTaskRecord.getFieldValue('custevent_itempricing') == null) {
							loadStudyTaskRecord.setFieldValue('custevent_itempricing', pricingAmount);
						}


					} else {
						loadStudyTaskRecord.setFieldValue('custevent_itempricing', pricingAmount);

						if (loadStudyTaskRecord.getFieldValue('custevent_study_task_line_mgr_approved') == 'F') {
							loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 4);
						} else {
							loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 2);
						}


					}


					loadStudyTaskRecord.setFieldValue('custevent_master_pricing', listPricingAmount);
					loadStudyTaskRecord.setFieldValue('custevent_study_task_item_description', pricingResult[0].getValue(studySpecificPricingColumns[3]));
					loadStudyTaskRecord.setFieldValue('custevent_study_task_sales_unit_type', pricingResult[0].getValue(studySpecificPricingColumns[4]));
					loadStudyTaskRecord.setFieldValue('custevent_item_unit_price', unitPricing);
					loadStudyTaskRecord.setFieldValue('custevent_ss_unit_description', pricingResult[0].getValue(studySpecificPricingColumns[5]));

				} else {
					if (isManual == 'T') {
						//Manual Pricing No Match
						if (loadStudyTaskRecord.getFieldValue('custevent_study_task_priced_from_quote') != 8) {
							loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 8);
						}
					} else {
						loadStudyTaskRecord.setFieldValue('custevent_itempricing', '');
						loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 3);

					}

					loadStudyTaskRecord.setFieldValue('custevent_item_unit_price', '');
					loadStudyTaskRecord.setFieldValue('custevent_study_task_sales_unit_type', '');
					loadStudyTaskRecord.setFieldValue('custevent_ss_unit_description', '');

				}


			} else { //Non Billable

				var itemPricingColumns = new Array();
				itemPricingColumns[0] = new nlobjSearchColumn('internalid');
				//		nlapiLogExecution('debug','Non Billable Item Name ',pricingResult[0].getText(itemPricingColumns[0]));
				loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 6);
				loadStudyTaskRecord.setFieldValue('custevent_itemname', pricingResult[0].getValue(itemPricingColumns[0]));
				loadStudyTaskRecord.setFieldValue('custevent_master_pricing', '');
				loadStudyTaskRecord.setFieldValue('custevent_item_unit_price', '');
				loadStudyTaskRecord.setFieldValue('custevent_itempricing', '');
				loadStudyTaskRecord.setFieldValue('custevent_study_task_sales_unit_type', '');
				loadStudyTaskRecord.setFieldValue('custevent_ss_unit_description', '');


			} //Non Billable

		} //pricingResult !=null
		else {
			if (isManual == 'T') {
				//Manual Pricing No Match
				if (masterStudy != null && masterStudy != '' && masterStudy != undefined) {
					if (loadStudyTaskRecord.getFieldValue('custevent_study_task_priced_from_quote') != 8) {
						loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 8);
					}	
		
				}
				else{//master Studyid is null then Not Priced
					loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote',1);//Not Priced

				}
				
			} else {
				loadStudyTaskRecord.setFieldValue('custevent_itempricing', '');
				if (masterStudy != null && masterStudy != '' && masterStudy != undefined) {
				loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 3);
				}
				else{
					loadStudyTaskRecord.setFieldValue('custevent_study_task_priced_from_quote', 1);//Not Priced
				}
			
			}

			loadStudyTaskRecord.setFieldValue('custevent_item_unit_price', '');
			loadStudyTaskRecord.setFieldValue('custevent_study_task_sales_unit_type', '');
			loadStudyTaskRecord.setFieldValue('custevent_ss_unit_description', '');
		}

		nlapiSubmitRecord(loadStudyTaskRecord);

	}
}









//Get Study Tasks that are not (Invoiced, Priced)
function getStudyTasks(studyId, str) {

	var taskFilters = new Array();
	if (str == 'MasterStudyExists') {
		var search = nlapiLoadSearch('projectTask', 'customsearch_agx_studytask_notpriced');
		//Used Filters Non-Billable =false, Status=Complete, Invoice=False,PriceBookItem =none, Study Status is not Study Complete 

	} else {
		var search = nlapiLoadSearch('projectTask', 'customsearch_agx_studytask_nomasterstudy');
	}

	var taskFilters = new Array();

	if (studyId != null && studyId != '') {
		search.addFilter(new nlobjSearchFilter('company', null, 'is', studyId));

		taskFilters = search.getFilters();


		var taskColumns = new Array();

		taskColumns[0] = new nlobjSearchColumn('custevent_study_task_batch_id');
		taskColumns[1] = new nlobjSearchColumn('company');
		taskColumns[2] = new nlobjSearchColumn('internalid');
		taskColumns[3] = new nlobjSearchColumn('custevent_study_task_task_type');
		taskColumns[4] = new nlobjSearchColumn('custevent_itemquantity');
		taskColumns[5] = new nlobjSearchColumn('custevent_study_task_service_line');
		taskColumns[6] = new nlobjSearchColumn('custevent_study_task_nonbillable');

		var results = nlapiSearchRecord('projectTask', null, taskFilters, taskColumns);
		return results;
	}

	return false;

}




function searchStudyTaskItem(taskType, serviceLine, quantity, taskTypenonbillable, masterStudyid) {

	var condition = new Array();
	condition[0] = taskType;
	condition[1] = serviceLine;

	var results = new Array();

	if (taskTypenonbillable == 'T') {
		condition[2] = 2; //Item Category
		condition[3] = 'T'; //non billable

		results = searchResultsNonBillable(condition);
		return results;
	} else {
		//for Billable Task Type get the pricing from Master Price BookItem
		condition[2] = quantity;
		condition[3] = quantity;
		if (masterStudyid != null && masterStudyid != '' && masterStudyid != undefined) {
			condition[4] = masterStudyid;
			results = searchResults(condition, true, 0);
			return results;
		} else {
			results = searchResultsMasterPricing(condition, true, 0);

			return results;


		}


	}

}

function searchResults(condition, flag, level) {

	var masterPricingSearchresults;

	var studySpecificPricingColumns = new Array();


	var studySpecificPricingFilters = new Array();
	studySpecificPricingFilters[0] = new nlobjSearchFilter('custrecord_ss_pricing_task_type', null, 'is', condition[0]);

	studySpecificPricingFilters[1] = new nlobjSearchFilter('custrecord_ss_pricing_service_line', null, 'is', condition[1]);

	studySpecificPricingFilters[2] = new nlobjSearchFilter('custrecord_ss_range_start', null, 'lessthanorequalto', condition[2]);

	if (flag == true) {
		studySpecificPricingFilters[3] = new nlobjSearchFilter('custrecord_ss_range_end', null, 'greaterthanorequalto', condition[3]);
	} else if (flag == false) {
		studySpecificPricingFilters[3] = new nlobjSearchFilter('custrecord_ss_range_end', null, 'isempty');
	}

	if (condition[4] != null && condition[4] != '' && condition[4] != undefined) {
		studySpecificPricingFilters[4] = new nlobjSearchFilter('custrecord_ss_pricing_master_study', null, 'is', condition[4]);
	}


	studySpecificPricingColumns[0] = new nlobjSearchColumn('custrecord_ss_pricing_item');
	studySpecificPricingColumns[1] = new nlobjSearchColumn('custrecord_ss_price');
	studySpecificPricingColumns[2] = new nlobjSearchColumn('custrecord_ss_sales_unit_type');
	studySpecificPricingColumns[3] = new nlobjSearchColumn('custrecord_ss_service_description');
	studySpecificPricingColumns[4] = new nlobjSearchColumn('custrecord_ss_sales_unit_type');
	studySpecificPricingColumns[5] = new nlobjSearchColumn('custrecord_ss_unit_description');

	masterPricingSearchresults = nlapiSearchRecord('customrecord_study_specific_pricing', null, studySpecificPricingFilters, studySpecificPricingColumns);






	if (masterPricingSearchresults == null) {
		if (level > 1) {
			return null;
		} else {
			level = level + 1;
			return searchResults(condition, false, level);
		}

	} else if (masterPricingSearchresults != null) {
		return masterPricingSearchresults;
	}

}


function searchResultsNonBillable(condition) {


	var itemPricingFilters = new Array();
	itemPricingFilters[0] = new nlobjSearchFilter('class', null, 'is', condition[1]);
	itemPricingFilters[1] = new nlobjSearchFilter('custitem_item_category', null, 'is', condition[2]);
	itemPricingFilters[2] = new nlobjSearchFilter('custitem_price_book_item_nonbillable', null, 'is', condition[3]);



	var itemPricingColumns = new Array();
	itemPricingColumns[0] = new nlobjSearchColumn('internalid');


	var itemPricingSearchresults = nlapiSearchRecord('serviceitem', null, itemPricingFilters, itemPricingColumns);

	return itemPricingSearchresults;



}

function searchResultsMasterPricing(condition, flag, level) {

	var masterPricingSearchresults;

	var masterPricingColumns = new Array();


	var masterPricingFilters = new Array();
	masterPricingFilters[0] = new nlobjSearchFilter('custrecord_master_pricing_task_type', null, 'is', condition[0]);
	masterPricingFilters[1] = new nlobjSearchFilter('custrecord_master_pricing_service_line', null, 'is', condition[1]);
	masterPricingFilters[2] = new nlobjSearchFilter('custrecord_range_start', null, 'lessthanorequalto', condition[2]);

	if (flag == true) {
		masterPricingFilters[3] = new nlobjSearchFilter('custrecord_range_end', null, 'greaterthanorequalto', condition[3]);
	} else if (flag == false) {
		masterPricingFilters[3] = new nlobjSearchFilter('custrecord_range_end', null, 'isempty');
	}


	masterPricingColumns[0] = new nlobjSearchColumn('custrecord_master_pricing_item');
	masterPricingColumns[1] = new nlobjSearchColumn('custrecord_price');
	masterPricingColumns[2] = new nlobjSearchColumn('custrecord_sales_unit_type');


	masterPricingSearchresults = nlapiSearchRecord('customrecord_master_pricing', null, masterPricingFilters, masterPricingColumns);




	if (masterPricingSearchresults == null) {
		if (level > 1) {
			return null;
		} else {
			level = level + 1;
			return searchResultsMasterPricing(condition, false, level);
		}

	} else if (masterPricingSearchresults != null) {


		return masterPricingSearchresults;


	}

}


function getListPrice(item) {

	var masterPricingSearchresults;

	var masterPricingColumns = new Array();


	var masterPricingFilters = new Array();
	masterPricingFilters[0] = new nlobjSearchFilter('custrecord_master_pricing_item', null, 'is', item);

	masterPricingColumns[0] = new nlobjSearchColumn('custrecord_price');

	masterPricingSearchresults = nlapiSearchRecord('customrecord_master_pricing', null, masterPricingFilters, masterPricingColumns);

	if (masterPricingSearchresults != null) {
		return masterPricingSearchresults[0].getValue(masterPricingColumns[0]);;
	} else {
		return 0;
	}



}

function getInternalid(invoiceName) {

	var Searchresults;

	var Columns = new Array();


	var Filters = new Array();
	Filters[0] = new nlobjSearchFilter('tranid', null, 'startswith', invoiceName);

	Columns[0] = new nlobjSearchColumn('internalid');

	Searchresults = nlapiSearchRecord('invoice', null, Filters, Columns);

	if (Searchresults != null) {
		return Searchresults[0].getValue(Columns[0]);
	} else {
		return 0;
	}



}