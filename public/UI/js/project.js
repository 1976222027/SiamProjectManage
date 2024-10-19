"use strict";
layui.use(
  ["okUtils", "table", "countUp", "okMock", "okTab", "layer"],
  function () {
    var countUp = layui.countUp;
    var table = layui.table;
    var okUtils = layui.okUtils;
    var okMock = layui.okMock;
    var $ = layui.jquery;
    var okTab = layui.okTab();
    var layer = layui.layer;

    function renderList() {
      okUtils
        .ajax("/api/project/get_list", "get", null, true)
        .done(function (response) {
          $("#list-bd").empty();
          $.each(response.data.list, function (index, item) {
            let html = `
                    <div class="layui-col-xs6 layui-col-md3">
                        <div class="layui-card">
                            <div id="project_id" class="ok-card-body project-one" data-id="${item.project_id}" data-name="${item.project_name}">
                                <div class="stat-heading">${item.project_name}
                                <span style="display:inline-block;float:right;" class="project-delete" data-id="${item.project_id}" >删除</span>
                                <br/>
                                    APP_ID：<span style="color: red;">${item.project_id}</span>
                                    <span style="display:inline-block;float:right;" class="project-copy" >复制APP_ID</span>

                                </div>
                            </div>
                        </div>
                    </div>
                `;
            $("#list-bd").append(html);
          });
        })
        .fail(function (error) {
          console.log(error);
        });
    }

    $("#list-bd").on("click", ".project-one", function () {
      let id = $(this).data("id");
      let name = $(this).data("name");
      let temName = encodeURI(name);
      let url = `pages/projectDetail.html?id=${id}&name=${name}`;
      let page = `<div lay-id="project_${id}" data-url="${url}"><cite>[项目] ${name} </cite></div>`;
      okTab.tabAdd(page);
    });

    $("#list-bd").on("click", ".project-delete", function () {
      if (confirm("确定要继续操作吗？")) {
        // 用户点击了确定按钮，执行相关操作
        console.log("用户点击了确定按钮");
        okUtils
          .ajax(
            "/api/project/delete_one",
            "post",
            {
              project_id: $(this).data("id"),
            },
            true
          )
          .done(function (response) {
            layer.msg("删除成功");
            location.reload();
          })
          .fail(function (error) {
            console.log(error);
          });
      } else {
        // 用户点击了取消按钮，取消操作
        console.log("用户点击了取消按钮");
      }

      layer.close(index);
      return false; // 终止冒泡
    });
    /**
     * 复制单行内容到粘贴板
     * content : 需要复制的内容
     * message : 复制完后的提示，不传则默认提示"复制成功"
     */
    function copyToClip(content) {
      var aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    }

    $("#list-bd").on("click", ".project-copy", function () {
      var x1 = document.getElementById("project_id").dataset.id;
      copyToClip(x1);
      layer.msg("复制成功");
      layer.close(index);
      return false; // 终止冒泡
    });

    $("#projectAdd").on("click", function () {
      layer.prompt(
        {
          formType: 3,
          value: "",
          title: "请输入新项目名",
          area: ["200px", "150px"], //自定义文本域宽高
        },
        function (value, index, elem) {
          okUtils
            .ajax(
              "/api/project/add",
              "post",
              {
                project_name: value,
              },
              true
            )
            .done(function (response) {
              location.reload();
            })
            .fail(function (error) {
              console.log(error);
            });
          layer.close(index);
        }
      );
    });

    renderList();
  }
);
