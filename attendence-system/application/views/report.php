<?php include('header.php');?>
<div class="container" style="background:white; width:40%;margin:5%;float:left;">
	<?php
	$this->table->set_template(array('table_open'=>'<table class="table table-striped table-hover">','row_start'=>' <tr class="success">'));
	$this->table->set_heading('Action','Date','Time');
	echo $this->table->generate($report);
	echo date('Y-m-d',strtotime($report[0]["date"]));
	print_r($report);
	echo date("H:i:s",strtotime($report[0]["time"]));
	echo date('l',strtotime($report[0]["date"]));
	?>
</div>
<div class="container" style="background:white; width:40%;margin:5%;float:left;">
	<center>
		<h3>Working Hours</h3><br>
		<?php if($type=="end" or $type=="break"):?>
		<h4><?php 
		$re=array_reverse($report);
		//print_r($re);
		$i=0;
		$r1=[];
		$r2=[];
		foreach($re as $redash){
			if($i%2==0)
			{
				$r1[]=new DateTime($redash["date"]." ".$redash["time"]);
			}
			else
			{
				$r2[]=new DateTime($redash["date"]." ".$redash["time"]);
			}
			$i++;
		}
		//print_r($r2);
		$diff=[];
		$size=count($r1);
		for($i=0;$i<$size;$i=$i+1){
		
			$diff[]=$r2[$i]->diff($r1[$i]);
			
		}

		$e=new DateTime("0000-00-00 00:00:00");
		$f=clone $e;
		foreach($diff as $di)
		{
			$e->add($di);
		}
		echo $e->format("H:i:s");
		//print_r($diff);
		?></h4>
		<?php else:?>
		<h4>Please Break or end to have a look at working hours.</h4>
		<?php endif;?>
	</center>
</div>
</body>
</html>