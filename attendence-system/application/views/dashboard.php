<?php include('header.php');?>
	<header>
			<div class="container">
				<center>
					<h2>Welcome <?= $this->session->user?></h2>
				</center>
				<div class="new">
					<a href="<?= site_url('Registration/logout/')?>">
						<button class="btn btn-danger">
							logout
						</button>
					</a>
					<?= br(2);?>
				</div>
			</div>
	</header>
	<div class="container">
	<div class="panel panel-info" id="profile">
		<div class="panel-heading profile">
			Your profile
		</div>
		<div class="panel-body profileinfo">
		<?php foreach($info as $in):?>
			<?php while($field_name=current($in))
					{
						if($inupdation!=key($in))
						{echo ucwords(key($in)).":".$in[key($in)]."<a href=\"".site_url('Dashboard/change/'.key($in))."\"><button class=\"btn btn-default change\">change</button></a>";
						echo br(3);}
						else
							{
							echo ucwords(key($in));
							echo form_open('Dashboard/cparam');
							echo form_label(key($in),key($in));
							echo form_hidden('fieldname',key($in));
							echo form_input(key($in),$in[key($in)]);
							echo form_error(key($in));
							echo form_submit('','update');
							echo form_close();
						}
						next($in);
				}
			?>

	
			<?php endforeach;?>
		</div>
	</div>
	<div class="panel panel-info" id="action">
		<div class="panel-heading action">
			<h3 class="panel-title"><center>Actions</center></h3>
		</div>
		<div class="panel-body content">
			<?php if($type=="end"):?>
					<center>
						<a href="<?= site_url('Dashboard/action/'.$this->session->userid.'/start')?>">
							<button class="btn btn-success">start</button>
						</a>
					</center>
			<?php elseif($type=="start"):?>
					<center>
						<a href="<?= site_url('Dashboard/action/'.$this->session->userid.'/end')?>">
							<button class="btn btn-danger">end</button>
						</a>
						<a href="<?= site_url('Dashboard/action/'.$this->session->userid.'/break')?>">
							<button class="btn btn-primary">break</button>
						</a>
					</center>
			<?php elseif($type=="break"):?>
					<center>
						<a href="<?= site_url('Dashboard/action/'.$this->session->userid.'/breakout')?>">
							<button class="btn btn-primary">breakout</button>
						</a>
					</center>
			<?php else:?>
					<center>
						<a href="<?= site_url('Dashboard/action/'.$this->session->userid.'/break')?>">
							<button class="btn btn-primary">break</button>
						</a>
						<a href="<?= site_url('Dashboard/action/'.$this->session->userid.'/end')?>">
							<button class="btn btn-danger">end</button>
						</a>
					</center>
			<?php endif;?>
		</div>
	</div>
	</div>
<script type="text/javascript">
	$(document).load(function(){$('.content').slideUp();$('.profileinfo').slideUp();});
	$('.action').click(function(){$('.content').slideToggle();});
	$('.profile').click(function(){$('.profileinfo').slideToggle();});
</script>
</body>
</html>