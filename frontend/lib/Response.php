<?php
/**
 * @class Response
 * A simple JSON Response class.
 */
namespace frontend\lib; 
use Yii;
 
class Response {
    public $success, $data, $message, $errors, $tid, $trace, $totalCount;

    public function __construct($params = array()) {
        $this->success  = isset($params["success"]) ? $params["success"] : false;
        $this->message  = isset($params["message"]) ? $params["message"] : '';
        $this->data     = isset($params["data"])    ? $params["data"]    : array();
    }

    public function to_json() {
        echo json_encode(array(
            'success'   => $this->success,
            'message'   => $this->message,
            'data'      => $this->data,
            'totalCount'      => $this->totalCount
        ));
    }
}
