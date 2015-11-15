
var Cell = React.createClass({
  handleHover: function(){
    console.log(this.props.x + ',' + this.props.y)
  },
  render: function() {
    return <td className="tableCell" onMouseEnter={this.handleHover}></td>;
  }
});

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
        { this.state.data.map(function(currentValue, index, array){
          return <tr> { currentValue.map(function(a,b,c){  return <Cell x={b} y={index} />  })} </tr>
        }, this)}
      </table>
    )
  }
});

React.render(<Board
              boardX={[0,1,2,3,4,5,6,7,8,9]}
              boardY={[0,1,2,3,4,5,6,7,8,9]}
              url= {'http://localhost:9292/board'} />, document.getElementById('game'));

