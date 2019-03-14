const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxb648d10457bb1a9f',

    // 微信小程序 App Secret
    appSecret: 'cd73a8a55866339f7047e578b4d2f7c5',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,
    qcloudAppId: '1255531531',
    qcloudSecretId: 'AKIDEFeojSaAAvQmtkqnyve7RXN0NVN0xefQ',
    qcloudSecretKey: 'h8ML5ZtymNinHVUJvHQN5ZpsnTu51i9K',
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
      host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wxb648d10457bb1a9f',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
