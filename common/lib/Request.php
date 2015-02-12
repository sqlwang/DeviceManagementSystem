<?php
/**
 * Request类
 * @author * 
 * @date 2014-10-30
 */
class Request {
	
    public $restful, $method, $controller, $action, $id, $params;

    /**
     * 构造函数
     * @param array $params
     */
    public function __construct($params) {
        $this->restful = (isset($params["restful"])) ? $params["restful"] : false;
        $this->method = $_SERVER["REQUEST_METHOD"];
        $this->parseRequest();
    }
    
    public function isRestful() {
        return $this->restful;
    }
    
    /**
     * 解析URL
     */
    protected function parseRequest() {
        if ($this->method == 'PUT') {
            $raw  = '';
            $httpContent = fopen('php://input', 'r');
            while ($kb = fread($httpContent, 1024)) {
                $raw .= $kb;
            }
            fclose($httpContent);
            $params = array();
            parse_str($raw, $params);

            if (isset($params['data'])) {
                $this->params =  json_decode($params['data']);
            } else {
                $params = json_decode($raw);
                $this->params = $params->data;
            }
        } else {
            $this->params = (isset($_REQUEST['data'])) ? json_decode($_REQUEST['data'],JSON_UNESCAPED_UNICODE) : null;
            if (isset($_REQUEST['data'])) {
                $this->params =  json_decode($_REQUEST['data']);
            } else {
				$raw_post_data = file_get_contents('php://input', 'r'); 
                $params = json_decode($raw_post_data);
                if ($params) {
                    $this->params = $params->data;
                }
            }

        }
    }
}

