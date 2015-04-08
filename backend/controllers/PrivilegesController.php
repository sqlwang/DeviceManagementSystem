<?php
namespace backend\controllers;

use Yii;
use common\lib\Response;

use yii\base\Request;

use yii\web\Session;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\db\Query;

class PrivilegesController extends Controller {
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	private $roleType = 2;
	private $taskType = 1;
	private $operationType = 0;

	/***/
	/**
	 * 获取导航栏功能列表
	 */
	public function actionNavList() {
		
		$auth = Yii::$app->authManager;
		$user_id = Yii::$app->user->id;
		$permissions =  $auth->getPermissionsByUser($user_id);
		$data = array();
		foreach ($permissions as $key => $value) {
			$permissionsArray = get_object_vars($value);
			
		//	$level = empty($item_data['level']) ? 1 : $item_data['level'];
			$is_leaf = empty($auth->getChildren( $permissionsArray['name'])) ? true :false;
			
			$array = array(
				'id' => $permissionsArray['name'], 
				'text' => $permissionsArray['description'], 
				'leaf' => $is_leaf,
				'level'=> 1
			);
			array_push($data, $array);
		}
		echo json_encode($data);
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
	 * 获取角色列表
	 *
	 * @return role list
	 * @author lion 
	 */
	public function actionRoleList() {
		// if(!Yii::app()->user->checkAccess('createPost1')){
		// }
		$query = new Query();
		$params = Yii::$app->request->get();
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
	 * 任务创建
	 */
	public function actionTaskCreate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		$auth = Yii::app() -> authManager;
		try {
			$result = $auth -> createTask($params['taskName'], $params['taskDescription'], $params['taskBizRule'], $params['taskData']);
			if (trim($params['parentTaskName']) != "") {//如果不是根级任务则添加数据到 认证项父子关系表（AuthItemChild）
				$result = $auth -> addItemChild($params['parentTaskName'], $params['taskName']);
			}
			$success = true;
			$message = '该任务添加成功';
			$data = array();
		} catch(Exception $e) {
			$success = false;
			$message = '该任务已经存在,添加失败';
			$data = array();
		}
		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}

	/*
	 * 修改任务
	 * */
    /**
     *
     */
    public function actionTaskUpdate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		$model = $this -> loadModel($params['taskName']);
		if (!$model) {
			$success = fasle;
			$message = '修改角色不存在';
		} else {
			// Uncomment the following line if AJAX validation is needed
			// $this->performAjaxValidation($model);
			$attributesAarry = array();
			foreach ($params as $key => $value) {
				if ($key == 'taskDescription') {
					$array = array('description' => $value);
				}

				if ($key == 'taskData') {
					$array = array('data' => $value);
				}

				if ($key == 'taskBizRule') {
					$array = array('bizrule' => $value);
				}
				$model -> attributes = $array;
			}
			$model -> attributes = $attributesAarry;
			if ($model -> save()) {
				$success = true;
				$message = '修改任务成功';
			} else {
				$success = false;
				$message = '修改任务失败';
			}
		}

		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = array();
		echo $res -> to_json();
	}

	/**
	 * 删除任务
	 */
	public function actionTaskDelete() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}
		$model = $this -> loadModel($params['taskName']);
		if ($model) {
			$success = $model -> delete();
			if ($success) {
				$message = '删除任务成功';
			} else {
				$message = '删除任务失败';
			}
		} else {
			$success = false;
			$message = '任务不存在，删除失败';
		}

		$data = array();
		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = $data;
		echo $res -> to_json();
	}

	/**
	 * 获取任务列表
	 */
	public function actionTaskList() {
		$criteria = new CDbCriteria;
		$criteria -> limit = empty($_REQUEST['limit']) ? 10 : $_REQUEST['limit'];
		$criteria -> offset = empty($_REQUEST['start']) ? 0 : $_REQUEST['start'];
		$criteria -> condition = "type=" . CAuthItem::TYPE_TASK;
		$model = AuthItem::model() -> findAll($criteria);
		$data = array();
		foreach ($model as $key => $value) {
			$array = array('taskName' => $value['name'], 'taskDescription' => empty($value['description']) ? null : $value['description'], 'taskBizRule' => empty($value['bizrule']) ? null : $value['bizrule'], 'taskData' => empty($value['data']) ? null : $value['data']);
			array_push($data, $array);
		}

		$res = new Response();
		$res -> success = true;
		$res -> message = "Loaded data";
		$res -> data = $data;
		$countCriteria = new CDbCriteria;
		$countCriteria -> condition = "type=" . CAuthItem::TYPE_TASK;
		$res -> totalCount = AuthItem::model() -> count($countCriteria);
		echo $res -> to_json();
	}

	/*****任务****/

	/*****操作*****/
	/*
	 * 创建操作
	 * */
	public function actionOperationCreate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);
		$auth = Yii::app() -> authManager;
		try {
			$result = $auth -> createOperation($params['operationName'], $params['operationDescription'], $params['operationBizRule'], $params['operationData']);
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
	 * 修改操作
	 */
	public function actionOperationUpdate() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}

		$model = $this -> loadModel($params['operationName']);
		if (!$model) {
			$success = fasle;
			$message = '修改操作不存在';
		} else {
			// Uncomment the following line if AJAX validation is needed
			// $this->performAjaxValidation($model);
			$attributesAarry = array();
			foreach ($params as $key => $value) {
				if ($key == 'operationDescription') {
					$array = array('description' => $value);
				}

				if ($key == 'operationData') {
					$array = array('data' => $value);
				}

				if ($key == 'operationBizRule') {
					$array = array('bizrule' => $value);
				}
				$model -> attributes = $array;
			}
			$model -> attributes = $attributesAarry;
			if ($model -> save()) {
				$success = true;
				$message = '修改操作成功';
			} else {
				$success = false;
				$message = '修改操作失败';
			}
		}

		$res = new Response();
		$res -> success = $success;
		$res -> message = $message;
		$res -> data = array();
		echo $res -> to_json();
	}

	/**
	 * 删除操作
	 */
	public function actionOperationDelete() {
		$request = new Request( array('restful' => false));
		if (is_object($request -> params)) {
			$params = get_object_vars($request -> params);
		} else {
			$params = $request -> params;
		}
		$model = $this -> loadModel($params['operationName']);
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
	 * 获取操作列表
	 */
	public function actionOperationList() {
		$criteria = new CDbCriteria;
		$criteria -> limit = empty($_REQUEST['limit']) ? 10 : $_REQUEST['limit'];
		$criteria -> offset = empty($_REQUEST['start']) ? 0 : $_REQUEST['start'];
		$criteria -> condition = "type=" . CAuthItem::TYPE_OPERATION;
		$model = AuthItem::model() -> findAllByAttributes(array(), $criteria);
		$data = array();
		foreach ($model as $key => $value) {
			$array = array('operationName' => $value['name'], 'operationDescription' => empty($value['description']) ? null : $value['description'], 'operationBizRule' => empty($value['bizrule']) ? null : $value['bizrule'], 'operationData' => empty($value['data']) ? null : $value['data']);
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
	public function actionAssignRoleList() {
		$items = Yii::app() -> db -> createCommand() -> select('a.name as roleName, a.description as roleDescription, c.*') -> from('AuthItem a') -> join('AuthItemChild b', 'a.name = b.parent') -> join('AuthItem c', 'c.name = b.child') -> where('a.type = 2') -> queryAll();
		$data = array();
		foreach ($items as $key => $value) {
			$array = array('roleName' => $value['roleName'], 'roleType' => '角色', 'roleDescription' => $value['roleDescription'], 'assignName' => $value['name'], 'assignType' => $value['type'], 'assignDescription' => empty($value['description']) ? null : $value['description'], 'assignBizRule' => empty($value['bizrule']) ? null : $value['bizrule'], 'assignData' => empty($value['data']) ? null : $value['data'], );
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
