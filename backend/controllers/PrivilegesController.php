<?php
namespace backend\controllers;

use Yii;
use common\lib\Response;

use yii\web\Request;
use yii\web\Session;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\db\Query;

use backend\models\ItemChild;

class PrivilegesController extends Controller {
	/***/
	/**
	 * 获取导航栏功能列表
	 */
	public function actionNavList() {
		$auth = Yii::$app->authManager;
		$user_id = Yii::$app->user->id;
		$roles =  $auth->getRolesByUser($user_id);
		
		foreach ($roles as $key => $value) {
			$role_array = get_object_vars($value);
			$permissions =  $auth->getChildren($role_array['name']);
			$data = array();
			foreach ($permissions as $p_key => $p_value) {
				$permission_array = get_object_vars($p_value);
				if (!empty($permission_array['data'])) {
					$r_data = json_decode($permission_array['data']);
				if(is_object($r_data)){
					$r_data = get_object_vars($r_data);
					}
				} else {
					$r_data = $permission_array['data'];
				}
				$array = array(
					'id' => $permission_array['name'], 
					'text' => $permission_array['description'], 
					'rule' => empty($r_data['rule_name']) ? null : $r_data['rule_name'],
		            'sort' => empty($r_data['sort']) ? null : $r_data['sort'],
				);
				
				if ($auth->getChildren($permission_array['name'])) {
					$child_array = $this->getChildrenPermission($permission_array['name']);
					$leaf = false;
					$array['children'] = $child_array;
				}else{
					$leaf = true;
				}
				$array['leaf'] = $leaf;
				
				array_push($data, $array);
			}
		}
		echo json_encode($data);
	}
	
	public function getChildrenPermission($name='')
	{
		$auth = Yii::$app->authManager;
		$permission =  $auth->getChildren($name);
		$data = array();
		foreach ($permission as $key => $value) {
			$permission_array = get_object_vars($value);
			
			if (!empty($permission_array['data'])) {
				$r_data = json_decode($permission_array['data']);
				if(is_object($r_data)){
					$r_data = get_object_vars($r_data);
				}
			} else {
				$r_data = $permission_array['data'];
			}
            $array = array(
				'id' => $permission_array['name'], 
				'text' => $permission_array['description'], 
				'PermissionName' => $permission_array['name'], 
				'PermissionDescription' => $permission_array['description'], 
				'rule' => empty($r_data['rule_name']) ? null : $r_data['rule_name'],
	            'sort' => empty($r_data['sort']) ? null : $r_data['sort'],
				'ExtJSClass' => empty($r_data['ExtJSClass']) ? null : $r_data['ExtJSClass'],
				'leaf' => true
			);
			array_push($data, $array);
        }
		return $data;
	}
	

	
	/**
	 * 增加角色
	 */
	public function actionRoleCreate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		$model = new AuthItem;
		$model -> attributes = array('name' => $params['roleName'], 'type' => CAuthItem::TYPE_ROLE, 'description' => $params['roleDescription'], 'bizrule' => $params['roleBizRule'], 'data' => $params['roleData']);
		$authItem = AuthItem::model() -> find('name = :name', array(':name' => $params['roleName']));
		if (empty($authItem)) {
			if ($model -> save()) {
				$data = array('roleName' => $model -> name);
				//添加父角色
				$paerentRoleName = $params['parentRoleName'];
				$auth = Yii::app() -> authManager;
				$role = $auth -> addItemChild($paerentRoleName, $params['roleName']);
				if($role){
					$success = true;
					$message = '该操作添加成功';
					$data = array();
				}else{
					$success = true;
					$message = '该操作添加失败';
					$data = array();
				}
			} else {
				$success = false;
				$message = '添加角色失败';
				$data = array();
			}
		} else {
			$success = false;
			$message = '添加角色或权限已经存在';
			$data = array();
		}

		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}

	/**
	 * 修改角色
	 */
	public function actionRoleUpdate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		$model = $this -> loadModel($params['roleName']);
		if (!$model) {
			$success = fasle;
			$message = '修改角色不存在';
		} else {
			// Uncomment the following line if AJAX validation is needed
			// $this->performAjaxValidation($model);
			$attributesAarry = array();
			foreach ($params as $key => $value) {
				if ($key == 'roleDescription') {
					$array = array('description' => $value);
				}

				if ($key == 'roleData') {
					$array = array('data' => $value);
				}

				if ($key == 'roleBizRule') {
					$array = array('bizrule' => $value);
				}
				$model -> attributes = $array;
			}
			$model -> attributes = $attributesAarry;
			if ($model -> save()) {
				$success = true;
				$message = '修改角色成功';
			} else {
				$success = false;
				$message = '修改角色失败';
			}
		}

		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = array();
		echo $res -> to_json();
	}

	/**
	 * 删除角色
	 */
	public function actionRoleDelete() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		$model = $this -> loadModel($params['roleName']);
		if ($model) {
			$success = $model -> delete();
			if ($success) {
				$message = '删除角色成功';
			} else {
				$message = '删除角色失败';
			}
		} else {
			$success = false;
			$message = '删除角色不存在';
		}

		$data = array();
		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}

	/**
	 * get role list
	 *
	 * @return role list
	 * @author lion 
	 */
	public function actionRoleList() {
		// if(!Yii::app()->user->checkAccess('createPost1')){
		// }
		$query = new Query();
		$query -> limit = Yii::$app->request->get('limit'); 
		$query -> offset = Yii::$app->request->get('start'); 
		
		$auth = Yii::$app->authManager;
		$model = $auth->getRoles($query);
		$data = array();
		foreach ($model as $key => $value) {
			$value =  get_object_vars($value);
			$array = array(
                'roleName' => $value['name'],
                'roleDescription' => empty($value['description']) ? null : $value['description'],
                'roleBizRule' => empty($value['ruleName']) ? null : $value['ruleName'],
                'roleData' => empty($value['data']) ? null : $value['data']
            );
			array_push($data, $array);
		}

		$res = new Response();
		$res -> success = true;
		$res -> message = "Loaded data";
		$res -> data = $data;
		$res -> totalCount =  count($auth->getRoles());
		echo $res -> to_json();
	}

	/**
	 * 根据代理商获取角色列表
	 */
	public function actionRoleListByAgent() {
		// if(!Yii::app()->user->checkAccess('createPost1')){
		// }

		$agentID = Yii::app() -> user -> AgentID;
		$userID = Yii::app() -> user -> id;
		$items = Yii::app() -> db -> createCommand() 
		-> select('a.*') 
 		-> from('AuthItem a') 
 		-> join('AuthItemChild b', 'a.name = b.child') 
		-> join('AuthAssignment d', 'b.parent = d.itemname') 
		-> join('user e', 'e.user_id = cast(d.userid as int)') 
 		-> where("(a.type = 2  and e.agent_id = $agentID)") -> queryAll();
		$data = array();
		foreach ($items as $key => $value) {
			$array = array('roleName' => $value['name'], 
			'roleDescription' => empty($value['description']) ? null : $value['description'],
			 'roleBizRule' => empty($value['bizrule']) ? null : $value['bizrule'], 
			 'roleData' => empty($value['data']) ? null : $value['data']);
			array_push($data, $array);
		}

		$res = new Response();
		$res -> success = true;
		$res -> message = "Loaded data";
		$res -> data = $data;
		echo $res -> to_json();
	}


	/**
	 * get Permission list
	 *
	 * @return json
	 * @author lion
	 */
	public function actionPermissionList() {
		$query = new Query();
		$query -> limit = Yii::$app->request->get('limit'); 
		$query -> offset = Yii::$app->request->get('start'); 
		
		$auth = Yii::$app->authManager;
		$model =  $auth->getPermissions($query);
		$data = array();
		
		foreach ($model as $key => $value) {
			$permission_array = get_object_vars($value);
			if (!empty($permission_array['data'])) {
				$r_data = json_decode($permission_array['data']);
			if(is_object($r_data)){
				$r_data = get_object_vars($r_data);
				}
			} else {
				$r_data = $permission_array['data'];
			}
			$array = array(
				'PermissionName' => $permission_array['name'], 
				'PermissionDescription' => $permission_array['description'], 
				'rule' => empty($permission_array['rule_name']) ? null : $permission_array['rule_name'],
            	'sort' => empty($r_data['sort']) ? null : $r_data['sort'],
				'ExtJSClass' => empty($r_data['ExtJSClass']) ? null : $r_data['ExtJSClass']
			);
			
			if ($auth->getChildren($permission_array['name'])) {
				$child_array = $this->getChildrenPermission($permission_array['name']);
				$array['children'] = $child_array;
				$leaf = false;
			}else{
				$leaf = true;
			}
			$array['leaf'] = $leaf;
			
			$item = new ItemChild();
			$is_child = $item->find()->where(array('child'=>$permission_array['name']));
			$is_parent = $item->find()->where(array('parent'=>$permission_array['name']));
			if (!$is_child || ($is_child&&$is_parent)) {
				array_push($data, $array);
			}
			
		}
		$res = new Response();
		$res -> success = true;
		$res -> message = "Loaded data";
		$res -> data = $data;
		$res -> totalCount =  count($auth->getPermissions());
		echo $res -> to_json();
	}

	/**
	 * create permission
	 *
	 * @return void
	 * @author  
	 */
	public function actionPermissionCreate() {
		$params = Yii::$app->request->post(); 
		$auth = Yii::$app->authManager;
		$PermissionName = empty($params['data']['PermissionName']) ? '' : $params['data']['PermissionName'];
		$PermissionDescription = empty($params['data']['PermissionDescription']) ? $PermissionName : $params['data']['PermissionDescription'];
		$res = new Response();
		
		if(empty($PermissionName)){
			$res -> success = false;
			$res -> message = "请输入权限名称,添加失败";
			echo $res -> to_json();	
		}
		
		if(!empty($auth->getPermission($PermissionName))){
			$res -> success = false;
			$res -> message = "该权限已经存在,添加失败";
			echo $res -> to_json();	
		}
		$permission = $auth->createPermission($PermissionName);
        $permission->description = $PermissionDescription;
		$permission->data = json_encode(array(
			'ExtJSClass' => $params['data']['ExtJSClass'],
			'sort' =>$params['data']['sort']
		));
		//add  permission
        if($auth->add($permission)){
        	//判断父级权限是否存在
        	if (!empty($params['data']['ParentPermissionName'])) {
				if($auth->getPermission($params['data']['ParentPermissionName'])){
					$ParentPermissionName =  $auth->getPermission($params['data']['ParentPermissionName']);
					if(!$auth->addChild( $ParentPermissionName, $permission )){
						$res -> success = false;
						$res -> message = "父级权限不存在,添加失败";
						echo $res -> to_json();	
					}
				}else{
					$res -> success = false;
					$res -> message = "父级权限不存在,添加失败";
					echo $res -> to_json();	
				}
			}
        	$res -> success = true;
			$res -> message = "添加权限成功";
        }else{
        	$res -> success = false;
			$res -> message = "添加权限失败";
        }	
		echo $res -> to_json();	
	}

	/**
	 * delete permission
	 *
	 * @return void
	 * @author  
	 */
	public function actionPermissionDelete() {
		$params = Yii::$app->request->post(); 
		$auth = Yii::$app->authManager;
		//ParentPermissionName
		$permission =  $auth->getPermission($params['data']['PermissionName']);
		$res = new Response();
        if($auth->remove($permission)){
        	$res -> success = true;
			$res -> message = "删除权限成功";
        }else{
        	$res -> success = false;
			$res -> message = "删除权限失败";
        }	
		echo $res -> to_json();	
	}

	/*****任务****/

	/*****操作*****/
	

	/**
	 * 给角色分配任务
	 */
	public function actionAssignRoleCreate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}
		$tasks = $_POST['AssignTaskName'];
		$roleName = $_POST['AssignRoleName'];
		$auth = Yii::app() -> authManager;
		try {
			// $taskArray = explode(',', $tasks);
			// foreach ($taskArray as $key => $value) {
			//
			// }
			$role = $auth -> addItemChild($roleName, $tasks);
			$success = true;
			$message = '该操作添加成功';
			$data = array();
		} catch(Exception $e) {
			$success = false;
			$message = '该操作已经存在,添加失败';
			$data = array();
		}
		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}

	/**
	 * 删除角色权限分配操作
	 */
	public function actionAssignRoleDelete() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}
		$model = $this -> loadAssignModel(array('parent' => $params['roleName'], 'child' => $params['assignName']));
		if ($model) {
			$success = $model -> delete();
			if ($success) {
				$message = '删除操作成功';
			} else {
				$message = '删除操作失败';
			}
		} else {
			$success = false;
			$message = '操作不存在,删除失败';
		}

		$data = array();
		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}

	/**
	 * 获取权限分配操作列表
	 */
	public function actionAssignList() {
		
		// var data = [
		    // {projectId: 100, project: '管理员', 
		    // taskId: 112, description: '权限管理', estimate: 6, rate: 150, due:'06/24/2007'},
		    // {projectId: 100, project: '管理员', taskId: 113, description: '设备管理', estimate: 4, rate: 150, due:'06/25/2007'},
		    // {projectId: 100, project: '管理员', taskId: 114, description: '用户管理', estimate: 4, rate: 150, due:'06/27/2007'},
		    // {projectId: 100, project: '管理员', taskId: 115, description: '系统日志', estimate: 8, rate: 0, due:'06/29/2007'}
		// ];
		
		$auth = Yii::$app->authManager;
		$model = $auth->getRoles();
		$data = array();
		foreach ($model as $key => $value) {
			$value =  get_object_vars($value);
			//通过角色获取权限
			$permission =  $auth->getPermissionsByRole($value['name']);
			foreach($permission as $p_key => $p_value){
				$p_array =  get_object_vars($p_value);
				
				if (!empty($p_array['data'])) {
				$r_data = json_decode($p_array['data']);
					if(is_object($r_data)){
						$r_data = get_object_vars($r_data);
					}
				} else {
					$r_data = $p_array['data'];
				}
			
				$array = array(
	                'roleName' => $value['name'],
	                'roleDescription' => empty($value['description']) ? null : $value['description'],
	                'permissionDescription' => empty($p_array['description']) ? null : $p_array['description'],
	                'permission' => empty($p_array['name']) ? null : $p_array['name'],
	                'rule' => empty($p_array['rule_name']) ? null : $p_array['rule_name'],
                	'sort' => empty($r_data['sort']) ? null : $r_data['sort'],
					'ExtJSClass' => empty($r_data['ExtJSClass']) ? null : $r_data['ExtJSClass']
	            );
			}
			array_push($data, $array);
		}

		$res = new Response();
		$res -> success = true;
		$res -> message = "Loaded data";
		$res -> data = $data;
		$res -> totalCount = 0;
		echo $res -> to_json();
		
	}

	/**
	 * 获取任务权限分配操作列表
	 */
	public function actionAssignTaskList() {
		$items = Yii::app() -> db -> createCommand() -> select('a.name as taskName, a.description as taskDescription, c.*') -> from('AuthItem a') -> join('AuthItemChild b', 'a.name = b.parent') -> join('AuthItem c', 'c.name = b.child') -> where('a.type = 1') -> queryAll();
		$data = array();
		foreach ($items as $key => $value) {
			$array = array('taskName' => $value['taskName'], 'taskType' => '任务', 'taskDescription' => $value['taskDescription'], 'assignName' => $value['name'], 'assignType' => $value['type'], 'assignDescription' => empty($value['description']) ? null : $value['description'], 'assignBizRule' => empty($value['bizrule']) ? null : $value['bizrule'], 'assignData' => empty($value['data']) ? null : $value['data'], );
			array_push($data, $array);
		}

		$res = new Response();
		$res -> success = true;
		$res -> message = "Loaded data";
		$res -> data = $data;
		$countCriteria = new CDbCriteria;
		$countCriteria -> condition = "type=" . CAuthItem::TYPE_OPERATION;
		$res -> totalCount = AuthItem::model() -> count($countCriteria);
		echo $res -> to_json();
	}

	/**给任务分配操作**/
	public function actionAssignTaskCreate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		$tasks = $_REQUEST['TaskAssignTaskName'];
		$subTasks = $_REQUEST['TaskAssigSubTaskName'];

		$auth = Yii::app() -> authManager;
		try {
			// $taskArray = explode(',', $tasks);
			// foreach ($taskArray as $key => $value) {
			// $role=$auth->addItemChild($roleName, $value);
			// }
			$role = $auth -> addItemChild($tasks, $subTasks);
			$success = true;
			$message = '该操作添加成功';
			$data = array();

		} catch(Exception $e) {
			$success = false;
			$message = '该操作已经存在,添加失败';
			$data = array();

		}
		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}
	
	/***/
	/**
	 * 获取子任务
	 */
	public function actionGetNextTask($task_id) {
		$items = Yii::app() -> db -> createCommand() -> select('a.name as taskName, a.description as taskDescription') -> from('AuthItem a') -> join('AuthItemChild b', 'a.name = b.child') -> where('a.type = :id and b.parent = :task_id', array('id' => 1, 'task_id' => $task_id)) -> queryAll();
		$data = array();
		foreach ($items as $key => $value) {
			$array = array('id' => $value['taskName'], 'text' => $value['taskDescription'], 'leaf' => true);
			array_push($data, $array);
		}
		$taskArray = array('children' => $data);
		return $taskArray;
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id) {
		$model = AuthItem::model() -> findByPk($id);
		if ($model === null)
			return false;

		return $model;
	}

	public function loadAssignModel($id) {
		$model = ItemChild::model() -> findByPk($id);
		if ($model === null)
			return false;

		return $model;
	}

	/**
	 * 获取所有一级分类，用于后台获取下拉菜单
	 */
	public function actionOneLevelTaskList() {
		$list = AuthItem::model() -> findAll("type = 1");
		$res = array();
		foreach ($list as $v) {
			$res[] = array('name' => $v['name'], 'description' => $v['description'], );
		}
		echo json_encode($res);
	}

	/**
	 * 根据角色名称获取所有任务和操作列表
	 * @param int $roleName 角色名称
	 * @return json
	 */
	public function actionGetTasksAndOperations($roleName = '') {
		$auth = Yii::app() -> authManager;
		$selectList = $auth -> getItemChildren($roleName);
		//获取所有子项目

		foreach ($selectList as $v) {
			if ($v -> type == 1 || $v -> type == 0) {
				$data[] = array('taskName' => $v -> name, 'taskDescription' => $v -> description, 'taskType' => $v -> type, );
			}
		}

		//输出
		echo json_encode($data);
	}

}
