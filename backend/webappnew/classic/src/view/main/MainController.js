Ext.define('SauceApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    routes: {
        'view.:node': {
            before: 'onLogonCheck',
            action: 'onRouteChange'
        },
        'panel.:node': {
            before: 'onLogonCheck',
            action: 'onPanelRouteChange'
        },
        'nav.:node': {
            before: 'onLogonCheck',
            action: 'showNavigationView'
        }
    },
    lastView: null,
    //当前请求总数，起始值为0
    messageTotal: 0,
    //退出次数
    loginOutCount: 0,
    //返回页面集合
    backView: [],
    //显示左侧有小区树的页面
    onPanelRouteChange: function (id) {
        this.setCurrentView('mainCardPanel', 'widgetPanel');
        this.setCurrentView('widgetPanel', id);
    },
    //切换视图
    setCurrentView: function (card, hashTag) {
        if (!hashTag) {
            return;
        }
        hashTag = (hashTag || '').toLowerCase();
        //console.log('激活视图', hashTag);
        var me = this,
        //获取所有引用对象
        refs = me.getReferences(),
        //获取容器视图
        mainCard = refs[card],
        //获取布局
        mainLayout = mainCard.getLayout(),
        //获取左侧菜单
        navigationList = refs.navigationTreeList,
        //获取左侧菜单数据仓库
        navigationStore = navigationList.getStore(),
        //获取默认视图数据源
        store = me.getStore('views'),
        //检查节点是否在数据源中
        node = store.getAt(store.find('viewType', hashTag)) || navigationStore.findNode('viewType', hashTag),
        //获取视图名称
        view = (node && node.get('viewType')) || 'page404',
        //获取上一视图
        lastView = me.lastView,
        //检查目标视图是否已经存在
        existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
        //获取当前已经存在的window窗口
        window = Ext.WindowManager.getActive(),
        newView;

        //如果上个视图存在，并且是Window视图
        if (lastView && lastView.isWindow) {
            //如果这个页面是激活的，终止执行
            if (lastView.routeId === hashTag) {
                return;
            } else {
                //销毁他
                console.log('销毁视图:', lastView);
                lastView.destroy();
            }
        } else {
            //上个视图不是Window视图窗口,当前页面有则关闭它
            if (window) {
                //根据是否有标题来判断是左侧导航栏弹出的浮动窗口还是window弹窗
                if (window.title) {
                    console.log('关闭Window视图', window.title);
                    window.close();
                }
            }
        }
        //将当前视图保存到lastView中
        lastView = mainLayout.getActiveItem();
        //如果目标视图不存在，创建这个视图
        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,
                // for existingItem search later
                hideMode: 'offsets'
            });
        }
        //如果新视图不存在，或者新视图不是Window视图
        if (!newView || !newView.isWindow) {
            //如果目标视图存在
            if (existingItem) {
                // 直接激活目标视图
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                    //触发activeitemchange事件，以便做一些特殊逻辑处理
                    mainCard.fireEvent('activeitemchange', mainCard, existingItem, lastView);
                }
                newView = existingItem;
            }
                //如果目标视图不存在
            else {
                // 整个框架停止布局，避免出错
                Ext.suspendLayouts();
                //容器中加入视图
                mainLayout.setActiveItem(mainCard.add(newView));
                // 整个框架恢复布局，避免出错
                Ext.resumeLayouts(true);
                mainCard.fireEvent('activeitemchange', mainCard, newView, lastView);
            }
        }
        //如果不是Window视图，则选中对应的节点
        if (node && !node.get('isWindow')) {
            navigationList.setSelection(node);
        }
        //获取焦点
        if (newView.isFocusable(true)) {
            newView.focus();
        }
        //将当前视图保存到lastView
        me.lastView = newView;
        //只在widgetPanel中切换时清除返回页面，避免重复执行
        if (card === 'widgetPanel') {
            var backView = me.backView,
            ln = backView.length,
            item, i;
            for (i = 0; i < ln; i++) {
                item = backView.pop();
                console.log('删除额外页面', item.title);
                mainCard.remove(item, true);
            }
        }
    },
    //显示一个不在左侧菜单栏中的视图
    showNavigationView: function (xtype) {
        //console.log('显示额外页面：', xtype);
        var me = this,
        refs = me.getReferences(),
        //获取容器视图
        mainCard = refs.widgetPanel,
        //获取布局
        mainLayout = mainCard.getLayout(),
        view;
        view = me.pop(mainCard, xtype);
        if (!view) {
            console.log('目标返回页面不存在，新建：', xtype);
            view = Ext.widget(xtype, config.tmpConfig);
            // 整个框架停止布局，避免出错
            Ext.suspendLayouts();
            //容器中加入视图
            mainLayout.setActiveItem(mainCard.add(view));
            // 整个框架恢复布局，避免出错
            Ext.resumeLayouts(true);
            //加入返回页面集合中
            me.backView.push(view);
        } else {
            console.log('目标返回页面存在，切换：', xtype);
            mainLayout.setActiveItem(view);
        }
        //console.log(config.tmpConfig);
        config.tmpConfig = null;
        console.log('当前容器内视图：', mainCard.items.keys.toString());
    },
    //检查指定返回页面是否已经存在//
    //如果存在则删除它之后的返回页面,并且返回该页面
    //如果不存在返回false
    pop: function (mainCard, count) {
        var me = this,
        innerItems = me.backView,
        last = innerItems.length - 1,
        i, item;
        for (i = last; i >= 0; i--) {
            //查找目标页面是否在返回集合中
            if ((Ext.isString(count) && Ext.ComponentQuery.is(innerItems[i], count))) {
                //获取到后面还有几个页面
                count = last - i;
                item = innerItems[i];
                break;
            }
        }
        //不在返回集合中
        if (!Ext.isNumber(count)) {
            return false;
        }
        var delItem;
        //在返回集合中则移除后面的返回界面
        for (i = 0; i < count; i++) {
            delItem = innerItems.pop();
            console.log('删除额外页面', delItem.title);
            mainCard.remove(delItem, true);
        }
        return item;
    },
    onNavigationTreeSelectionChange: function (tree, node) {
        if (node) {
            var to = node.get('viewType'),
            type = node.get('type');
            if (to) {
                this.redirectTo(type + '.' + to);
            }
        }
    },
    onToggleNavigationSize: function () {
        var me = this,
        refs = me.getReferences(),
        navigationList = refs.navigationTreeList,
        wrapContainer = refs.mainContainerWrap,
        collapsing = !navigationList.getMicro(),
        new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...
            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout(); // ... since this will flush them
        } else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({
                dynamic: true,
                to: {
                    width: new_width
                }
            });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({
                isRoot: true
            });
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },
    onRouteChange: function (id) {
        this.setCurrentView('mainCardPanel', id);
    },
    //移除已经存在的所有项
    mainRemoveAll: function () {
        console.log('移除已经存在的所有项');
        var me = this,
        //获取所有引用对象
        refs = me.getReferences(),
        //获取容器视图
        mainCard = refs.mainCardPanel,
        roomTree = Ext.getStore('roomTree');
        //重置小区树
        roomTree.removeAll();
        roomTree.setRoot({
            text: '/',
            id: 'dep:-1'
        });
        mainCard.removeAll(true);
    },
    //小区列表被点击时
    onRoomTreeClick: function (view, record) {
        record = record[0];
        if (record) {
            config.roomRecord = record;
            this.gridLoad(record);
        }
    },
    //widgetPanel内部进行视图切换时
    onWidgetActiveitemchange: function () {
        //console.log('激活视图', newItem.xtype);
        var record = config.roomRecord;
        if (record) {
            this.gridLoad(record);
        }
    },
    //加载widgetPanel内列表数据
    gridLoad: function (record) {
        var panel = this.lookup('widgetPanel'),
        layout = panel.getLayout(),
        //获取当前显示页面
        grid = layout.getActiveItem();
        //如果不是列表
        if (!grid.isXType('grid')) {
            //触发自定义事件，以便处理相应业务逻辑
            grid.fireEvent('roomchange', grid, record);
            //找到里面的列表
            grid = grid.down('grid');
        }
        if (grid) {
            util.listLoad(grid, {
                node: record.get('id')
            });
        }
        //加载数据
    },
    //容器加载完成时
    //ajax请求自动遮罩
    onCardViewRender: function () {
        //如果500毫秒类再次触发，之前触发的会自动取消
        var me = this;
        //监听ajax事件，开始请求时显示遮罩
        Ext.Ajax.on('beforerequest',
        function (connection, options) {
            if (options.params) {
                options.params.session_id = config.session_id;
                //options.params.userId = config.userId;
                //options.params.agent_id = config.agent_id;
            }
            //console.log('开始请求，请求总数：', me.messageTotal, '请求对象：', connection);
            me.messageTotal++;
            var window = Ext.WindowManager.getActive();
            if (window && window.title) {
                //根据是否有标题来判断是左侧导航栏弹出的浮动窗口还是window弹窗
                window.mask('正在请求数据，请等待...');
            } else {
                me.lookupReference('mainCardPanel').mask('正在请求数据，请等待...');
            }
        });
        //ajax请求成功
        Ext.Ajax.on('requestcomplete',
        function (connection, response) {
            //console.log('请求成功，请求总数：', me.messageTotal);
            me.hideMessage();
            if (response.responseText) {
                response = Ext.decode(response.responseText);
                if (response.sessionstatus === "timeout") {
                    Ext.Msg.alert('提示', '会话超时，请重新登录!',
                    function () {
                        me.onLoginOut();
                    });
                }
            }
        });
        //ajax请求失败
        Ext.Ajax.on('requestexception',
        function () {
            //console.log('请求失败，请求总数：', me.messageTotal);
            me.hideMessage();
            Ext.toast('请求失败，请检查网络连接！');
        });
    },
    //重写ajax，在请求数据时自动加入请求动画遮罩
    //隐藏遮罩
    hideMessage: function () {
        var me = this;
        //console.log('加载完成，请求总数：', me.messageTotal);
        if (me.messageTotal > 1) {
            me.messageTotal--;
        } else {
            var window = Ext.WindowManager.getActive();
            if (window && window.title) {
                //根据是否有标题来判断是左侧导航栏弹出的浮动窗口还是window弹窗
                window.unmask();
            }
            me.lookupReference('mainCardPanel').unmask();
            //请求总数归0
            me.messageTotal = 0;
        }
    },
    //退出登录
    onLoginOut: function (is) {
        var me = this;
        localStorage.removeItem('tutorialLoggedIn');
        if (is) {
            Ext.Ajax.request({
                url: config.user.logout,
                method: 'POST',
                success: function () { }
            });
        }
        if (me.loginOutCount < 10) {
            config.session_id = null;
            me.loginOutCount++;
            me.mainRemoveAll();
            me.redirectTo('view.login');
        } else {
            //退出登录次数超过10次时重新刷新页面，防止内存溢出浏览器崩溃
            window.location.reload();
        }
    },
    //登录检测
    onLogonCheck: function (id, action) {
        //console.log('登录检测，session_id', config.session_id);
        if (config.session_id || id === 'login') {
            action.resume();
        }
    },
    //点击修改密码
    onChangePassword: function () {
        Ext.widget('userChangePassword');
    }
});