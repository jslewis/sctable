/*globals SCTable*/

SCTable.TableRowView2 = SC.View.extend(SC.Control, SC.Benchmark, {
  
  // PUBLIC PROPERTIES
  
  classNames: 'sctable-row-view',

  isMouseOver: NO,
  
  displayProperties: ['isMouseOver'],
  
  /*
    @read-only
  */
  tableDelegate: function() {
    return this.getPath('displayDelegate.tableDelegate');
  }.property('displayDelegate').cacheable(),
  
  // PUBLIC METHODS
  
  createChildViews: function() {
    this._updateColumns();
  },

  // prepareForReuse: function() {
  //   this.invokeOnce('_prepareChildViewsForReuse');
  // },

  // render: function(context, firstTime) {
  //   //console.log('%@:%@.render(%@)'.fmt(this, this.get('contentIndex'), firstTime));
  //   context = context.setClass('hover', this.get('isMouseOver'));
  //   sc_super();
  // },

  // mouseEntered: function(evt) {
  //   this.set('isMouseOver', YES);
  // },
  // 
  // mouseExited: function(evt) {
  //   this.set('isMouseOver', NO);
  // },
  
  // PRIVATE METHODS

  _contentDidChange: function() {
    //console.log('%@:%@._contentDidChange(%@)'.fmt(this, this.get('contentIndex'), this.get('content')));
    this.invokeOnce('_updateChildViewsContent');
  }.observes('content'),
  
  _updateChildViewsContent: function() {
    var childViews = this.get('childViews'), content = this.get('content');
    var len = childViews ? childViews.length : 0, i;
  
    for (i = 0; i < len; i++) {
      childViews[i].set('content', content);
    }
  },

  // _prepareChildViewsForReuse: function() {
  //   //this.replaceLayer();
  //   var childViews = this.get('childViews');
  //   var len = childViews ? childViews.length : 0, i;
  //   
  //   for (i = 0; i < len; i++) {
  //     childViews[i].notifyPropertyChange('layer');
  //   }
  // },
  
  _updateColumns: function() {
    var columns = this.getPath('displayDelegate.columns');
    var childViews = [], content = this.get('content');
    var left = 0;
    
    if (columns && columns.isEnumerable) {
      columns.forEach(function(col, index) {
        var view, width = col.get('width');
        
        view = this.createChildView(SC.LabelView, {
          layout: { left: left, top: 0, bottom: 0, width: width },
          contentValueKey: col.get('valueKey')
        });
        view.set('content', content);
        childViews.push(view);
        
        left += width;
      }, this);
    }
    
    this.replaceAllChildren(childViews);
  }
  
});

SCTable.TableRowView2.mixin({
  isReusableInCollections: YES
});
