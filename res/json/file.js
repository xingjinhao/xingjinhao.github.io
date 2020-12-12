/**
 * @type 参数只能是folder或file
 */

var projectFile = {
    "文件夹1": {
        id: 1,
        type: "folder",
        url: "*******",
        description: "这是第一个文件夹",
        children: {
            "文件1.html": {
                id: 2,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第一个文件",
                description: "这是第一个文件",
            },
            "文件2.html": {
                id: 3,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第二个文件",
                description: "这是第二个文件",
            },
            "文件3.html": {
                id: 4,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第三个文件",
                description: "这是第三个文件",
            },
            "文件夹2": {
                id: 1,
                type: "folder",
                url: "*******",
                description: "这是第二个文件夹",
                children: {
                    "文件4.html": {
                        id: 5,
                        type: "file",
                        url: "*******",
                        format: "html",
                        content: "这是第4个文件",
                        description: "这是第4个文件",
                    },
                    "文件5.html": {
                        id: 6,
                        type: "file",
                        url: "*******",
                        format: "html",
                        content: "这是第5个文件",
                        description: "这是第5个文件",
                    },
                    "文件6.html": {
                        id: 7,
                        type: "file",
                        url: "*******",
                        format: "html",
                        content: "这是第6个文件",
                        description: "这是第6个文件",
                    }
                }
            }
        }
    },
    "文件夹3": {
        id: 1,
        type: "folder",
        url: "*******",
        description: "这是第二个文件夹",
        children: {
            "文件4.html": {
                id: 5,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第4个文件",
                description: "这是第4个文件",
            },
            "文件5.html": {
                id: 6,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第5个文件",
                description: "这是第5个文件",
            },
            "文件6.html": {
                id: 7,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第6个文件",
                description: "这是第6个文件",
            }
        }
    }
}

var projectView = {
    "板块1": {
        id: 1,
        type: "folder",
        url: "*******",
        description: "这是第一个板块",
        children: {
            "视图1.html": {
                id: 2,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第一个视图",
                description: "这是第一个视图",
            },
            "视图2.html": {
                id: 3,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第二个视图",
                description: "这是第二个视图",
            },
            "视图3.html": {
                id: 4,
                type: "file",
                url: "*******",
                format: "html",
                content: "这是第三个视图",
                description: "这是第三个视图",
            },
            "板块2": {
                id: 1,
                type: "folder",
                url: "*******",
                description: "这是第二个板块",
                children: {
                    "视图4.html": {
                        id: 5,
                        type: "file",
                        url: "*******",
                        format: "html",
                        content: "这是第4个视图",
                        description: "这是第4个视图",
                    },
                    "视图5.html": {
                        id: 6,
                        type: "file",
                        url: "*******",
                        format: "html",
                        content: "这是第5个视图",
                        description: "这是第5个视图",
                    },
                    "视图6.html": {
                        id: 7,
                        type: "file",
                        url: "*******",
                        format: "html",
                        content: "这是第6个视图",
                        description: "这是第6个视图",
                    }
                }
            }
        }
    }
}

var projectInterface = {
    "板块1": {
        id: 1,
        type: "folder",
        url: "*******",
        description: "这是第一个板块",
        children: {
            "接口1.html": {
                id: 2,
                type: "file",
                url: "*******",
                format: "interface",
                description: "这是第一个接口",
                data: {
                    text: `发送用户id、用户名称、用户邮箱、用户地址、是否禁用给服务器，服务器在用户列中查找发送的用户id等于记录的用户id的记录,
                    将该记录中的用户名称、用户邮箱、用户地址、是否禁用的值，一一对应设置为发送的用户id、用户名称、用户邮箱、用户地址、是否禁用
                    的值，如果设置成功，返回给客户端code为1，否则返回code为0
                    `,
                    before: `接口调用前触发的函数名`,
                    after: `接口调用结束触发的函数`,
                    runing: `接口等待回调时的函数`,
                    callback: `接口回调的函数，以接口接收的response数据为参数`,
                    params: [{
                        name: "用户id",
                        type: "Number",
                        filter: `过滤器规则，该参数值为其参数`
                    }, {
                        name: "用户名称",
                        type: "String",
                        filter: `过滤器规则，该参数值为其参数`
                    }, {
                        name: "用户邮箱",
                        type: "String",
                        filter: `过滤器规则，该参数值为其参数`
                    }, {
                        name: "用户地址",
                        type: "String",
                        filter: `过滤器规则，该参数值为其参数`
                    }, {
                        name: "是否禁用",
                        type: "Boole",
                        filter: `过滤器规则，该参数值为其参数`
                    }],

                }
            },
            "接口2.html": {
                id: 2,
                type: "file",
                url: "*******",
                format: "interface",
                description: "这是第一个接口",
                data: {
                    text: "",
                    before: `接口调用前触发的函数名`,
                    after: `接口调用结束触发的函数`,
                    runing: `接口等待回调时的函数`,
                    callback: `接口回调的函数，以接口接收的response数据为参数`,
                    params: [{
                        name: "商品id",
                        type: "Number",
                        filter: `过滤器规则，该参数值为其参数`
                    }, {
                        name: "商品名称",
                        type: "String",
                        filter: `过滤器规则，该参数值为其参数`
                    }, {
                        name: "商品规格列表",
                        type: "Json",
                        filter: `过滤器规则，该参数值为其参数`
                    }],

                }
            }
        }
    }
}


var projectDataBase = {
    "用户表(userInfo)": {
        id: 1,
        type: "folder",
        url: "*******",
        description: "这是用户表",
        children: {
            "数据表列表": {
                id: 2,
                type: "folder",
                url: "*******",
                format: "interface",
                description: "用户唯一标识id",
                children: {
                    "用户id": {
                        id: 2,
                        type: "folder",
                        url: "*******",
                        format: "interface",
                        description: "用户唯一标识id",
                        children: {
                            "编辑": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "编辑",
                            },
                            "删除(不可用)": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "删除",
                            }
                        }
                    },
                    "用户名称": {
                        id: 2,
                        type: "folder",
                        url: "*******",
                        format: "interface",
                        description: "用户名称",
                        children: {
                            "编辑": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "编辑",
                            },
                            "删除": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "删除",
                            }
                        }
                    },
                    "用户邮箱": {
                        id: 2,
                        type: "folder",
                        url: "*******",
                        format: "interface",
                        description: "用户邮箱",
                        children: {
                            "编辑": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "编辑",
                            },
                            "删除": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "删除",
                            }
                        }
                    },
                    "用户地址": {
                        id: 2,
                        type: "folder",
                        url: "*******",
                        format: "interface",
                        description: "用户地址",
                        children: {
                            "编辑": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "编辑",
                            },
                            "删除": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "删除",
                            }
                        }
                    },
                    "是否禁用": {
                        id: 2,
                        type: "folder",
                        url: "*******",
                        format: "interface",
                        description: "是否禁用",
                        children: {
                            "编辑": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "编辑",
                            },
                            "删除": {
                                id: 2,
                                type: "file",
                                url: "*******",
                                format: "interface",
                                description: "删除",
                            }
                        }
                    }
                }
            },
            "编辑表基本信息(中文名、备注等)": {

                id: 2,
                type: "file",
                url: "*******",
                format: "interface",
                description: "编辑表基本信息",
            },
            "添加字段": {

                id: 2,
                type: "file",
                url: "*******",
                format: "interface",
                description: "编辑表基本信息",
            },
            "编辑表基本信息(中文名、备注等)": {

                id: 2,
                type: "file",
                url: "*******",
                format: "interface",
                description: "编辑表基本信息",
            }



        }
    }
}