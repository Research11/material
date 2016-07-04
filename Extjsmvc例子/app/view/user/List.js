Ext.define('AM.view.user.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',

    title : '用户主界面',
    store: 'Users',
    initComponent: function() {    	
        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1},
           
        ];
        
        this.tbar=[
                     {text:'添加'},
                     {text:'修改'},
                     {text:'删除'}
                   ]

        this.callParent(arguments);
    }
});