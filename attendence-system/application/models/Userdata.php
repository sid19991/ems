<?php
class Userdata extends CI_Model{
	public function __construct()
        {
                parent::__construct();
                $this->load->database();
        }

	public function getUser($str){
		$qry=$this->db->select('firstname')->where('username',$str)->get('userinfo');
		return $qry->num_rows();
	}
	public function getPassword($str){
		$qry=$this->db->select('firstname')->where('password',$str)->get('userinfo');
		return $qry->num_rows();
	}
	public function insertUser($username,$password,$email,$contact,$firstname,$lastname)
	{
		$this->db->insert('userinfo',array('username'=>$username,'password'=>$password,'firstname'=>$firstname,'lastname'=>$lastname,'email'=>$email,'contactno'=>$contact));
	}
	public function getUserinfo($str){
		$qry=$this->db->select('uid')->where('username',$str)->get('userinfo');
		return $qry->result_array();
	}
	public function getType($str){
		$qry=$this->db->select('type')->where('uid',$str)->get('attendance');
		return $qry->result_array();
	}
	public function insertAttendence($str,$type){
		$date=date("Y-m-d");
		$time=date("H:i:s");
		$this->db->insert('attendance',array('uid'=>$str,'type'=>$type,'time'=>$time,'date'=>$date));

	}
	public function getinfo($User){
		$qry=$this->db->select(array('firstname','lastname','username','password','contactno','email'))->where('uid',$User)->get('userinfo');
		return $qry->result_array();
	}
	public function changeparam($User,$para,$value){
		
		
			$this->db->update('userinfo',array($para=>$value),array('uid'=>$User));
			
	}
	public function getAttendence($uid){
		$qry=$this->db->select(array('type'=>'type','date_format( date, "%d-%m-%Y" ) as date','time'=>'time'))->where('uid',$uid)->get('attendance');
		return $qry->result_array(); 
	}
}