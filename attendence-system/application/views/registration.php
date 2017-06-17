<!DOCTYPE html>
<html>
<head>
	<title>Registration for New employee</title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/paper/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="http://localhost/attandence-system/assets/registration.css">
	<style type="text/css">

	</style>
</head>
<body>
<header>
	<div class="jumbotron">
  <center><h1>Employee Attendence System</h1></center>
 
</div>
</header>
	<div class="form">
		<?= form_open('Registration/validate',array('class'=>'form-horizontal'));?>
	<?= form_fieldset('Registration');?>
	<?= form_label('Firstname','Firstname',array('class'=>'control-label'));?>	
	<?= form_input('Firstname','',array('id'=>'inputEmail'));?>
	<?= br(2);?>
	<?= form_error('Firstname','<div class="error">','</div>');?>
	<?= form_label('Lastname','Lastname');?>
	<?= form_input('Lastname','',array('id'=>'inputEmail'));?>
	<?= form_error('Lastname','<div class="error">','</div>');?>
	<?= br(2);?>
	
	<?= form_label('Username','Username');?>
	<?= form_input("Username",'',array('id'=>'inputEmail'));?>
	<?= form_error('Username','<div class="error">','</div>');?>
	<?= br(2);?>
	<?= form_label('Password','Password');?>
	<?= form_password('Password','',array('id'=>'inputPassword'));?>
	<?= form_error('Password','<div class="error">','</div>');?>
	<?= br(2);?>
	<?= form_label('Email','Email');?>
	<?= form_input('Email','',array('id'=>'inputEmail'));?>
	<?= form_error('Email','<div class="error">','</div>');?>
	<?= br(2);?>
	<?= form_label('Contact','Contact');?>
	<?= form_input('Contact','',array('class'=>'inputEmail'));?>
	<?= form_error('Contact','<div class="error">','</div>');?>
	<?= br(2);?>
	<center><?= form_submit('Register','Register',array('class'=>'btn btn-primary'));?></center>
	<?= form_fieldset_close();?>
	<?= form_close();?>
</div>
<div class="form">
 <?= form_open('Registration/login');?>
 <?= form_fieldset('Log In');?>
 <?= form_label('Username','Username');?> 
 <?= form_input("Username",'',array('class'=>'InputEmail'));?>
 <?= form_error('Username','<div class="error">','</div>');?>
 <?= br(2);?>
 <?= form_label('Password','Password');?>
 <?= form_password('Password','',array('id'=>'InputPassword'));?>
 <?= br(2);?>
 <?= form_error('Password','<div class="error">','</div>');?>
 <center><?= form_submit('mysubmit','Login',array('class'=>'btn btn-primary'));?></center>
<?= form_fieldset_close();?>
 <?= form_close();?>
 </div>
</body>
</html>