
var Cell = React.createClass({
  handleHover: function(){
    console.log(this.props.value)
    this.props.onMouseEnter(this.props.x, this.props.y);
  },
  render: function() {
    var x = this.props.x;
    var y = this.props.y;
    var cellClass = 'tableCell'

    if (this.props.value == 'ship') cellClass += ' ship'
    else if (this.props.value == 'damaged_ship') cellClass += ' damaged_ship'
    else if (this.props.value == 'bad_guess') cellClass += ' bad_guess'

    return <div className={cellClass} onMouseEnter={this.handleHover}></div>;
  }
});

var BoardRow = React.createClass({
  handleHover: function(x,y){
    this.props.onMouseEnter(x,y);
  },
  render: function(){
    var columns = this.props.columns
    return (
      <td>
      { columns.map(function(object, i, index){
        return <Cell value={object} key={i} x={this.props.x} y={arguments[1]} onMouseEnter={this.handleHover}/>
      }, this)}
    </td>
    )
  }
})

var Board = React.createClass({
  getInitialState: function(){
    return { data: []};
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
  test: function(x,y){
    console.log(x + ',' + y)
  },
  render: function(){
    var boardX = this.props.boardX;
    var boardY = this.props.boardY;
    return (
      <table className="gameBoard">
        { this.state.data.map(function(object, i){
          return <BoardRow key={i} x={arguments[1]} columns={object} onMouseEnter={this.test}/>
        }, this)}
      </table>
    )
  }
});

React.render(<Board
              boardX={[0,1,2,3,4,5,6,7,8,9]}
              boardY={[0,1,2,3,4,5,6,7,8,9]}
              url= {'http://localhost:9292/board'} />, document.getElementById('game'));

