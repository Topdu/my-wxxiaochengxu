/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = '';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
      ciUrl: `${host}/weapp/ci`,
      voiceUrl: `${host}/weapp/recognize`,
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        adddataUrl: `${host}/weapp/adddata`,
        getdataUrl: `${host}/weapp/getdata`,
        deletedataUrl: `${host}/weapp/deletedata`,
        updatedataUrl: `${host}/weapp/updatedata`,
        getcreatedataUrl: `${host}/weapp/getcreatedata`,
        getuserdataUrl: `${host}/weapp/getuserdata`,
        messagedataUrl: `${host}/weapp/messagedata`,
        sendmessageUrl: `${host}/weapp/sendmessage`,
        updatealert_numUrl: `${host}/weapp/updatealert_num`,
        insert_remindUrl: `${host}/weapp/insert_remind`,
        deletereplymessageUrl: `${host}/weapp/deletereplymessage`,
        checkloginUrl: `${host}/weapp/checklogin`,
        getremindUrl: `${host}/weapp/getremind`,
      checkdataUrl: `${host}/weapp/checkdata`,
    }
};

module.exports = config;
