
var Cell = React.createClass({
  handleHover: function(){
    this.props.onMouseEnter(this.props.x, this.props.y)
  },
  handleClick: function(){
    this.props.onDoubleClick(this.props.x, this.props.y)
  },
  render: function() {
    var cellClass = 'tableCell'
    if (this.props.highlight == true) cellClass += ' highlight'

    return <td className={cellClass} onMouseEnter={this.handleHover} onDoubleClick={this.handleClick}></td>;
  }
});

var Board = React.createClass({
  getInitialState: function(){
    return { data: [], highlights: [], orientation: 'horizontal'};
  },
  componentWillMount: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  updateOrientation: function(x,y){
    if (this.state.orientation == 'horizontal'){
      this.setState({ orientation: 'vertical'});
    }
    else {
      this.setState({ orientation: 'horizontal'});
    }
  },
  drawShip: function(x,y){
    coordinates = this.buildShipPlacement(x,y,5)
    this.setState({ highlights: coordinates})
  },
  buildShipPlacement: function(x,y,shipSize){
    tempCords = []
    if(this.state.orientation == 'horizontal'){
      adjustment = this.props.boardSize - shipSize - x
      if(adjustment > 0) adjustment = 0;
        for(i = x+adjustment; i < x+shipSize; i++){
          tempCords.push(i + ',' + y)
      }
    }
    else {
      adjustment = this.props.boardSize - shipSize - y
      if(adjustment > 0) adjustment = 0;
        for(i = y+adjustment; i < y+shipSize; i++){
          tempCords.push(x + ',' + i)
      }
    }

    return tempCords;
  },
  render: function(){
    var boardX = this.props.boardX;
    var boardY = this.props.boardY;
    return (
      <table className="gameBoard" >
        { this.state.data.map(function(currentValue, index, array){
          return <tr key={index}> {
            currentValue.map(function(a,b,c){
              return <Cell
                        highlight={this.state.highlights.indexOf(b + ',' + index) != -1}
                        key={b+'-'+index}
                        x={b}
                        y={index}
                        onMouseEnter={this.drawShip}
                        onDoubleClick={this.updateOrientation}
                    />
            }, this)}
          </tr>
        }, this)}
      </table>
    )
  }
});

React.render(<Board
              boardSize={10}
              url= {'http://localhost:9292/board'} />, document.getElementById('game'));

