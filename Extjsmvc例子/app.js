Ext.application({
	requires: ['Ext.container.Viewport'],  
    name: 'AM',
    appFolder: 'app',
    controllers: [
                  'Users'
              ],
              defaults: 
              {
               split: true,                  //是否有分割线
               collapsible: true,           //是否可以折叠
               bodyStyle: 'padding:15px'  
              },
              
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                	 xtype: 'userlist',
                	 region: 'center',
                	 split: true
                },
                {
                	region: 'west',
                	title: '菜单',
                	xtype: "panel",
                    html: "子元素2",
                    width: 200
                }
            ]
        });
    }
});