<?php
namespace app\api\controller;

use app\api\model\Projects;

// 操作项目 增删查

class Project
{
    /**
     * @return \think\response\Json
     * @throws
     */
    public function get_list()
    {
        $data = Projects::get_list();
        return json([
            'code' => 200,
            'data' => $data,
            'msg'  => 'success'
        ]);
    }

    /**
     * POST  project_name=
     * @return \think\response\Json
     */
    public function add()
    {
        $project = Projects::add(input());
        return json([
            'code' => 200,
            'data' => $project,
            'msg'  => 'success'
        ]);
    }

    public function delete_one()
    {
        $id = input('project_id');

        if (!$id){
            return json(['code' => 400]);
        }

        $project = Projects::deleteById($id);

        return json([
            'code' => 200,
            'data' => $project,
            'msg'  => 'success'
        ]);
    }
}
