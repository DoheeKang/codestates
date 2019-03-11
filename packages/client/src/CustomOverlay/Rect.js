import TwoClickShape from './TwoClickShape';

var Rect = function(options) {
    TwoClickShape.call(this, options);
};

Rect.prototype = Object.create(TwoClickShape.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.setPath = function() {
    /* Set path */
    this._path.attr('d', `M 1 1 L ${this._width - 1} 1 ${this._width - 1} ${this._height - 1} 1 ${this._height - 1} Z`)
      .attr('stroke', 'black').attr('stroke-width', '3').attr('fill', 'none');
};

export default Rect;