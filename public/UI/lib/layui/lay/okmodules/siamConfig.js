"use strict";
layui.define(["layer"], function (exprots) {
    var $ = layui.jquery;
    var siamConfig = {
        configData:{
            /**
             * 服务器基础地址
             */
            // url:'http://域名配置的public目录时直接用域名/index.php',
            url:'http://localhost/apm/public/index.php',
            /**
             * 是否前后分离
             */
            isFrontendBackendSeparate: true
        },

        /**
         * 获取配置
         * @param {string} name 
         */
        config:function(name){
            if (siamConfig.configData[name] === undefined){
                return null;
            }
            return siamConfig.configData[name];
        },
        /**
         * 设置配置
         * @param {string} name 
         * @param {*} value 
         */
        set:function(name, value){
            siamConfig.configData[name] = value;
        }
        
    };
    exprots("siamConfig", siamConfig);
});
