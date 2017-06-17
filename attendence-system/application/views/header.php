
<!DOCTYPE html>
<html>
	<head>
	<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/paper/bootstrap.min.css">
		
		<style type="text/css">
			body{
					background-color: #5B5B51;
				}

			.new{
					float:right;
				}
			.btn{
					margin:1%;
				}
			#profile{
					width:30%;
					float:left;
					margin:5%;
				}
			#action{
				width:40%;
				float:left;
				margin:5%;
			}
			.change{
				float:right;
			}
			header{
				margin:-1.5%;
				background:#BBBBBB;
			}
		</style>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<title>welcome <?= $this->session->user?></title>
	
	</head>
	<body>
		<nav class="navbar navbar-default">
			<center><a href="<?= base_url()."index.php/Dashboard/changepage/1"?>">
				<button class="btn btn-default">1</button>
			</a>
			<a href="<?= base_url()."index.php/Dashboard/changepage/2"?>">
				<button class="btn btn-default">2</button>
			</a></center>
		</nav>


