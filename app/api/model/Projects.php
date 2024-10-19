<?php
namespace app\api\model;

use think\Model;

class Projects extends Model
{
    protected $autoWriteTimestamp = 'datetime';
    protected $pk = 'project_id';

    public function generateUUID() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    public function getAppId() {
        $chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $uuid = $this -> generateUUID();
        $uuid = str_replace('-', '', $uuid);
    
        $appId = '';
        for ($i=0;$i < 8; $i++) {
            $str=substr($uuid, $i * 4, 4);
            $x=hexdec($str);
            $appId.=$chars[$x % 62];
        }
        return $appId;
    }
    
    /**
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function get_list()
    {
        $list  = (new Projects)->select();
        $count = (new Projects)->count("project_id");

        return [
            'list'  => $list,
            'count' => $count
        ];
    }

    public static function add($data)
    {
        $project = new static();
        $data['project_id'] = $project->getAppId();
        $project->save($data);
        return $project;
    }

    /**
     * @param $id
     * @return bool
     * @throws
     */
    public static function deleteById($id)
    {
        $project = (new Projects)->find($id);

        if (!$project){
            return false;
        }

        return $project->delete();
    }
}