<?php
class Registration extends CI_Controller{
	public function __construct()
        {
                parent::__construct();
                $this->load->helper('form');
                $this->load->helper('url');
                $this->load->helper('html');
                $this->load->library('form_validation');
                $this->load->library('session');
                $this->load->model('Userdata');
        }
	public function index(){
		echo $this->session->userdata('userid');
		if($this->session->userdata('userid'))
		{	
			$t=$this->Userdata->getType($this->session->userdata('userid'));
			foreach ($t as $t1) {
				$type=$t1['type'];
			}
			$data['type']=$type;
			$data['page']="1";
			$data['info']=$this->Userdata->getinfo($this->session->userid);
			$data['inupdation']=NULL;
			$this->load->view('dashboard',$data);
		}
		else{
		$this->load->view('registration');
		}
	}
	public function isuserunique($str){
		if($this->Userdata->getUser($str)==0)
			return TRUE;
		else
		{
			$this->form_validation->set_message('isuserunique','Username must be unique');
			return FALSE;
		}
	}
	public function ispasswordunique($str){
		if($this->Userdata->getPassword($str)==0)
			return TRUE;
		else
		{
			$this->form_validation->set_message('ispasswordunique','Password must be unique');
			return FALSE;
		} 
	}
	public function validate(){
		$this->form_validation->set_rules('Username','Username','required|callback_isuserunique');
		$this->form_validation->set_rules('Password','Password','required|callback_ispasswordunique');
		$this->form_validation->set_rules('Email','Email','required|valid_email');
		$this->form_validation->set_rules('Contact','Contact','required|numeric|exact_length[10]');
		$this->form_validation->set_rules('Firstname','Firstname','required');
		$this->form_validation->set_rules('Lastname','Lastname','required');
		if($this->form_validation->run()==FALSE)
		{	
			$data['profile']=array($this->input->post('Username'),$this->input->post('Password'),$this->input->post('Firstname'),$this->input->post('Lastname'),$this->input->post('Email'),$this->input->post('Contact'));
			$this->load->view('registration',$data);
		}
		else
		{
			$this->Userdata->insertUser($this->input->post('Username'),$this->input->post('Password'),$this->input->post('Email'),(int) $this->input->post('Contact'),$this->input->post('Firstname'),$this->input->post('Lastname'));
			$data=array(
				'user'=>$this->input->post('Username'),
				'password'=>$this->input->post('Username')
				);
			$data['inupdation']=NULL;
			$data['type']="end";
			$data['page']="1";
			$data['info']=$this->Userdata->getinfo($this->session->userid);
			$useri=$this->Userdata->getUserinfo($this->input->post('Username'));
			$this->session->set_userdata('user',$this->input->post('Username'));
		foreach ($useri as $user) {
				$id=$user['uid'];
			}
			$this->session->set_userdata('userid',$id);
			$this->load->view('dashboard',$data);
		}
	}
	public function logout(){
		$this->session->unset_userdata('user');
		$this->session->unset_userdata('userid');
		return redirect('registration');
	}
	public function isuserexist($str){
		if($this->Userdata->getUser($str)==0)
			{$this->form_validation->set_message('isuserexist','Username does not exist');
			return FALSE;
		}
		else{
			return TRUE;
		}
	}
	public function ispasswordexist($str){
		if($this->Userdata->getPassword($str)==0)
		{
			$this->form_validation->set_message('ispasswordexist','Password does not exist');
			return FALSE;
		}
		else{
			return TRUE;
		}
	}
	public function login(){

		$this->form_validation->set_rules('Username','Username','required|callback_isuserexist');
		$this->form_validation->set_rules('Password','Password','required|callback_ispasswordexist');
		if($this->form_validation->run()==FALSE)
		{	
			$this->load->view('registration');
		}
		else
		{
			$useri=$this->Userdata->getUserinfo($this->input->post('Username'));
			$this->session->set_userdata('user',$this->input->post('Username'));
			$this->session->set_userdata('password',$this->input->post('Password'));
			foreach ($useri as $user) {
				$id=$user['uid'];
			}
			$this->session->set_userdata('userid',$id);

			$t=$this->Userdata->getType($id);
			foreach ($t as $t1) {
				$type=$t1['type'];
			}
			$data['info']=$this->Userdata->getinfo($this->session->userid);
			$this->session->set_userdata('type',$type);
			$data['type']=$type;
			$data['page']="1";
			$data['inupdation']=NULL;
			$this->load->view('dashboard',$data);
			
		}
	}
	
}