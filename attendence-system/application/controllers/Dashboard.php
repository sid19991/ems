<?php
class Dashboard extends CI_Controller{
	public function __construct()
        {
                parent::__construct();
                $data=array('form','url','html');
                $this->load->helper($data);
                $this->load->library('form_validation');
                $this->load->library('session');
                $this->load->model('Userdata');
                $this->load->library('table');
        }

	public function action($str, $type){
		//$type="start";
		$data['type']=$type;
		$data['page']="1";
		$data['info']=$this->Userdata->getinfo($this->session->userid);
		$data['inupdation']=NULL;
		$this->Userdata->insertAttendence($str,$type);
		$this->load->view('dashboard',$data);
	}
	public function changepage($page){
		
		$data['type']=$this->session->type;
		$data['info']=$this->Userdata->getinfo($this->session->userid);
		$data['inupdation']=NULL;
		if($page=="1")
		{	
			$this->load->view('dashboard',$data);
		}
		else
		{
			$data['report']=$this->Userdata->getAttendence($this->session->userid);
			$this->load->view('report',$data);
		}
	}
	public function isuserunique($str){

		if($this->Userdata->getUser($str)==0 or $str==$this->session->user)
			return TRUE;
		else
		{
			$this->form_validation->set_message('isuserunique','Username must be unique');
			return FALSE;
		}
	}
	public function ispasswordunique($str){
		if($this->Userdata->getPassword($str)==0 or $str==$this->session->password)
			return TRUE;
		else
		{
			$this->form_validation->set_message('ispasswordunique','Password must be unique');
			return FALSE;
		} 
	}
	public function cparam()
	{	
		//echo $this->input->post('fieldname')." ".$this->input->post($this->input->post('fieldname'));
		if($this->input->post('fieldname')=='username')
		{
			$this->form_validation->set_rules($this->input->post('fieldname'),$this->input->post('fieldname'),'required|callback_isuserunique');
		}
		else if($this->input->post('fieldname')=='password')
		{
			$this->form_validation->set_rules($this->input->post($this->input->post('fieldname')),$this->input->post($this->input->post('fieldname')),'required|callback_ispasswordUnique');
		}
		else if($this->input->post('fieldname')=='email')
		{
			$this->form_validation->set_rules($this->input->post($this->input->post('fieldname')),$this->input->post($this->input->post('fieldname')),'required|email');
		}
		else if($this->input->post('fieldname')=='contactno')
		{
			$this->form_validation->set_rules($this->input->post($this->input->post('fieldname')),$this->input->post($this->input->post('fieldname')),'required|exact_length[10]');
		}
		else 
		{
			$this->form_validation->set_rules($this->input->post('fieldname'),$this->input->post('fieldname'),'required');
		}
		if($this->form_validation->run()==FALSE)
		{	
			//echo $this->input->post('fieldname')." ".$this->input->post($this->input->post('fieldname'));
			$data['type']=$this->session->type;
			$data['info']=$this->Userdata->getinfo($this->session->userid);
			$data['page']="1";
			$data['inupdation']=$this->input->post('fieldname');
			$this->load->view('dashboard',$data);
		}
		else
		{	
			
			//echo $this->input->post('fieldname')." ".$this->input->post($this->input->post('fieldname'));
			$this->Userdata->changeparam($this->session->userid,$this->input->post('fieldname'),$this->input->post($this->input->post('fieldname')));
			$data['type']=$this->session->type;
			$data['info']=$this->Userdata->getinfo($this->session->userid);
			$data['page']="1";
			$data['inupdation']=NULL;
			$this->load->view('dashboard',$data);
			//echo $this->input->post('fieldname')." ".$this->input->post($this->input->post('fieldname'));
		}
	}
	public function change($key){
		$data['inupdation']=$key;
		$data['type']=$this->session->type;
		$data['page']="1";
		$data['info']=$this->Userdata->getinfo($this->session->userid);
		$this->load->view('dashboard',$data);
	}
}