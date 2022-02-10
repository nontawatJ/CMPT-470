var users = [];
var userNum = 0;
var ite = 0;

/*set max date input to today*/
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){
        dd='0'+dd;
} 
if(mm<10){
        mm='0'+mm;
} 

today = yyyy+'-'+mm+'-'+dd;



function openForm() {
	document.getElementById("usersForm").style.display = "block";
	document.getElementById('bdate').max = today;
}
function closeForm() {
	document.getElementById('usersForm').style.display = "none";
	document.getElementById('userName').value = '';
	document.getElementById('email').value = '';
	document.getElementById('bdate').value = '';
	document.getElementById("userName").style.border = "3px solid black";
	document.getElementById("email").style.border = "3px solid black";
	document.getElementById("bdate").style.border = "3px solid black";
}

function print(avgAge) {
	table = document.getElementById('table');
	var newRow = table.insertRow(table.rows.length-1);
	for (var j=0;j<4;j++)
	{
		var cell = newRow.insertCell(j);
		cell.innerHTML = users[userNum][j];
	}

	document.getElementById('average').innerHTML = avgAge;
}
function calcAge(bdate) {
	var split_dob = bdate.split("-");
	var dob_year = split_dob[0];
	var dob_month = split_dob[1];
	var dob_date = split_dob[2];
	var t = new Date();
	var t_y = t.getFullYear();
	var t_m = t.getMonth()+1;
	var t_d = t.getDate();
	var age = t_y - dob_year;
	if (t_m < dob_month || (t_m == dob_month && t_d < dob_date)) 
	{
		age--;
	}
	
	return age;
}
function calcAvg() {
	var sum = 0;
	for (var i=0;i<=userNum;i++)
	{
		sum += users[i][3];
	}
	var avg = sum/(userNum+1);
	avg = avg.toFixed(3);
	return avg;
}
function addUser() {

	var x = false;
	var name,email,bdate ="";
	while(x == false)
	{
		name = document.getElementById('userName').value;
		email = document.getElementById('email').value;
		bdate = document.getElementById('bdate').value;
		var check = /^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-z0-9A-Z]{2,4}$/;
		var vad = check.test(email);
		
		
		if (name == null || name == "")
		{
			document.getElementById("userName").style.border = "5px solid red";
			document.getElementById("email").style.border = "3px solid black";
			document.getElementById("bdate").style.border = "3px solid black";
			return false;
		}
		else if (vad == false)
		{
			document.getElementById("userName").style.border = "3px solid black";
			document.getElementById("email").style.border = "5px solid red";
			document.getElementById("bdate").style.border = "3px solid black";
			return false;
		}
		else if (bdate == null ||bdate =="")
		{
			document.getElementById("userName").style.border = "3px solid black";
			document.getElementById("email").style.border = "3px solid black";
			document.getElementById("bdate").style.border = "5px solid red";
			return false;
		}
		else
		{
			document.getElementById("userName").style.border = "3px solid black";
			document.getElementById("email").style.border = "3px solid black";
			document.getElementById("bdate").style.border = "3px solid black";
			x= true;
		}
	}

/*	var name = document.getElementById('userName').value;
	var email = document.getElementById('email').value;
	var bdate = document.getElementById('bdate').value;*/
	var age = calcAge(bdate);
	var user = [name,email,bdate,age];
	users[userNum] = user;
	var avgAge = calcAvg();

	print(avgAge)
	userNum++;
	document.getElementById('num').innerHTML = userNum;


	document.getElementById('usersForm').style.display = "none";
	document.getElementById('userName').value = '';
	document.getElementById('email').value = '';
	document.getElementById('bdate').value = '';

}
function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, ord, switchcount = 0;
	table = document.getElementById("table");
	switching = true;
	ord = "asc";
	while (switching) 
	{
		switching = false;
	    rows = table.rows;
	    for (i = 1; i < (rows.length - 2); i++) {
	      shouldSwitch = false;
	      x = rows[i].getElementsByTagName("TD")[n];
	      y = rows[i + 1].getElementsByTagName("TD")[n];
	      if (ord == "asc") {
	        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
	          shouldSwitch = true;
	          break;
	        }
	      } else if (ord == "desc") {
	        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
	          shouldSwitch = true;
	          break;
	        }
	      }
	    }
	    if (shouldSwitch) {
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      switchcount ++;
	    } else {
	      if (switchcount == 0 && ord == "asc") {
	        ord = "desc";
	        switching = true;
	      }
	    }
	  }
}
